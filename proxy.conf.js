const PROXY_CONFIG = [
    {
        context: [
            "/api/posts",
            "/authentication",
            "/users"
        ],
        target: "http://localhost:3030",
        secure: false
    }
]

module.exports = PROXY_CONFIG;