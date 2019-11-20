<template>
	<Layout class="expand">
		<Top ref="top" @shrink="$refs.left.shrink()" @mClick="mClick"></Top>
		<Layout class="ivu-layout-has-sider">
			<Left ref="left" @menuItemClick="menuItemClick"></Left>
			<Content><router-view :name="route" /></Content>
		</Layout>
	</Layout>
</template>
<script>
import './components/main/main.less';
import Top from './components/main/Top.vue';
import Left from './components/main/Left.vue';
export default {
	components: {
		Top,
		Left
	},
	data() {
		return {
			route: 'scenic',
			data: {}
		};
	},
	mounted() {},
	methods: {
		mClick(m) {
			if(m.href){
				this.route=m.href;
			}
			this.$refs.left.menu(m.children);
		},
		menuItemClick(name) {
			console.log(name)
			this.route = name;
		}
	}
};
</script>
