var User = require('../models/user');
var nodeSSPI = require('node-sspi');
var nodeSSPIObj = new nodeSSPI({
    retrieveGroups: false
});


exports.roleAuthorization = function (roles) {

    // Possible roles
    // 1. Admin - have all access permission
    // 2. User  - Can't Delete WI/Release, Update Release
    // 3. Guest - Can just have view access

    return function (req, res, next) {
        try {
            nodeSSPIObj.authenticate(req, res, function (err) {
                res.finished || next()
            })
        }
        catch (err) {

            res.status(500).send(JSON.stringify({ status: 500, message: "url mal formated", detail: err.message }));
        }

        //var userid = "";
        if (req.connection.user != undefined) {
            req.session.userid = req.connection.user.substr(req.connection.user.indexOf("\\") + 1);

        }

        var userIdRegEx = new RegExp(["^", req.session.userid, "$"].join(""), "i");
        console.log({ "userIdRegEx": userIdRegEx })
        console.log({ "userid": req.session.userid.toLowerCase() })
        var params = {
            user: req.connection.user,
            role: 'guest',
            currentReleaseId: '',
            currentReleaseName: '',
            defaultReleaseId: '',
            defaultReleaseName: '',
            redirectUrl: ''
        };
        if (req.session.params == undefined)
            req.session.params = params;

        User.findOne({ "userid": req.session.userid.toLowerCase() })
            .exec(function (err, foundUser) {
                if (err) {
                    var noUserFound = new Error('No user found.');
                    noUserFound.status = 422;
                    return next(noUserFound);
                    console.log("userId error " + err)
                    // res.status(422).json({error: 'No user found.'});
                    // return next(err);
                }
                //req.session.params.role = "guest";
                req.params.role = "guest";
                if (foundUser != undefined) {
                    //req.session.UserRole = foundUser.role;
                    if (foundUser.role == undefined) req.params.role = "guest";
                    else req.params.role = foundUser.role;
                    console.log("defined user =" + params.user + " role = " + params.role)
                    // if(roles.indexOf(foundUser.role) > -1){
                    return next();
                    // }
                }

                //var notAuthorised = new Error('You are not authorized to view this content');
                //notAuthorised.status = 401;
                console.log("defined user =" + params.user + " role = " + params.role)
                return next();

            });
    }
}
