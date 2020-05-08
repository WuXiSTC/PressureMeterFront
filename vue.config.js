module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://192.168.56.102:84/admin",
                ws: true, // 是否启用websockets
                changOrigin: true, //开启代理
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
};