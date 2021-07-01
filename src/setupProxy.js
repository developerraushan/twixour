const proxy = require("http-proxy-middleware");

module.export = function(app) {
    app.use(
        proxy("", {
            target: "https://firebasestorage.googleapis.com",
            changeOrigin: true
        })
    );
};