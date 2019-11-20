<template>
	<div class="datagrid">
		<ButtonGroup :size="buttonSize">
			<Button :size="buttonSize" type="primary" @click="$emit('create')">{{$t('create')}}</Button>
			<Button :size="buttonSize" type="primary" @click="renderVillage()">{{$t('btn_refresh')}}</Button>
		</ButtonGroup>
		<Divider size="small" />
		<div class="datatable">
			<div class="scroll-y">
				<Table ref="datatable" size="small" :columns="datagrid.table.columns" :data="datagrid.table.data" :border="true"
				 :draggable="true" :loading="datagrid.table.loading">
					<template slot-scope="{ row,index }" slot="type">
						<template v-if="row.type==1">行政村</template>
						<template v-else>自然村</template>
					</template>
					<template slot-scope="{ row,index }" slot="show">
						<i-switch size="large" :value="row.show+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'show',$event)">
							<span slot="open">{{$t('article_show')}}</span>
							<span slot="close">{{$t('article_hide')}}</span>
						</i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="is_top">
						<i-switch size="small" :value="row.is_top+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'is_top',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="demonstration">
						<i-switch size="small" :value="row.demonstration+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'demonstration',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="advanced">
						<i-switch size="small" :value="row.advanced+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'advanced',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="recommended">
						<i-switch size="small" :value="row.recommended+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'recommended',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="hot">
						<i-switch size="small" :value="row.hot+''" true-value="1" false-value="0" @on-change="handleSwitch(row,index,'hot',$event)"></i-switch>
					</template>
					<template slot-scope="{ row,index }" slot="sort">
						<InputNumber v-model="row.sort" size="small" @on-change="InputNumber(row,index,'sort',$event)"></InputNumber>
					</template>
					<template slot-scope="{ row,index }" slot="hits">
						<InputNumber v-model="row.hits" size="small" @on-change="InputNumber(row,index,'hits',$event)"></InputNumber>
					</template>
					<template slot-scope="{ row,index }" slot="action">
						<ButtonGroup>
							<Tooltip :content="$t('btn_more')" placement="left">
								<Button size="small" type="info" @click="moreVillage(row,index)" target="_blank">
									<Icon type="ios-more" />
								</Button>
							</Tooltip>
							<Tooltip :content="$t('btn_delete')" placement="left">
								<Button size="small" type="error" @click="deleteVillage(row,index)">
									<Icon type="ios-trash-outline" />
								</Button>
							</Tooltip>
						</ButtonGroup>
					</template>
				</Table>
			</div>
			<Row style="margin-top:10px;">
				<Col span="12">
				<Page :total="datagrid.paging.total" :current="datagrid.paging.page" :page-size="datagrid.paging.limit"
				 :show-sizer="true" size="small" @on-change="changePage" @on-page-size-change="changePageSize"></Page>
				</Col>
				<Col span="12" class="text-right">
				共计{{datagrid.paging.total}}条数据，
				共计{{Math.ceil(datagrid.paging.total/datagrid.paging.limit)}}页，
				当前第{{datagrid.paging.page}}页
				</Col>
			</Row>
		</div>
		<Drawer v-model="reviewContent.show" width="1000" :draggable='true' :title="$t('review')+$t('village_content')">
			<div v-html="reviewContent.content"></div>
		</Drawer>
	</div>
</template>

