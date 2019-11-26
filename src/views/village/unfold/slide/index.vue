<template>
	<div tag="protal_slide" class="page">
		<Card>
			<p slot="title"></p>
			<a href="#" slot="extra" @click="model = true">
				<Icon type="md-add" />
				{{ $t('create') + $t('slide') }}
			</a>
			<slide ref="slide"></slide>
		</Card>
		<Modal v-model="model" width="800" :mask-closable="false" :title="$t('create') + $t('slide')" :footer-hide="false" :closable="false" tag="protal_slide">
			<create ref="create" :navData="navData"></create>
			<div slot="footer">
				<Button @click="closeModal('slideForm')">{{ $t('btn_cancel') }}</Button>
				<Button type="primary" @click="createSlide">{{ $t('btn_confirm') }}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import create from './components/create';
import slide from './components/slide';
export default {
	components: {
		slide,
		create
	},
	data() {
		return {
			model: false,
			navData: []
		};
	},
	methods: {
		closeModal(name) {
			this.$refs.create.resetFields();
			this.$refs.create.form.upload.result.path = '';
			this.$refs.create.form.upload.result.name = '';
			this.model = false;
		},
		createSlide() {
			let that = this,
				createPage = this.$refs['create'],
				data = createPage.form.data;
			createPage.formValidate('slideForm', function() {
				that.$store.dispatch('createVillageSlide', {
					village_id: that.$route.query.unique,
					name: data.name,
					sign: data.sign,
					link: data.link,
					image: data.image,
					remark: data.remark
				}).then(result => {
					that.$refs.slide.appendSlide(result);
					that.closeModal();
				});
			});
		}
	}
};
</script>

<style lang="less">
div[tag='protal_slide'] {
	.upload-preview {
		line-height: 0px;
		text-align: center;
		border-radius: 4px;
		height: 166px;

		img {
			width: 252px;
			height: 100%;
			margin: 0 auto;
		}
	}
}
</style>
