import request from '@/utils/request'

const methods = function() {}

methods.prototype.read = function(data) {
	return request({
		url: 'village/read',
		method: 'get',
		params: data
	})
}

methods.prototype.create = function(data) {
	return request({
		url: 'village/create',
		method: 'post',
		data: data
	})
}
export default new methods();
