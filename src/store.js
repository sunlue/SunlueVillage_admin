import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/app'
import {
	user,
	token,
	assets,
	systemIndex,
	systemUser,
	systemRole,
	systemLog,
	articleType,
	articleList,
	articlePage,
	protalNav,
	protalSlide,
	protalNotice,
	protalMessage,
	basisLink,
	basisSite,
	plugin,
	pluginConfig,
	pluginCapacity,
	villageData,
	commonRegion,
	commonNation
} from '@/store/module'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		app,
		user,
		token,
		assets,
		systemIndex,
		systemUser,
		systemRole,
		systemLog,
		articleType,
		articleList,
		articlePage,
		protalNav,
		protalSlide,
		protalNotice,
		protalMessage,
		basisLink,
		basisSite,
		plugin,
		pluginConfig,
		pluginCapacity,
		villageData,
		commonRegion,
		commonNation
	},
	getters: {
		menu: state => {
			return state.app.menu;
		}
	}
})
export default store;
