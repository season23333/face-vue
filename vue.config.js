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
