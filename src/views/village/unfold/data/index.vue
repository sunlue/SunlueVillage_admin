<template>
	<div :id="$route.name" class="content" ref="content">
			<Carousel
				:autoplay="carousel.setting.autoplay"
				:autoplay-speed="carousel.setting.autoplaySpeed"
				:dots="carousel.setting.dots"
				:radius-dot="carousel.setting.radiusDot"
				:trigger="carousel.setting.trigger"
				:arrow="carousel.setting.arrow"
				:height="carousel.setting.height">
				<CarouselItem v-for="(item, index) in carousel.items" :key="index">
					<div class="carousel-item">
						<img :src="item" :style="{ height: carousel.setting.height + 'px' }" />
					</div>
				</CarouselItem>
			</Carousel>
			<span class="town_infos" v-if="!modal.show" v-on:click="modal.show = true">{{data.name}}</span>
			<Modal class="village_data_modal" v-model="modal.show" :mask="false" width="800" :draggable="true" :z-index="90">
				<div slot="header" class="header">
					<span>{{data.name}}</span>
					<!-- <sub>tuan yang si cun</sub> -->
					<template v-if="data.audio">
						<audio ref="audio" autoplay="autoplay" :src="data.audio"></audio>
						<img v-if="!audio.play" v-on:click="playAudio" src="../../../../assets/village/pause.png" />
						<img v-if="audio.play" v-on:click="pauseAudio" src="../../../../assets/village/play.png" />
					</template>
				</div>
				<div slot="footer">
					<Button v-on:click="pageState = 'edit'" v-if="pageState == 'view'">编辑模式</Button>
					<Button v-on:click="pageState = 'view'" v-if="pageState == 'edit'">完成编辑</Button>
				</div>
				<div class="tag" v-if="data.tag.length>0 || pageState=='edit'">
					<template v-for="(tag, index) in data.tag">
						<Tag :closable="pageState === 'edit'" :name="tag.value" :key="index" @on-close="handleRemoveTag(tag,index)">{{ tag.value }}</Tag>
					</template>
					<Button icon="ios-add" type="dashed" size="small" @click="modal.tag.show=true" v-if="pageState == 'edit'">添加标签</Button>
					<Divider />
				</div>
				<div class="intro">
					<div v-html="data.content" v-if="pageState=='view'"></div>
					<Tinymce ref="content" v-else v-model="data.content" />
				</div>
			</Modal>
			<Modal v-model="modal.tag.show" title="添加标签" @on-ok="handleAddTag" :z-index="100">
				<Input v-model="modal.tag.text"></Input>
			</Modal>
			<Modal v-model="alert" width="360">
				<p slot="header" style="color:#f60;text-align:center">
					<Icon type="ios-information-circle"></Icon>
					<span>{{$t('tips')}}</span>
				</p>
				<div style="text-align:center">
						<p>数据接收发生异常或非法操作</p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long  @click="closePage">关闭</Button>
				</div>
		</Modal>
	</div>
</template>

<script>
	import Tinymce from '@/components/Tinymce'
export default {
	components: {
		Tinymce
	},
	data() {
		var that = this;
		return {
			uniqid:that.$route.query.unique,
			pageState: 'view',
			carousel: {
				setting: {
					autoplay: true,
					autoplaySpeed: 5000,
					dots: 'none',
					radiusDot: false,
					arrow: 'never',
					height: 500
				},
				items: [
					'http://museum.zhaiu.com/attached/image/20171218/52260110003.GJ001-P001.jpg',
					'http://museum.zhaiu.com/attached/image/20171218/52260110003.GJ001-P002.jpg',
					'http://museum.zhaiu.com/attached/image/20171218/52260110003.GJ002-P004.jpg',
					'http://museum.zhaiu.com/attached/image/20171218/52260110003.GJ003-P002.jpg',
					'http://museum.zhaiu.com/attached/image/20171220/52260110003.JZ002-P025.jpg',
					'http://museum.zhaiu.com/attached/image/20171220/52260110003.JS006-P008.jpg'
				]
			},
			modal: {
				show: false,
				tag:{
					show:false,
					text:''
				}
			},
			data: {
				audio: '',
				content: '',
				name: '',
				tag: []
			},
			dataLen:0,
			audio: {
				play: false
			},
			video: {
				play: false
			},
			alert:false
		};
	},
	watch: {
		screenWidth(val) {
			if (!this.timer) {
				this.screenWidth = val;
				this.timer = true;
				let that = this;
				setTimeout(function() {
					that.timer = false;
				}, 400);
			}
		}
	},
	mounted() {
		this.screenHeight();
		window.onresize = () => {
			this.screenHeight();
		};
		let uniqid = this.$route.query.unique;
		this.$store.dispatch('readVillageDataDetails', {
			uniqid: uniqid
		}).then(result => {
			this.dataLen=Object.keys(result).length;
			if(this.dataLen>0){
				this.data = result;
				this.modal.show=true;
			}else{
				this.alert=true;
			}
		});
	},
	methods: {
		screenHeight: function() {
			let height = this.$refs.content.offsetHeight;
			return (() => {
				this.carousel.setting.height = height;
			})();
		},
		handleAddTag: function() {
			let that = this;
			that.data.tag.push({
				value:that.modal.tag.text
			})
			that.$store.dispatch('updateVillageData', {
				uniqid: that.uniqid,
				field: 'tag',
				value: that.data.tag
			}).catch(err=>{
				that.data.tag.splice(that.data.tag.length,1);
			});
		},
		handleRemoveTag: function(tag,index) {
			let that = this;
			that.$Modal.confirm({
				title: that.$t('tips'),
				content: that.$t('tips_delete_data'),
				onOk: function() {
					that.data.tag.splice(index, 1);
					that.$store.dispatch('updateVillageData', {
						uniqid: that.uniqid,
						field: 'tag',
						value: that.data.tag
					}).catch(err=>{
						that.data.tag.push(tag);
					});
				}
			});
		},
		playAudio: function() {
			this.audio.play = true;
			this.$refs.audio.play();
		},
		pauseAudio: function() {
			this.audio.play = false;
			this.$refs.audio.pause();
		},
		closePage(){
			window.opener=null;
			window.open('','_self');
			window.close();
		}
	}
};
</script>

<style lang="less">
.content {
	width: 100%;
	height: 100%;
	position: relative;
	.ivu-carousel {
		width: 100%;
		height: 100%;
		.ivu-carousel-list {
			width: 100%;
			height: 100%;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}

	.town_infos {
		position: absolute;
		top: 100px;
		left: 0;
		background: rgba(255, 255, 255, 0.9);
		z-index: 3;
		width: 45px;
		padding: 27px 11px;
		color: #666;
		font-size: 22px;
		cursor: pointer;
		display: inline;
	}
}
.village_data_modal {
	.ivu-modal-content {
		border-radius: 0px;
		background: rgba(255, 255, 255, 0.9);
	}
	.ivu-modal-header {
		padding: 16px 0px;
		.header {
			span {
				font-size: 24px;
				font-weight: bold;
				color: #333;
				border-left: 4px solid #333;
				padding-left: 20px;
			}
			sub {
				bottom: 0;
				font-size: 14px;
				left: 20px;
			}
			img {
				height: 20px;
				width: 20px;
				position: relative;
				left: 30px;
				top: 6px;
				cursor: pointer;
			}
		}
	}
	.intro {
		font-size: 16px;
		color: #666;
		line-height: 1.5;
		min-height: 300px;
		overflow-y: auto;
	}
}
</style>
