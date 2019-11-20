import village from '@/api/village/natural'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		readVillageNatural({
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
		createVillageNatural({
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
		updateVillageNatural({}, data) {
			return new Promise((resolve, reject) => {
				village.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteVillageNatural({}, data) {
			return new Promise((resolve, reject) => {
				village.delete(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readVillageNaturalDetails({
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
