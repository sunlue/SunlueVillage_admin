<template>
	<Card class="create-village-relics">
		<p slot="title">
			<Icon type="ios-add-circle-outline" :size="18" />
			{{$t('create')}}文物
		</p>
		<a href="#" slot="extra" @click="$emit('back')">
			<Icon type="ios-arrow-back" />
			{{$t('back')}}文物列表
		</a>
		<Form ref="formVal" :model="form.data" :rules="form.rule" :label-width="100">
			<Tabs v-model="tabs">
				<TabPane :label="$t('basis_info')" name="tab_basis">
					<Row>
						<Col span="15">
							<Row>
								<Col span="24">
									<FormItem label="文物名称" prop="name">
										<Input v-model="form.data.name"></Input>
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="文物简介">
										<Input type="textarea" v-model="form.data.excerpt"></Input>
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
								<Col span="12">
									<FormItem label="文物年代">
										<Input v-model="form.data.decade"></Input>
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="是否景点">
										<Select v-model="form.data.is_attractions">
											<Option value="1">是</Option>
											<Option value="2">否</Option>
										</select>
									</FormItem>
								</Col>
								<template v-if="form.data.is_attractions=='1'">
									<Col span="12">
										<FormItem label="游玩时长">
											<InputNumber v-model="form.data.visit_time" :step="1.00"
												:formatter="value => `${value}小时`"
												:parser="value => value.replace('小时', '')"></InputNumber>
										</FormItem>
									</Col>
									<Col span="12">
										<FormItem label="适宜季节">
											<Select v-model="form.data.season" multiple>
												<Option value="1">春季</Option>
												<Option value="2">夏季</Option>
												<Option value="3">秋季</Option>
												<Option value="4">冬季</Option>
											</select>
										</FormItem>
									</Col>
									<Col span="12">
										<FormItem label="门票价格">
											<InputNumber v-model="form.data.price" :step="1.00"
												:formatter="value => `${value}元`"
												:parser="value => value.replace('元', '')"></InputNumber>
										</FormItem>
									</Col>
									<Col span="12">
										<FormItem label="景点级别">
											<Select v-model="form.data.level">
												<Option value="0">无</Option>
												<Option value="1">A</Option>
												<Option value="2">AA</Option>
												<Option value="3">AAA</Option>
												<Option value="4">AAAA</Option>
												<Option value="5">AAAAA</Option>
											</select>
										</FormItem>
									</Col>
									<Col span="12">
										<FormItem label="开放时间">
											<TimePicker format="HH:mm" v-model="form.data.open_time" style="width: 100%;"></TimePicker>
										</FormItem>
									</Col>
									<Col span="12">
										<FormItem label="关闭时间">
											<TimePicker format="HH:mm" v-model="form.data.close_time" style="width: 100%;"></TimePicker>
										</FormItem>
									</Col>
								</template>
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
					</Row>
				</TabPane>
				<TabPane label="文物介绍" name="tab_content">
					<Tinymce ref="content" v-model="form.data.content" />
				</TabPane>
			</Tabs>
			<FormItem>
				<Button type="primary" @click="handleSubmit">{{$t('btn_submit')}}</Button>
			</FormItem>
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
						excerpt:'',
						season:['1','2'],
						is_attractions:'1',
						visit_time:0,
						price:0,
						level:'0',
						content:'',
						thumbnail:'',
						open_time:'09:00',
						close_time:'18:00'
					},
					rule:{
						name:[
							{required: true,trigger: 'blur',message: that.$t('please')+that.$t('enter')+'文物名称'},
						]
					}
				},
				tabs:'tab_basis'
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
						this.$Message.error(this.$t('please')+this.$t('upload')+'文物图片');
						this.tabs='tab_basis';
						return false;
					}else if(data.content.length<1){
						this.$Message.error(this.$t('please')+this.$t('enter')+'文物介绍');
						this.tabs='tab_content';
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
					that.$store.dispatch('createVillageRelics',data).then((result) => {
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
	
	.create-village-relics{
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
