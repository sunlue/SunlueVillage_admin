<template>
	<Card class="create-village—geo-page scroll-y">
		<Form :model="formItem" :label-width="100">
			<Tabs value="info">
				<TabPane label="自然环境" name="info">
					<Row>
						<Col span="15">
							<Row>
								<Col span="12">
									<FormItem label="年平均温度">
										<InputNumber v-model="formItem.annual_mean_temperature" :step="1.00"
										:formatter="value => `${value}℃`"
										:parser="value => value.replace('℃', '')"></InputNumber>
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="年均降雨量">
										<InputNumber v-model="formItem.annual_rainfall" :step="1.00"
										:formatter="value => `${value}ml`"
										:parser="value => value.replace('ml', '')"></InputNumber>
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="年无霜期">
										<InputNumber v-model="formItem.annual_frost_free_period"
										:formatter="value => `${value}天`"
										:parser="value => value.replace('天', '')"></InputNumber>
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem label="植被覆盖率">
										<InputNumber v-model="formItem.vegetation_coverage" :step="1.00"
										:formatter="value => `${value}%`"
										:parser="value => value.replace('%', '')"></InputNumber>
									</FormItem>
								</Col>
								<Col span="24">
									<FormItem label="气候特征">
										<Input v-model="formItem.climate_characteristics" type="textarea" :rows="6" :maxlength="255" show-word-limit></Input>
									</FormItem>
									<FormItem label="主要耕地">
										<Input v-model="formItem.main_land" type="textarea" :rows="6" :maxlength="255" show-word-limit></Input>
									</FormItem>
									<FormItem>
										<Button type="primary" @click="handleSubmit">{{$t('btn_submit')}}</Button>
									</FormItem>
								</Col>
							</Row>
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
					annual_mean_temperature: 0.00,
					annual_rainfall: 0.00,
					annual_frost_free_period: 0,
					vegetation_coverage: 0,
					climate_characteristics: '',
					main_land: '',
				},
				action:'createVillageNatural'
			}
		},
		mounted() {
			let village_id=this.$route.query.unique;
			this.$store.dispatch('readVillageNaturalDetails',{
				village_id:village_id
			}).then(result=>{
				if(Object.keys(result).length>0){
					this.formItem=result
					this.formItem.annual_mean_temperature=(result.annual_mean_temperature)*1
					this.formItem.annual_rainfall=(result.annual_rainfall)*1
					this.formItem.annual_frost_free_period=(result.annual_frost_free_period)*1
					this.formItem.vegetation_coverage=(result.vegetation_coverage)*1
					this.action='updateVillageNatural'
				}else{
					this.action='createVillageNatural'
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
					this.action='updateVillageNatural'
				})
			}
		}
	}
</script>

<style>
</style>
