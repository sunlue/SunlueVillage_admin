import village from '@/api/village/scenic'
export default {
	state: {},
	mutations: {},
	getters: {},
	actions: {
		readVillageScenic({
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
		createVillageScenic({
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
		updateVillageScenic({}, data) {
			return new Promise((resolve, reject) => {
				village.update(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		deleteVillageScenic({}, data) {
			return new Promise((resolve, reject) => {
				village.delete(data).then(response => {
					const data = response.data;
					resolve(data);
				}).catch(error => {
					reject(error)
				})
			})
		},
		readVillageScenicDetails({
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
