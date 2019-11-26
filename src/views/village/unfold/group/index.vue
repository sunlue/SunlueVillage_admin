<template>
	<div class="create-group-page">
		<div class="scroll-y">
			<Card>
				<p slot="title">组织党建</p>
				<template v-if="false">
					<a href="#" slot="extra" v-if="tabs=='group'">提交</a>
					<template slot="extra" v-if="tabs=='newgroup'">
						<Button type="info" size="small" @click="$refs.newGroup.action='create'">添加两新组织</Button>
					</template>
					<Tabs :value="tabs" @on-click="tabs=$event">
						<TabPane label="党组织" name="group">
							<Tinymce ref="content"  v-model="formItem.content" />
							<Divider />
							<Button type="primary" @click="handleSubmit">提交</Button>
						</TabPane>
						<TabPane label="两新组织" name="newgroup">
							<new-group ref="newGroup"></new-group>
						</TabPane>
					</Tabs>
				</template>
				
				<Upload ref="upload" type="drag" accept="image" name="file" :show-upload-list="false" :action="$upload.image"
					:format="['jpg','jpeg','png']" :on-success="uploadThumbSuccess">
					<div style="padding: 16px 0">
						<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
						<p>{{$t('upload_drag')}}</p>
					</div>
				</Upload>
				<div class="preview" v-if="formItem.banner">
					<img :src="$assets.url+formItem.banner" />
					<div class="deleted">
						<Button type="error">{{$t('delete')}}</Button>
					</div>
				</div>
				 <Divider />
				<Tinymce ref="content"  v-model="formItem.content" />
				<Divider />
				<Button type="primary" @click="handleSubmit">提交</Button>
			</Card>
		</div>
	</div>
</template>

<script>
	import Tinymce from '@/components/Tinymce'
	import newGroup from './new/index'
	export default{
		components: {
			Tinymce,
			newGroup
		},
		data(){
			return {
				tabs:'newgroup',
				village_id:this.$route.query.unique,
				formItem:{
					uniqid:'',
					banner:'',
					content:'',
				},
			}
		},
		mounted() {
			this.$store.dispatch('readVillageGroupDetails',{
				village_id:this.$route.query.unique
			}).then(result=>{
				if(Object.keys(result).length>0){
					this.formItem.uniqid=result.uniqid
					this.formItem.banner=result.banner
					this.$refs.content.setContent(result.content)
					this.action='updateVillageGroup'
				}else{
					this.action='createVillageGroup'
				}
			})
		},
		methods:{
			uploadThumbSuccess(response){
				if(response.code==200){
					this.formItem.banner = response.data.link;
				}else{
					this.$Message.error(response.info);
				}
			},
			handleSubmit(){
				if(this.formItem.content==''){
					this.$Message.error('请输入党组织内容');
				}else{
					let village_id=this.$route.query.unique;
					this.$store.dispatch(this.action,Object.assign(this.formItem,{
						village_id:village_id
					})).then(result=>{
						this.$Message.success('success')
						this.formItem.uniqid=result.uniqid
						this.action='updateVillageGroup'
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.create-group-page{
		position: relative;
		width: 100%;
		height: 100%;
		background: white;
		.scroll-y{
			position: absolute;
			width: 100%;
			height: 100%;
		}
	}
</style>
