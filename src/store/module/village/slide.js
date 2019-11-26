import slide from '@/api/village/slide'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createVillageSlide({}, data) {
			return new Promise((resolve, reject) => {
				slide.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteVillageSlide({}, data) {
			return new Promise((resolve, reject) => {
				slide.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateVillageSlide({}, data) {
			return new Promise((resolve, reject) => {
				slide.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readVillageSlide({}, data) {
			return new Promise((resolve, reject) => {
				slide.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
