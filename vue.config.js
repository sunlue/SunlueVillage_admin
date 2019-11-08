module.exports = {
    devServer: {
		proxy: 'http://ebyte.api.sunlue.cn/',
		overlay: {
            warnings: false,
            errors: false
        },
	},

    pages: {
		index: {
			entry: 'src/main.js',
			title: '涪城区数字乡村信息管理平台',
		}
	},

    productionSourceMap: false,

    configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			config.mode = 'production'
		} else {
			// 为开发环境修改配置...
			config.mode = 'development'
		}
	},

    lintOnSave: false
}
