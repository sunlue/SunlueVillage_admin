import request from '@/utils/request'

const methods = function() {}

methods.prototype.read = function(data) {
	return request({
		url: 'village/natural/read',
		method: 'get',
		params: data
	})
}

methods.prototype.create = function(data) {
	return request({
		url: 'village/natural/create',
		method: 'post',
		data: data
	})
}


methods.prototype.delete = function(data) {
	return request({
		url: 'village/natural/delete',
		method: 'delete',
		data: data
	})
}

methods.prototype.update = function(data) {
	return request({
		url: 'village/natural/update',
		method: 'put',
		data: data
	})
}

methods.prototype.details = function(data) {
	return request({
		url: 'village/natural/details',
		method: 'get',
		params: data
	})
}

export default new methods();
