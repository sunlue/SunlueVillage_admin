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
		createVillage({
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
	}
}
