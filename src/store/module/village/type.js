import VillageType from '@/api/village/type'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		createVillageType({}, data) {
			return new Promise((resolve, reject) => {
				VillageType.create(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteVillageType({}, data) {
			return new Promise((resolve, reject) => {
				VillageType.delete(data).then(response => {
					const data = response.data
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		updateVillageType({}, data) {
			return new Promise((resolve, reject) => {
				VillageType.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readVillageType({}, data) {
			return new Promise((resolve, reject) => {
				VillageType.read(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
	}
}
