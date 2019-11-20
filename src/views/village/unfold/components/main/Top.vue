<template>
	<Header>
		<router-link class="logo" :to="{ name: 'main_index' }"><img :src="logo" /></router-link>
		<ul class="tools">
			<li @click="shrink()" v-if="childMenu.length > 0">
				<Tooltip :content="$t('shrink')" placement="bottom-start"><i class="iconfont icon-shrink"></i></Tooltip>
			</li>
			<template v-for="(m, i) in menu">
				<li :key="i" v-on:click="mClick(m, i)">{{ m.name }}</li>
			</template>
		</ul>
		<div class="right">
			<Dropdown @on-click="selectVillage">
				<a href="javascript:void(0)">
					切换村落
					<Icon :size="18" type="md-arrow-dropdown" />
				</a>
				<DropdownMenu slot="list">
					<template v-for="(item, index) in village">
						<DropdownItem :name="item.value" :key="index">{{ item.label }}</DropdownItem>
					</template>
				</DropdownMenu>
			</Dropdown>
			<Dropdown @on-click="userAction">
				<a href="javascript:void(0)">
					{{ $t('hello') }}！{{ $store.getters.userInfo.name || $store.getters.userInfo.account }}
					<Icon :size="18" type="md-arrow-dropdown" />
				</a>
				<DropdownMenu slot="list">
					<DropdownItem name="logout" divided>{{ $t('logout_login') }}</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Icon :size="24" color="white" type="md-more" @click="drawer.serverInfo = !drawer.serverInfo" />
		</div>
		<Drawer :title="$t('system_info')" v-model="drawer.serverInfo" :width="460">
			<CellGroup>
				<Cell :title="f" v-for="(v, f) in $store.getters.systemInfo.server" :key="f"><div v-html="v" slot="extra" v-if="v.length < 100"></div></Cell>
			</CellGroup>
		</Drawer>
	</Header>
</template>

<script>
import logo from '@/assets/index/logo.png';
import menu from './menu.js';
export default {
	data() {
		return {
			logo: logo,
			village: {},
			drawer: {
				serverInfo: false
			},
			menu: menu,
			childMenu: []
		};
	},
	methods: {
		shrink() {
			this.$emit('shrink');
		},
		selectVillage(uniqid) {},
		userAction(name) {
			this[name]();
		},
		logout() {
			var that = this;
			that.$Modal.confirm({
				title: that.$t('tips'),
				content: that.$t('tips_exit_system'),
				onOk: function() {
					that.$store
						.dispatch('exit')
						.then(() => {
							that.$router.replace({
								name: 'login'
							});
						})
						.catch(err => {
							that.$router.replace({
								name: 'login'
							});
						});
				}
			});
		},
		mClick: function(m, i) {
			this.childMenu = m.children?m.children:[];
			this.$emit('mClick', m);
		}
	}
};
</script>
