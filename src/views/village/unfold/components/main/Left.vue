<template>
	<Sider ref="sider" width="220" hide-trigger :collapsible="true" v-model="flag" :collapsed-width="78" breakpoint="xs" v-if="navMenu.length > 0">
		<div class="left-menu">
			<Menu ref="menu" theme="dark" width="auto" :class="classs" :open-names="openMenu" :active-name="$route.name" @on-select="selectMenu" @on-open-change="openMenuChange">
				<div v-for="(nav, index) in navMenu" :key="index">
					<!-- 一级菜单有子级并且设置为显示 -->
					<template v-if="nav.children">
						<Submenu :name="nav.href?nav.href:nav.name">
							<template slot="title">
								<Icon type="ios-navigate"></Icon>
								<span class="nav">{{ nav.name }}</span>
							</template>
							<template v-for="(menu, j) in nav.children">
								<template v-if="menu.children">
									<Submenu :name="menu.href?menu.href:menu.name" :key="j">
										<template slot="title">
											<span class="nav">{{ menu.name }}</span>
										</template>
										<template v-for="(submenu, k) in menu.children">
											<MenuItem :name="submenu.href?submenu.href:submenu.name" :key="k">
												<span class="nav" :key="k">{{ submenu.name }}</span>
											</MenuItem>
										</template>
									</Submenu>
								</template>
								<template v-else>
									<MenuItem :name="menu.name" :key="j">
										<span class="nav" :key="j">{{ menu.name }}</span>
									</MenuItem>
								</template>
							</template>
						</Submenu>
					</template>
					<!-- 一级菜单无子级 -->
					<template v-else>
						<MenuItem :name="nav.href?nav.href:nav.name">
							<Icon type="ios-navigate"></Icon>
							<span class="nav">{{ nav.name }}</span>
						</MenuItem>
					</template>
				</div>
			</Menu>
		</div>
	</Sider>
</template>
<script>
export default {
	data() {
		return {
			flag: false,
			isCollapsed: true,
			navMenu: [],
			openMenu: []
		};
	},
	created() {},
	computed: {
		classs() {
			return [!this.isCollapsed ? 'close' : 'open'];
		}
	},
	methods: {
		shrink() {
			this.isCollapsed = this.flag;
			this.$refs.sider.toggleCollapse();
		},
		selectMenu(name) {
			this.flag = false;
			this.isCollapsed = 'open';
			this.$emit('menuItemClick',name)
		},
		openMenuChange() {
			this.flag = false;
			this.isCollapsed = 'open';
		},
		menu(data) {
			if (data) {
				data.map(item => {
					this.openMenu.push(item.name);
				});
				this.navMenu = data;
				this.$nextTick(function() {
					this.$refs.menu.updateActiveName();
					this.$refs.menu.updateOpened();
				});
			} else {
				this.navMenu = [];
			}
		}
	}
};
</script>
