import village from '@/api/village/relics'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		readVillageRelics({
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
		createVillageRelics({
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
		updateVillageRelics({}, data) {
			return new Promise((resolve, reject) => {
				village.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteVillageRelics({}, data) {
			return new Promise((resolve, reject) => {
				village.delete(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readVillageRelicsDetails({
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
