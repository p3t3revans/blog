const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const multer = require('multer');
const config = require('../config/default.json');
const upload = multer({
    dest: config.imageUpload.path,
    limits : {
        fileSize : 4194304 // 4Mb limit on the files
    }
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
  });

var authorization_controller = require('../controllers/authorizationController');
//var upload_controller = require('../controllers/uploadController');

router.post(config.imageUpload.url, authorization_controller.roleAuthorization(['admin','user']),upload.single("file"), (req,res,next)=>{
    const tempPath = req.file.path;
    var filename = (req.file.originalname).substr(0,req.file.originalname.length-4) + "_" + Math.floor(Date.now()).toString();
    const targetPath = path.join(path.dirname(tempPath),filename);
    var extname = path.extname(req.file.originalname).toLowerCase();

    if ((extname === ".png") || (extname === ".jpg") || (extname === ".bmp"))
     {
        var linksrc ={ 
          "link" : `/images/${filename}${extname}`,
          "imageUrl" : `/images/${filename}${extname}`
        }; //{ "link": "path/to/image.jpg" }
        fs.rename(tempPath, targetPath+extname, err => {
        if (err) return res.status(403).send(err);
        res.status(200).send(linksrc);
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return res.status(403).end(err);
        res.status(403).end("Only .bmp, .png or .jpg files are allowed!");
      });
    }
});

module.exports = router;