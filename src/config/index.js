let development = "http://api.village.sunlue.io/";
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
		upload: {
			url: assetsUrl,
			image: assetsUrl + 'uploads/image',
			file: assetsUrl + 'uploads/file',
			audio: assetsUrl + 'uploads/audio',
			video: assetsUrl + 'uploads/video'
		},
		delete: assetsUrl + 'delete'
	}
}
