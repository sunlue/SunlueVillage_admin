import village from '@/api/village/data'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		readVillageData({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				village.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		createVillageData({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				village.create(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateVillageData({}, data) {
			return new Promise((resolve, reject) => {
				village.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteVillageData({}, data) {
			return new Promise((resolve, reject) => {
				village.delete(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readVillageDataDetails({
			commit
		}, data) {
			return new Promise((resolve, reject) => {
				village.details(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
