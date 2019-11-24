import request from '@/utils/request'

const methods = function() {}

methods.prototype.read = function(data) {
	return request({
		url: 'village/krpano/read',
		method: 'get',
		params: data
	})
}

methods.prototype.create = function(data) {
	return request({
		url: 'village/krpano/create',
		method: 'post',
		data: data
	})
}


methods.prototype.delete = function(data) {
	return request({
		url: 'village/krpano/delete',
		method: 'delete',
		data: data
	})
}

methods.prototype.update = function(data) {
	return request({
		url: 'village/krpano/update',
		method: 'put',
		data: data
	})
}

methods.prototype.details = function(data) {
	return request({
		url: 'village/krpano/details',
		method: 'get',
		params: data
	})
}

export default new methods();
