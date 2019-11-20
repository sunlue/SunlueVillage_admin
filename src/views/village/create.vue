<template>
	<Card class="create-village-page scroll-y">
		<p slot="title">
			<Icon type="ios-add-circle-outline" :size="18" />
			{{$t('create')}}{{$t('village')}}
		</p>
		<a href="#" slot="extra" @click="$emit('back')">
			<Icon type="ios-arrow-back" />
			{{$t('back')}}{{$t('village_list')}}
		</a>
		<Form ref="formVal" :model="form.data" :rules="form.rule" :label-width="100">
			<Tabs :value="tabs">
				<TabPane :label="$t('basis_info')" name="tab_basis">
					<Row>
						<Col span="15">
							<Row>
								<Col span="18">
									<FormItem :label="$t('village_name')" prop="region">
										<Cascader :data="region" v-model="form.data.region" filterable placeholder="请输入或选择村落名称"></Cascader>
									</FormItem>
								</Col>
								<Col span="6">
									<FormItem :label="$t('village_type')" prop="type">
										<Select v-model="form.data.type">
											<Option value="1">行政村</Option>
											<Option value="2">自然村</Option>
										</select>
									</FormItem>
								</Col>
								<Col span="24" v-if="nation.length>0">
									<FormItem :label="$t('village_nation')" prop="nation">
										<CheckboxGroup v-model="form.data.nation">
											<template v-for="(item,index) in nation">
												<Checkbox :key="index" :label="item.value">
													<span>{{item.label}}</span>
												</Checkbox>
											</template>
										</CheckboxGroup>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('registered_population')" prop="registered_population">
										<InputNumber :min="0" v-model="form.data.registered_population"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('registered_population_man')" prop="registered_population_man">
										<InputNumber :min="0" v-model="form.data.registered_population_man"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('registered_population_woman')" prop="registered_population_woman">
										<InputNumber :min="0" v-model="form.data.registered_population_woman"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('permanent_population')" prop="permanent_population">
										<InputNumber :min="0" v-model="form.data.permanent_population"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('permanent_population_man')" prop="permanent_population_man">
										<InputNumber :min="0" v-model="form.data.permanent_population_man"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('permanent_population_woman')" prop="permanent_population_woman">
										<InputNumber :min="0" v-model="form.data.permanent_population_woman"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('village_decade')" prop="village_decade">
										<Input type="text" v-model="form.data.village_decade"></Input>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('collective_income')" prop="collective_income">
										<InputNumber :min="0" v-model="form.data.collective_income"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('person_income')" prop="person_income">
										<InputNumber :min="0" v-model="form.data.person_income"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('village_domain_area')" prop="domain_area">
										<Input type="text" v-model="form.data.domain_area"></Input>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('village_area')" prop="village_area">
										<Input type="text" v-model="form.data.village_area"></Input>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem :label="$t('village_hits')" prop="hits">
										<InputNumber :min="0" v-model="form.data.hits"></InputNumber>
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem :label="$t('village_industry')" prop="industry">
										<Input type="textarea" v-model="form.data.industry"></Input>
									</FormItem>
								</Col>
							</Row>
						</Col>
						<Col span="8" offset="1">
							 <Upload ref="upload" type="drag" accept="image" name="file" :show-upload-list="false" :action="upload.url" 
								:format="['jpg','jpeg','png']" :headers="upload.headers" :on-success="uploadSuccess">
								<div style="padding: 16px 0">
									<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
									<p>{{$t('upload_drag')}}</p>
								</div>
							</Upload>
							<div class="preview" v-if="upload.result.path">
								<img :src="upload.result.url" :alt="upload.result.name" />
								<div class="deleted">
									<Button type="error">{{$t('delete')}}</Button>
								</div>
							</div>
							<FormItem :label-width="0">
								<div style="display: flex;justify-content : space-around;">
									<FormItem prop="show">
										<i-switch size="large" v-model="form.data.show" true-value="1" false-value="0">
											<span slot="open">{{$t('village_show')}}</span>
											<span slot="close">{{$t('village_hide')}}</span>
										</i-switch>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.demonstration" true-value="1" false-value="0">
											<span>{{$t('demonstration')}}</span>
										</Checkbox>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.advanced" true-value="1" false-value="0">
											<span>{{$t('advanced')}}</span>
										</Checkbox>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.is_top" true-value="1" false-value="0">
											<span>{{$t('article_is_top')}}</span>
										</Checkbox>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.recommended" true-value="1" false-value="0">
											<span>{{$t('article_recommended')}}</span>
										</Checkbox>
									</FormItem>
									<FormItem>
										<Checkbox v-model="form.data.hot" true-value="1" false-value="0">
											<span>{{$t('article_hot')}}</span>
										</Checkbox>
									</FormItem>
								</div>
							</FormItem>
						</Col>
					</Row>
				</TabPane>
				<TabPane :label="$t('village_content')" name="tab_content">
					<Tinymce ref="content" v-model="form.data.content" />
				</TabPane>
				<TabPane :label="$t('seo_setting')" name="tab_seo">
					<FormItem :label="$t('seo_title')">
						<Input type="text" v-model="form.data.seo_title"></Input>
					</FormItem>
					<FormItem :label="$t('seo_keywords')">
						<Input type="text" v-model="form.data.seo_keywords"></Input>
					</FormItem>
					<FormItem :label="$t('seo_description')">
						<Input type="text" v-model="form.data.seo_description"></Input>
					</FormItem>
				</TabPane>
				<TabPane :label="$t('other_setting')" name="tab_other">
					<FormItem :label="$t('target')">
						<RadioGroup type="button" v-model="form.data.target">
							<Radio label="_blank">{{$t('target_blank')}}</Radio>
							<Radio label="_self">{{$t('target_self')}}</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem :label="$t('article_tag')" class="article_tag">
						<FormItem :label-width="0" v-for="(item, index) in form.tag" :key="index">
							<Row>
								<Col :xs="{span:16}" :sm="{span:12}" :lg="{span:8}">
									<Col span="18">
										<Input type="text" v-model="item.value" :placeholder="$t('please')+$t('enter')+$t('article_tag')"></Input>
									</Col>
									<Col span="4" offset="1" v-if="form.tag.length>1">
										<Button @click="handleRemoveTag(index)">{{$t('delete')}}</Button>
									</Col>
								</Col>
							</Row>
						</FormItem>
					</FormItem>
					<FormItem>
						<Button type="dashed" icon="md-add" @click="handleCreateTag()">{{$t('create')+$t('article_tag')}}</Button>
					</FormItem>
				</TabPane>
			</Tabs>
			<FormItem>
				<Button type="primary" @click="handleSubmit">{{$t('btn_submit')}}</Button>
				<Button @click="$emit('back')" style="margin-left: 8px">{{$t('back')}}</Button>
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
			let that=this,
				uploadImage=this.$assets.upload.image;
			return {
				form:{
					data:{
						region:['510000000000','510700000000','510703000000'],
						type:'1',
						registered_population:0,
						registered_population_man:0,
						registered_population_woman:0,
						permanent_population:0,
						permanent_population_man:0,
						permanent_population_woman:0,
						collective_income:0,
						person_income:0,
						nation:[],
						decade:'',
						domain_area:'',
						village_area:'',
						content:'',
						industry:'',
						hits:0,
						demonstration:'',
						advanced:'',
						show:'1',
						is_top:'1',
						recommended:'1',
						hot:'1',
						target:'_blank',
						seo_title:'',
						seo_keywords:'',
						seo_description:''
					},
					rule:{
						// name:[
						// 	{required: true,trigger: 'blur',message: that.$t('please')+that.$t('enter')+that.$t('village_name')},
						// ],
						// type:[
						// 	{required: true,trigger: 'blur',message: that.$t('please')+that.$t('enter')+that.$t('village_type')},
						// ]
					},
					tag:[{
						value:''
					}]
				},
				region:[],
				nation:[],
				tabs:'tab_basis',
				upload: {
					url: uploadImage,
					header: {},
					result:{
						path: '',
						name: ''
					}
				},
			}
		},
		mounted() {
			this.$store.dispatch('readRegion',{
				structure:'tree'
			}).then(result=>{
				this.region=[result]
			})
			this.$store.dispatch('readNation').then(result=>{
				this.nation=result
			})
		},
		methods: {
			uploadSuccess(response){
				if(response.code==200){
					this.upload.result.path = response.data.link;
					this.upload.result.url = response.data.url+response.data.link;
					this.upload.result.name = response.data.name;
				}else{
					this.$Message.error(response.info);
				}
			},
			formValidate(name,callback){
				this.$refs[name].validate((valid) => {
					if(!valid){return false;}
					var data=this.form.data;
					if(data.content.length<1){
						this.$Message.error(this.$t('please')+this.$t('enter')+this.$t('village_content'));
						this.tabs='tab_content';
						return false;
					}
					callback();
				});
			},
			handleSubmit () {
				let that=this,
					data=Object.assign(this.form.data,{
						'tag':this.form.tag,
						'thumbnail':this.upload.result.path
					});
					console.log(data)
				this.formValidate('formVal',function(){
					that.$store.dispatch('createVillageData',data).then((result) => {
						that.$emit('submit',result);
						that.handleReset();
					});
				})
			},
			handleCreateTag(){
				this.form.tag.push({
						value: ''
				});
			},
			handleRemoveTag(index){
				this.form.tag.splice(index,1)
			}
		}
	}
</script>

<style lang="less">
	
	.ivu-input-number{
		width: 100%;
	}
	
	.create-village-page{
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
	
	.article_tag{
		.ivu-form-item{
			margin-bottom: 15px;
			&:last-child{
				margin-bottom: 0px;
			}
		}
	}
</style>
