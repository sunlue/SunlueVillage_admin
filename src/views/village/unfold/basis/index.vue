<template>
	
	<div class="create-village-page">
		<div class="scroll-y">
			<Card class="">
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
											<FormItem :label="$t('village_attr')" prop="attr">
												<Select v-model="form.data.attribute">
													<Option value="1">行政村</Option>
													<Option value="2">自然村</Option>
												</select>
											</FormItem>
										</Col>
										<Col span="24">
											<FormItem :label="$t('village_type')" prop="type">
												<Select v-model="form.data.type" clearable multiple>
													<template v-for="(item,index) in type">
															<Option :value="item.uniqid" :key="index">{{ item.name }}</Option>
													</template>
												</Select>
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
												<InputNumber :min="0" v-model="form.data.registered_population"
													:formatter="value => `${value}人`" :parser="value => value.replace('人', '')">
												</InputNumber>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('registered_population_man')" prop="registered_population_man">
												<InputNumber :min="0" v-model="form.data.registered_population_man"
													:formatter="value => `${value}人`" :parser="value => value.replace('人', '')"></InputNumber>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('registered_population_woman')" prop="registered_population_woman">
												<InputNumber :min="0" v-model="form.data.registered_population_woman"
													:formatter="value => `${value}人`" :parser="value => value.replace('人', '')"></InputNumber>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('permanent_population')" prop="permanent_population">
												<InputNumber :min="0" v-model="form.data.permanent_population"
													:formatter="value => `${value}人`" :parser="value => value.replace('人', '')"></InputNumber>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('permanent_population_man')" prop="permanent_population_man">
												<InputNumber :min="0" v-model="form.data.permanent_population_man"
													:formatter="value => `${value}人`" :parser="value => value.replace('人', '')"></InputNumber>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('permanent_population_woman')" prop="permanent_population_woman">
												<InputNumber :min="0" v-model="form.data.permanent_population_woman"
													:formatter="value => `${value}人`" :parser="value => value.replace('人', '')"></InputNumber>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('village_decade')" prop="village_decade">
												<Input type="text" v-model="form.data.decade"></Input>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('collective_income')" prop="collective_income">
												<InputNumber :min="0" v-model="form.data.collective_income"
													:formatter="value => `${value}元`" :parser="value => value.replace('元', '')"></InputNumber>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('person_income')" prop="person_income">
												<InputNumber :min="0" v-model="form.data.person_income"
													:formatter="value => `${value}元`" :parser="value => value.replace('元', '')"></InputNumber>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('village_domain_area')" prop="domain_area">
												<Input type="text" v-model="form.data.domain_area">
													<span slot="append">平方公里</span>
												</Input>
											</FormItem>
										</Col>
										<Col span="8">
											<FormItem :label="$t('village_area')" prop="village_area">
												<Input type="text" v-model="form.data.village_area">
													<span slot="append">平方公里</span>
												</Input>
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
									 <Upload ref="upload" type="drag" accept="image" name="file" :show-upload-list="false" :action="$upload.image" 
										:format="['jpg','jpeg','png']" :on-success="uploadThumbSuccess">
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
							<FormItem :label="$t('village_tag')" class="village_tag">
								<FormItem :label-width="0" v-for="(item, index) in form.data.tag" :key="index">
									<Row>
										<Col :xs="{span:16}" :sm="{span:12}" :lg="{span:8}">
											<Col span="18">
												<Input type="text" v-model="item.value" :placeholder="$t('please')+$t('enter')+$t('village_tag')"></Input>
											</Col>
											<Col span="4" offset="1" v-if="form.data.tag.length>1">
												<Button @click="handleRemoveTag(index)">{{$t('delete')}}</Button>
											</Col>
										</Col>
									</Row>
								</FormItem>
							</FormItem>
							<FormItem>
								<Button type="dashed" icon="md-add" @click="handleCreateTag()">{{$t('create')+$t('village_tag')}}</Button>
							</FormItem>
						</TabPane>
					</Tabs>
					<FormItem>
						<Button type="primary" @click="handleSubmit">{{$t('btn_submit')}}</Button>
					</FormItem>
				</Form>
			</Card>
		</div>
	</div>
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
						region:['510000000000','510700000000','510703000000'],
						attribute:'1',
						type:[],
						thumbnail:'',
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
					}
				},
				region:[],
				nation:[],
				type:[],
				tabs:'tab_basis'
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
			this.$store.dispatch('readVillageType').then(result=>{
				this.type=result
			})
			
			let uniqid = this.$route.query.unique;
			let assetsUrl = this.$assets.url;
			this.$store.dispatch('readVillageDataDetails', {
				uniqid: uniqid
			}).then(result => {
				this.form.data=result
				this.form.data.region=result.region_text;
				this.form.data.attribute=result.attribute+'';
				this.form.data.show=result.show+'';
				this.form.data.is_top=result.is_top+'';
				this.form.data.hot=result.hot+'';
				this.form.data.recommended=result.recommended+'';
				this.form.data.demonstration=result.demonstration+'';
				this.form.data.advanced=result.advanced+'';
				this.form.data.nation=result.nation;
				this.$refs.content.setContent(result.content)
				console.log(this.form.data)
			});
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
					if(data.content.length<1){
						this.$Message.error(this.$t('please')+this.$t('enter')+this.$t('village_content'));
						this.tabs='tab_content';
						return false;
					}
					callback();
				});
			},
			handleSubmit () {
				let that=this;
				this.formValidate('formVal',function(){
					that.$store.dispatch('updateVillageData',that.form.data).then((result) => {
						that.$Message.success('success');
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
		position: relative;
		width: 100%;
		height: 100%;
		background: white;
		.scroll-y{
			position: absolute;
		}
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
