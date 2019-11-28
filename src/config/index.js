let development = "http://api.village.sunlue.com/";
let production = "http://api.village.sunlue.com/";
let assetsUrl = process.env.NODE_ENV == 'production' ? production : development;
export default {
	appid: 'SunlueCMS_001',
	appkey: 'SunlueCMS_001',
	api: {
		url: (NODE_ENV) => {
			return NODE_ENV == "production" ? production : development
		}
	},
	assets: {
		url: assetsUrl,
		delete: assetsUrl + 'assets/delete',
		upload: {
			image: assetsUrl + 'assets/upload/image',
			file: assetsUrl + 'assets/upload/file',
			audio: assetsUrl + 'assets/upload/audio',
			video: assetsUrl + 'assets/upload/video'
		},
	}
}
