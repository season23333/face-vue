module.exports = {
    devServer: {
        port: 8080,     // 端口
    },
    lintOnSave: false,   // 取消 eslint 验证
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    }
    // chainWebpack: () => {},
};

const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
    devServer: {
        port: 8080,     // 端口
    },
    lintOnSave: false,   // 取消 eslint 验证
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    },
    // chainWebpack: () => {},


    baseUrl: process.env.NODE_ENV === 'production' ? './' : '',
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,

    configureWebpack:config=>{
        if(process.env.NODE_ENV === 'production'){
            return{
                plugins: [

                    new CompressionPlugin({
                        test:/\.js$|\.html$|.\css/, //匹配文件名
                        threshold: 10240,//对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    })
                ]
            }
        }

    },
};