<script>
	import expandAudio from './expand/audio'
	import expandVideo from './expand/video'
	import expandThumb from './expand/thumbnail'
	export default {
		data() {
			let that = this;
			return {
				buttonSize: 'small',
				datagrid: {
					table: {
						columns: [{
								width: 52,
								align:'center',
								type: 'index'
							}, {
								width: 80,
								title: that.$t('thumbnail'),
								align: 'center',
								tooltip: 'true',
								render: (h, params) => {
									return h(expandThumb, {
										props: {
											data: params.row,
											thumbnail: params.row.thumbnail
										},
										on: {
											uploadSuccess: (result) => {
												that.uploadImage(params, result)
											}
										}
									})
								}
							},
							{
								title: that.$t('village_name'),
								key: 'name',
								minWidth: 90,
								align:'center',
								tooltip: 'true'
							},
							{
								title: that.$t('village_type'),
								width: 104,
								slot: 'type',
								align:'center',
								sortable:'true'
							},
							{
								title: that.$t('village_industry'),
								minWidth: 120,
								key: 'industry',
								align:'center',
								tooltip: 'true'
							},
							{
								title: '人口',
								align:'center',
								children:[{
									title: that.$t('registered_population'),
									align:'center',
									children:[{
										title: that.$t('man'),
										width: 72,
										key: 'registered_population_man',
										align:'center',
										sortable:'true'
									},{
										title: that.$t('woman'),
										width: 72,
										key: 'registered_population_man',
										align:'center',
										sortable:'true'
									}]
								},{
									title: that.$t('permanent_population'),
									align:'center',
									children:[{
										title: that.$t('man'),
										width: 72,
										key: 'permanent_population_man',
										align:'center',
										sortable:'true'
									},{
										title: that.$t('woman'),
										width: 72,
										key: 'permanent_population_woman',
										align:'center',
										sortable:'true'
									}]
								}]
							},
							{
								title: that.$t('collective_income')+'(元)',
								minWidth: 86,
								key: 'collective_income',
								align:'center'
							},{
								title: that.$t('person_income')+'(元)',
								minWidth: 86,
								key: 'person_income',
								align:'center'
							},
							{
								title: that.$t('village_content'),
								width: 86,
								align: 'center',
								render: (h, params) => {
									let that = this;
									return h('Button', {
										props: {
											size: 'small',
											type: 'info'
										},
										on: {
											click: () => {
												this.reviewContent.show = true;
												this.reviewContent.content = params.row.content;
											}
										}
									}, that.$t('review'))
								}
							},
							{
								title: that.$t('village_audio'),
								width: 86,
								align: 'center',
								render: (h, params) => {
									let that = this;
									return h(expandAudio, {
										props: {
											data: params.row,
											audio: params.row.audio
										},
										on: {
											uploadSuccess: (result) => {
												that.uploadAudio(params, result)
											}
										}
									})
								}
							},
							{
								title: that.$t('village_video'),
								width: 86,
								align: 'center',
								render: (h, params) => {
									let that = this;
									return h(expandVideo, {
										props: {
											data: params.row,
											video: params.row.video
										},
										on: {
											uploadSuccess: (result) => {
												that.uploadVideo(params, result)
											}
										}
									})
								}
							},
							{
								title: that.$t('village_show'),
								width: 90,
								align: 'center',
								slot: 'show',
								sortable:'true'
							},
							{
								title: that.$t('village_is_top'),
								width: 80,
								align: 'center',
								slot: 'is_top',
								sortable:'true'
							},
							{
								title: that.$t('demonstration'),
								width: 92,
								align: 'center',
								slot: 'demonstration',
								sortable:'true'
							},
							{
								title: that.$t('advanced'),
								width: 92,
								align: 'center',
								slot: 'advanced',
								sortable:'true'
							},
							{
								title: that.$t('village_recommended'),
								width: 80,
								align: 'center',
								slot: 'recommended',
								sortable:'true'
							},
							{
								title: that.$t('village_hot'),
								width: 80,
								align: 'center',
								slot: 'hot',
								sortable:'true'
							},
							{
								title: that.$t('village_sort'),
								width: 90,
								align: 'center',
								slot: 'sort'
							},
							{
								title: that.$t('village_hits'),
								width: 90,
								align: 'center',
								slot: 'hits'
							},
							{
								width: 82,
								align: 'center',
								slot: 'action',
								fixed: 'right',
								className:'col_action'
							}
						],
						data: [],
						loading: false
					},
					paging: {
						total: 0,
						page: 1,
						limit: 10
					}
				},
				reviewContent: {
					show: false,
					content: ''
				}
			}
		},
		mounted() {
			let that = this;
			this.readVillageData({
				page: 1,
				limit: this.datagrid.paging.limit
			}, function(result) {
				that.datagrid.paging.total = result.total;
				that.datagrid.paging.page = result.current_page;
			})
		},
		methods: {
			changePage(pageNumber) {
				this.datagrid.paging.page = pageNumber
				this.readVillageData()
			},
			changePageSize(PageSize) {
				this.datagrid.paging.page = 1
				this.datagrid.paging.limit = PageSize;
				this.readVillageData()
			},
			searchVillage(where) {
				this.readVillageData(where)
			},
			renderVillage(){
				this.readVillageData()
			},
			readVillageData(where, callback) {
				this.datagrid.table.loading = true;
				this.$store.dispatch('readVillageData', Object.assign({
					page:this.datagrid.paging.page,
					limit:this.datagrid.paging.limit
				},where)).then((result) => {
					this.datagrid.table.data = result.data;
					this.datagrid.table.loading = false;
					typeof(callback) == 'function' ? callback(result): '';
				});
			},
			createVillage(data) {
				this.datagrid.table.data.push(data);
			},
			deleteVillage(row, index) {
				let that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteVillageData', {
							uniqid: row.uniqid,
						}).then((result) => {
							that.datagrid.table.data.splice(index, 1);
							that.datagrid.paging.total-=1
						});
					}
				});
			},
			moreVillage(data,index) {
				let routeUrl = this.$router.resolve({
					name: "village_unfold",
					query: {unique:data.uniqid}
				});
				window.open(routeUrl .href, '_blank');
			},
			uploadImage(params, result) {
				let that = this,
					index = params.index,
					row = params.row,
					url = result.url,
					value = result.link;
				that.handleField(row.uniqid, 'thumbnail', value, function() {
					that.datagrid.table.data[index]['thumbnail'] = url + value;
				})
			},
			uploadAudio(params, result) {
				let that = this,
					index = params.index,
					row = params.row,
					url = result.url,
					value = result.link;
				that.handleField(row.uniqid, 'audio', value, function() {
					that.datagrid.table.data[index]['audio'] = url + value;
				})
			},
			uploadVideo(params, result) {
				let that = this,
					index = params.index,
					row = params.row,
					url = result.url,
					value = result.link;
				that.handleField(row.uniqid, 'video', value, function() {
					that.datagrid.table.data[index]['video'] = url + value;
				})
			},
			handleSwitch(row, index, field, value) {
				let that = this;
				that.handleField(row.uniqid, field, value, function() {
					that.datagrid.table.data[index][field] = value;
				})
			},
			handleField(uniqid, field, value, callback) {
				this.$store.dispatch('updateVillageData', {
					uniqid: uniqid,
					field: field,
					value: value
				}).then((result) => {
					typeof(callback) == 'function' ? callback(result): '';
				});
			},
			InputNumber(row, index, field, value) {
				this.handleField(row.uniqid, field, value);
			}
		}
	}
</script>
<style lang="less">
	.datagrid {
		height: 100%;

		.datatable {
			height: 100%;

			.scroll-y {
				height: calc(100% - 81px);
			}
		}
	}

	.col_action {
		.ivu-table-cell {
			padding-left: 10px;
			padding-right: 10px;
		}
	}
</style>
