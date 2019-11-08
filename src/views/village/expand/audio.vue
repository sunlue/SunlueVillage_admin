<template>
	<div>
		<Upload  v-if="!linkpath" :action="upload.audio.url" :show-upload-list="false"
		accept="audio/mpeg"
		:format="['mp3','mp4']" name="file" :on-success="uploadAudioSuccess"
		:on-error="uploadAudioError" :on-progress="uploadAudioProgress"
		:on-format-error="uploadAudioFormatError">
			<Button type="info" size="small">{{$t('upload')}}</Button>
		</Upload>
		<Button type="info" size="small" @click="modal.show=true" v-if="linkpath">{{$t('review')}}</Button>
		<Modal v-model="modal.show" :footer-hide="true" class="review" v-if="linkpath">
			<p slot="header">{{$t('review')}}</p>
			<Row style="margin: 0 5px 10px 5px;">
				<Col span="12">
					<Upload :action="upload.audio.url" :show-upload-list="false"
					:format="['mp3','mp4']" name="file" :on-success="uploadAudioSuccess"
					:on-error="uploadAudioError" :on-progress="uploadAudioProgress"
					:on-format-error="uploadAudioFormatError">
						<Button type="primary" long>{{$t('update')}}</Button>
					</Upload>
				</Col>
				<Col span="12">
					<Button type="error" long @click="deleteAudio">{{$t('delete')}}</Button>
				</Col>
			</Row>
			<aplayer :music="{title: music.title,artist: music.artist || ' ',src: music.url}"/>
		</Modal>
		<Modal v-model="slider.show" :closable="false" :footer-hide="true" :mask-closable="false">
			<Slider v-model="slider.value" :show-tip="slider.tip"></Slider>
		</Modal>
	</div>
</template>

<script>
	import axios from 'axios'
	import Aplayer from 'vue-aplayer'
	export default{
		components: {
			Aplayer
		},
		data() {
			let uploadAudio=this.config.assets.upload.audio;
			return {
				music:{
					title:'',
					url:'',
					artist:''
				},
				linkpath:'',
				upload:{
					audio:{
						url:uploadAudio,
					}
				},
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
			audio: {
				type: String,
				default: ''
			},
		},
		mounted(){
			this.$nextTick(function(){
				if (this.audio!='') {
					let uploadUrl=this.config.assets.upload.url;
					this.music.url=uploadUrl+this.audio;
					this.music.title=this.data.name;
					this.music.pic=this.data.thumbnail;
					this.linkpath=this.audio;
				}
			})
		},
		methods: {
			uploadAudioProgress(event){
				this.slider.value=parseInt((event.loaded/event.total)*100);
				if (this.slider.value>0 && this.slider.value<100) {
					this.slider.show=true;
					this.slider.tip='always';
				} else{
					this.slider.show=false;
					this.slider.tip='never';
				}
			},
			uploadAudioSuccess(response){
				this.$emit('uploadSuccess',response.data);
				let uploadUrl=this.config.assets.upload.url;
				this.music.url=uploadUrl+response.data.link;
				this.linkpath=response.data.link;
			},
			uploadAudioError(error){
				console.error(error)
			},
			uploadAudioFormatError(file){
				this.$Message.error('文件['+file.name+']格式错误');
			},
			deleteAudio(){
				let that=this,
					uniqid=this.data.uniqid,
					uploadUrl=this.config.assets.upload.url;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('updateArticleList',{
							uniqid:uniqid,
							field:'audio',
							value:''
						}).then(() => {
							axios.delete(uploadUrl+'delete',{
								data:{path:that.linkpath}
							}).then(()=>{
								that.linkpath='';
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
