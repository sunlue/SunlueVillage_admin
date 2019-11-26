import request from '@/utils/request'
const Slide = function() {}
Slide.prototype.create = function(data) {
	return request({
		url: 'village/slide/create',
		method: 'post',
		data: data
	})
}

Slide.prototype.delete = function(data) {
	return request({
		url: 'village/slide/delete',
		method: 'delete',
		data: data
	})
}

Slide.prototype.update = function(data) {
	return request({
		url: 'village/slide/update',
		method: 'put',
		data: data
	})
}

Slide.prototype.read = function(data) {
	return request({
		url: 'village/slide/read',
		method: 'get',
		params: data
	})
}
export default new Slide();
