<template>
	<Card class="create-village-krpano">
		<p slot="title">
			<Icon type="ios-add-circle-outline" :size="18" />
			{{$t('create')}}全景
		</p>
		<a href="#" slot="extra" @click="$emit('back')">
			<Icon type="ios-arrow-back" />
			{{$t('back')}}全景列表
		</a>
		<Form ref="formVal" :model="form.data" :rules="form.rule" :label-width="100">
			<Row>
				<Col span="15">
					<Row>
						<Col span="24">
							<FormItem label="全景名称" prop="name">
								<Input v-model="form.data.name"></Input>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="经度">
								<InputNumber v-model="form.data.lng" :step="1.00"></InputNumber>
							</FormItem>
						</Col>
						<Col span="12">
							<FormItem label="纬度">
								<InputNumber v-model="form.data.lat" :step="1.00"></InputNumber>
							</FormItem>
						</Col>
						<Col span="24">
							<FormItem label="全景地址">
								<Input v-model="form.data.link"></Input>
							</FormItem>
						</Col>
						<Col span="24">
							<FormItem label="全景介绍">
								<Tinymce ref="content" v-model="form.data.content" />
							</FormItem>
						</Col>
					</Row>
				</Col>
				<Col span="8" offset="1">
					<Upload ref="upload" type="drag" accept="image" name="file" :show-upload-list="false" 
						:action="$upload.image" :format="['jpg','jpeg','png']" :on-success="uploadThumbSuccess">
						<div style="padding: 16px 0">
							<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
							<p>{{$t('upload_drag')}}</p>
						</div>
					</Upload>
					<div class="preview" v-if="form.data.thumbnail">
						<img :src="$assets.url+form.data.thumbnail" />
						<div class="deleted">
							<Button type="error">{{$t('delete')}}</Button>
						</div>
					</div>
				</Col>
				<Col span="24">
					<FormItem>
						<Button type="primary" @click="handleSubmit">{{$t('btn_submit')}}</Button>
					</FormItem>
				</Col>
			</Row>
		</Form>
	</Card>
</template>

<script>
	import Tinymce from '@/components/Tinymce'
	export default{
		components: {
			Tinymce
		},
		data() {
			let that=this
			return {
				form:{
					data:{
						name:'',
						lng:0,
						lat:0,
						content:'',
						thumbnail:'',
						link:'',
					},
					rule:{
						name:[
							{required: true,trigger: 'blur',message: that.$t('please')+that.$t('enter')+'全景名称'},
						]
					}
				}
			}
		},
		methods: {
			uploadThumbSuccess(response){
				if(response.code==200){
					this.form.data.thumbnail = response.data.link;
				}else{
					this.$Message.error(response.info);
				}
			},
			formValidate(name,callback){
				this.$refs[name].validate((valid) => {
					if(!valid){return false;}
					var data=this.form.data;
					if(data.thumbnail.length<1){
						this.$Message.error(this.$t('please')+this.$t('upload')+'全景图片');
						return false;
					}
					callback();
				});
			},
			handleSubmit () {
				let village_id=this.$route.query.unique;
				let that=this,
					data=Object.assign(this.form.data,{
						village_id:village_id
					});
				this.formValidate('formVal',function(){
					that.$store.dispatch('createVillageKrpano',data).then((result) => {
						that.$Message.success('success');
						that.$emit('back')
						that.$emit('create',result)
					});
				})
			}
		}
	}
</script>

<style lang="less">
	
	.ivu-input-number{
		width: 100%;
	}
	
	.create-village-krpano{
		height: 100%;
		.ivu-upload,.preview{
			margin-bottom: 24px;
		}
	}
	
	.preview{
		border-radius: 5px;
		padding: 4px;
		border: 1px dashed #dcdee2;
		box-sizing: border-box;
		position: relative;
		height: 202px;
		img{
			max-width: 100%;
			max-height: 185px;
			position: absolute;
			left: 50%;top:50%;
			transform: translate(-50%,-50%);
			z-index: 1;
		}
		&:hover{
			.deleted{
				height: 100%;
			}
		}
		.deleted{
			transition: all 1000ms;
			height: 0%;
			overflow: hidden;
			width: 100%;
			background: rgba(0,0,0,.5);
			z-index: 2;
			left: 0px;top: 0px;
			border-radius: 4px;
			position: absolute;
			button{
				position: absolute;
				left: 50%;top:50%;
				transform: translate(-50%,-50%);
			}
		}
	}
	
	.village_tag{
		.ivu-form-item{
			margin-bottom: 15px;
			&:last-child{
				margin-bottom: 0px;
			}
		}
	}
</style>
