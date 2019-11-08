import * as users from './user'
let user = users.default

import * as tokens from './token'
let token = tokens.default

import * as assetss from './assets'
let assets = assetss.default

import * as systemIndexs from './system/index'
let systemIndex = systemIndexs.default;

import * as systemRoles from './system/role'
let systemRole = systemRoles.default;

import * as systemUsers from './system/user'
let systemUser = systemUsers.default

import * as systemLogs from './system/log'
let systemLog = systemLogs.default

import * as protalArticleType from './portal/article/type'
let articleType = protalArticleType.default;

import * as protalArticleList from './portal/article/list'
let articleList = protalArticleList.default;

import * as protalArticlePage from './portal/article/page'
let articlePage = protalArticlePage.default;

import * as protalNavs from './portal/nav'
let protalNav = protalNavs.default

import * as protalSlides from './portal/slide'
let protalSlide = protalSlides.default;

import * as protalNotices from './portal/notice'
let protalNotice = protalNotices.default;

import * as protalMessages from './portal/message'
let protalMessage = protalMessages.default;

import * as basisLinks from './basis/link'
let basisLink = basisLinks.default;

import * as basisSites from './basis/site'
let basisSite = basisSites.default;

import * as plugins from './plugin/index'
let plugin = plugins.default;

import * as pluginConfigs from './plugin/config'
let pluginConfig = pluginConfigs.default;

import * as pluginCapacitys from './plugin/capacity'
let pluginCapacity = pluginCapacitys.default;

import * as villageDatas from './village/data'
let villageData = villageDatas.default;


import * as commonRegions from './common/region'
let commonRegion = commonRegions.default;

import * as commonNations from './common/nation'
let commonNation = commonNations.default;

export {
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
}
