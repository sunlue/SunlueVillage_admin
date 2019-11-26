<template>
	<div class="village-scenic-page">
		<div class="scroll-y">
			<template v-if="action=='create'">
				<create-page @back=" action='datagrid' " @create="createScenic"></create-page>
			</template>
			<template v-else-if="action=='update'">
				<update-page @back=" action='datagrid' " :updata="updata"></update-page>
			</template>
			<template v-else>
				<ButtonGroup>
					<Button type="info" @click=" action='create' ">新增</Button>
				</ButtonGroup>
				<Divider />
				<Row>
					<template v-if="datagrid.length<1">
						<div class="empty-data">
							暂无数据
						</div>
					</template>
					<template v-for="(item,index) in datagrid">
						<Col span="4" :key="index">
							<div class="item" :key="index">
								<div class="thumbnail" v-if="item.thumbnail">
									<img :src="$assets.url+item.thumbnail" />
									<strong class="title">{{item.name}}</strong>
								</div>
								<div class="titles" v-else>{{item.name}}</div>
								<div class="intro" v-if="item.excerpt">{{item.excerpt}}</div>
								<div class="intro" v-else-if="item.content" v-html="item.content"></div>
								<div class="intro" v-else>暂无简介</div>
								<Divider />
								<div class="footer">
									<Row :gutter="10">
										<Col span="12" class="text-left">
											<ButtonGroup size="small">
												<Tooltip content="置顶" placement="top">
													<Button size="small" @click="$emit('update',row,index)">
														<Icon type="md-arrow-round-up" />
													</Button>
												</Tooltip>
												<Tooltip content="推荐" placement="top">
													<Button size="small" @click="$emit('update',row,index)">
														<Icon type="ios-thumbs-up" />
													</Button>
												</Tooltip>
											</ButtonGroup>
										</Col>
										<Col span="12" class="text-right">
											<ButtonGroup size="small">
												<Tooltip :content="$t('btn_update')" placement="top">
													<Button size="small" type="primary" @click="updateScenic(item,index)">
														<Icon type="md-create" />
													</Button>
												</Tooltip>
												<Tooltip :content="$t('btn_delete')" placement="top">
													<Button size="small" type="error" @click="deleteScenic(item,index)">
														<Icon type="ios-trash-outline" />
													</Button>
												</Tooltip>
											</ButtonGroup>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</template>
				</Row>
				<Divider />
				<div class="paging">
					<Row>
						<Col span="12" class="text-left">
							<Page :total="paging.total" :current="paging.page" :page-size="paging.limit"
								:page-size-opts="[12,24,36,48]" :show-sizer="true"
								@on-change="changePage" @on-page-size-change="changePageSize"></Page>
						</Col>
						<Col span="12" class="text-right">
							共计{{paging.total}}条数据，
							共计{{Math.ceil(paging.total/paging.limit)}}页，
							当前第{{paging.page}}页
						</Col>
					</Row>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import createPage from './create.vue'
	import updatePage from './update.vue'
	export default{
		components:{
			createPage,
			updatePage
		},
		data(){
			return{
				action:'datagrid',
				datagrid:[],
				updata:{},
				paging:{
					total:0,
					page:1,
					limit:12
				}
			}
		},
		mounted() {
			let that=this,
				village_id=this.$route.query.unique;
			that.$store.dispatch('readVillageScenic',{
				village_id:village_id
			}).then((result) => {
				this.datagrid=result.data;
				this.paging.total=result.total;
			});
		},
		methods:{
			changePage(pageNumber){
				this.paging.page=pageNumber
			},
			changePageSize(pageSize){
				this.paging.limit=pageSize
			},
			createScenic(data){
				this.datagrid.push(data);
				this.paging.total+=1;
			},
			updateScenic(item,index){
				this.updata=item
				this.action='update'
			},
			deleteScenic(item,index){
				let that = this;
				that.$Modal.confirm({
					title: that.$t('tips'),
					content: that.$t('tips_delete_data'),
					onOk: function() {
						that.$store.dispatch('deleteVillageScenic', {
							uniqid: item.uniqid,
						}).then((result) => {
							that.datagrid.splice(index, 1);
							that.paging.total+=1;
						});
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.village-scenic-page{
		position: relative;
		width: 100%;
		height:100%;
		.scroll-y{
			position: absolute;
			width: 100%;
			height:100%;
			padding: 5px;
			box-sizing: border-box;
			.empty-data{
				min-height: 200px;
				line-height: 200px;
				text-align: center;
			}
			.item{
				box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);
				margin: 5px;
				background: white;
				.thumbnail{
					width: 100%;
					height: 220px;
					overflow: hidden;
					position: relative;
					&:hover{
						img{
							transform: scale(1.2);
						}
					}
					img{
						width: 100%;
						height: 100%;
						transition: all 1s;
					}
					.title{
						position: absolute;
						width: 100%;
						padding: 10px;
						bottom: 0px;
						left: 0px;
						background: rgba(0,0,0,.5);
						color: white;
					}
					&+.intro{
						-webkit-line-clamp: 3;
						height: 76px;
						line-height: 24px;
					}
				}
				.titles{
					padding: 24px;
					box-sizing: border-box;
					border-bottom: 1px solid #cccccc;
					overflow: hidden;
					&+.intro{
						-webkit-line-clamp: 6;
						line-height: 24px;
						height: 152px;
					}
				}
				.intro{
					padding: 10px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.footer{
					padding: 0px 10px 10px;
				}
			}
			.paging{
				padding: 0px 10px 10px;
				.text-right{
					line-height: 32px;
					font-size: 14px;
				}
			}
		}
	}
</style>
