import main from '@/components/main'
import pMain from '@/components/parent-view'
const router = {
	name: 'village',
	path: '/village',
	component: () => import('@/views/village/unfold/index.vue'),
	children: [{
		path: '/village_unfold',
		name: 'village_unfold',
		components: {
			data: () => import('@/views/village/unfold/data/index.vue'),
			crops: () => import('@/views/village/unfold/crops/index.vue'),
			basis: () => import('@/views/village/unfold/basis/index.vue'),
			geo: () => import('@/views/village/unfold/geo/index.vue'),
			relics: () => import('@/views/village/unfold/relics/index.vue'),
			natural: () => import('@/views/village/unfold/natural/index.vue'),
			scenic: () => import('@/views/village/unfold/scenic/index.vue'),
			krpano: () => import('@/views/village/unfold/krpano/index.vue')
		},
		meta: {
			is_login: true,
			display: 'hidden'
		}
	}]
}

export default router
