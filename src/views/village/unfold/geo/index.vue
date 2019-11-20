<template>
	<Card class="create-village—geo-page scroll-y">
		<Form :model="formItem" :label-width="80">
			<Tabs value="info">
				<TabPane label="地理信息" name="info">
					<Row>
						<Col span="15">
							<Row>
								<Col span="12">
									<FormItem label="经度">
										<InputNumber v-model="formItem.lng" :step="1.00"></InputNumber>
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="纬度">
										<InputNumber v-model="formItem.lat" :step="1.00"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem label="平均海拔">
										<InputNumber v-model="formItem.altitude" :step="1.00"
										:formatter="value => `${value}米`"
										:parser="value => value.replace('米', '')"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem label="最高海拔">
										<InputNumber v-model="formItem.max_altitude" :step="1.00"
										:formatter="value => `${value}米`"
										:parser="value => value.replace('米', '')"></InputNumber>
									</FormItem>
								</Col>
								<Col span="8">
									<FormItem label="最低海拔">
										<InputNumber v-model="formItem.min_altitude" :step="1.00"
										:formatter="value => `${value}米`"
										:parser="value => value.replace('米', '')"></InputNumber>
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="位置境域">
										<Input v-model="formItem.location_realm" type="textarea" :rows="6" :autosize="true"></Input>
									</FormItem>
									<FormItem label="地理构造">
										<Input v-model="formItem.geo_structure" type="textarea" :rows="6" :autosize="true"></Input>
									</FormItem>
									<FormItem label="地形地貌">
										<Input v-model="formItem.topography" type="textarea" :rows="6" :autosize="true"></Input>
									</FormItem>
									<FormItem label="水文概况">
										<Input v-model="formItem.hydrological_situation" type="textarea" :rows="6" :autosize="true"></Input>
									</FormItem>
									<FormItem label="自然灾害">
										<Input v-model="formItem.natural_disasters" type="textarea" :rows="6" :autosize="true"></Input>
									</FormItem>
									<FormItem>
										<Button type="primary" @click="handleSubmit">{{$t('btn_submit')}}</Button>
									</FormItem>
								</Col>
							</Row>
						</Col>
						<Col span="8" offset="1">
							地理位置地图展示
						</Col>
					</Row>
				</TabPane>
			</Tabs>
		</Form>
	</Card>
</template>

<script>
export default {
		data () {
			return {
				formItem: {
					uniqid:'',
					lng: 10.00,
					lat: 0.00,
					altitude: 0.00,
					max_altitude: 0.00,
					min_altitude: 0.00,
					location_realm: '',
					geo_structure: '',
					topography: '',
					hydrological_situation: '',
					natural_disasters: '',
				},
				action:'updateVillageGeo'
			}
		},
		mounted() {
			let village_id=this.$route.query.unique;
			this.$store.dispatch('readVillageGeoDetails',{
				village_id:village_id
			}).then(result=>{
				if(Object.keys(result).length>0){
					this.formItem=result
					this.formItem.lng=(result.lng)*1
					this.formItem.lat=(result.lat)*1
					this.formItem.altitude=(result.altitude)*1
					this.formItem.max_altitude=(result.max_altitude)*1
					this.formItem.min_altitude=(result.min_altitude)*1
					this.action='updateVillageGeo'
				}else{
					this.action='createVillageGeo'
				}
			})
		},
		methods:{
			handleSubmit(){
				let village_id=this.$route.query.unique;
				this.$store.dispatch(this.action,Object.assign(this.formItem,{
					village_id:village_id
				})).then(result=>{
					this.$Message.success('success')
					this.formItem.uniqid=result.uniqid
					this.action='updateVillageGeo'
				})
			}
		}
	}
</script>

<style>
</style>
