<template>
	<div>
		<Upload  v-if="!video" :action="$upload.video" :show-upload-list="false"
			:format="['mp4','avi','wmv']" name="file" :on-success="uploadVideoSuccess"
			:on-error="uploadVideoError" :on-progress="uploadVideoProgress"
			:on-format-error="uploadVideoFormatError">
			<Button type="info" size="small">{{$t('upload')}}</Button>
		</Upload>
		<Button type="info" size="small" @click="modal.show=true" v-if="video">{{$t('review')}}</Button>
		<Modal v-model="modal.show" :footer-hide="true" class="review" v-if="video">
			<p slot="header">{{$t('review')}}</p>
			<Row style="margin: 0 5px 10px 5px;">
				<Col span="12">
					<Upload :action="$upload.video" :show-upload-list="false"
					:format="['mp4','avi','wmv']" name="file" :on-success="uploadVideoSuccess"
					:on-error="uploadVideoError" :on-progress="uploadVideoProgress"
					:on-format-error="uploadVideoFormatError">
						<Button type="primary" long>{{$t('update')}}</Button>
					</Upload>
				</Col>
				<Col span="12">
					<Button type="error" long @click="deleteVideo">{{$t('delete')}}</Button>
				</Col>
			</Row>
			<video autoplay="autoplay" :poster="data.thumbnail" :src="$assets.url+video" style="width: 100%;" controls="controls"></video>
		</Modal>
		<Modal v-model="slider.show" :closable="false" :footer-hide="true" :mask-closable="false">
			<Slider v-model="slider.value" :show-tip="slider.tip"></Slider>
		</Modal>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		components: {
		},
		data() {
			return {
				modal:{
					show:false
				},
				slider:{
					show:false,
					value:0,
					tip:'never'
				}
			}
		},
		props: {
			data:{
				type:Object,
				default:()=>{}
			},
			video: {
				type: String,
				default: ''
			},
		},
		methods: {
			uploadVideoProgress(event){
				this.slider.value=parseInt((event.loaded/event.total)*100);
				if (this.slider.value>0 && this.slider.value<100) {
					this.slider.show=true;
					this.slider.tip='always';
				} else{
					this.slider.show=false;
					this.slider.tip='never';
				}
			},
			uploadVideoSuccess(response){
				if (response.code != 200) {
					this.$Message.error(response.info);
				}else{
					this.$emit('uploadSuccess',response.data);
					this.video=response.data.link;
					this.$Message.success('success');
				}
			},
			uploadVideoError(error, file){
				console.error(error)
			},
			uploadVideoFormatError(file){
				this.$Message.error('文件['+file.name+']格式错误');
			},
			deleteVideo(){
				let that=this,
					uniqid=that.data.uniqid;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('updateArticleList',{
							uniqid:uniqid,
							field:'video',
							value:''
						}).then((result) => {
							axios.delete(that.$assets.delete,{
								data:{path:that.video}
							}).then(()=>{
								that.video='';
								that.modal.show=false;
							})
						});
					}
				});
			}
		},
	}
</script>

<style lang="less">
	.review{
		.ivu-upload-select{
			width: 100%;
		}
	}
</style>
