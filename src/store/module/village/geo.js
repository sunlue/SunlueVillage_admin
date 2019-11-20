import village from '@/api/village/geo'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		readVillageGeo({
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
		createVillageGeo({
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
		updateVillageGeo({}, data) {
			return new Promise((resolve, reject) => {
				village.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteVillageGeo({}, data) {
			return new Promise((resolve, reject) => {
				village.delete(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readVillageGeoDetails({
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
