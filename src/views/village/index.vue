<template>
	<div tab="protal_article_list" class="page">
		<div class="split">
			<Split v-model="split" mode="vertical">
				<div slot="top" class="split-pane">
					<Form ref="formInline" :model="search.form.data" :rules="search.form.rule" :label-width="80" inline>
						<FormItem :label="$t('village_name')" prop="name">
							<Input type="text" v-model="search.form.data.name" clearable 
							:placeholder="$t('please')+$t('enter')+$t('village_name')"></Input>
						</FormItem>
						<FormItem :label="$t('village_attr')" prop="attr">
							<Select v-model="search.form.data.attr" clearable filterable>
								<Option value="1">行政村</Option>
								<Option value="2">自然村</Option>
							</select>
						</FormItem>
						<FormItem :label="$t('village_type')" prop="type">
							<Select v-model="search.form.data.type" clearable multiple style="min-width: 200px;">
								<template v-for="(item,index) in type">
										<Option :value="item.uniqid" :key="index">{{ item.name }}</Option>
								</template>
							</Select>
						</FormItem>
						<FormItem :label-width="0">
							<Button type="info" @click="searchVillage">{{ $t('btn_search') }}</Button>
						</FormItem>
					</Form>
				</div>
				<div slot="bottom" class="split-pane">
					<data-grid ref="datagrid" v-show="action=='datagrid'" @create="action='create'"></data-grid>
					<create-page ref="createpage" v-if="action=='create'" @back=" action='datagrid' " @submit="createVillageData"></create-page>
				</div>
			</Split>
		</div>
	</div>
</template>

<script>
	import dataGrid from './grid'
	import createPage from './create'
	export default{
		components: {
			dataGrid,
			createPage
		},
		data(){
			return{
				action:'datagrid',
				split:'60px',
				type:[],
				search:{
					form:{
						data:{
							name:'',
							attr:'',
							type:''
						}
					}
				}
			}
		},
		mounted() {
			this.$store.dispatch('readVillageType').then(result=>{
				this.type=result
			})
		},
		methods: {
			createVillageData(data){
				this.$refs.datagrid.createVillage(data)
				this.action='datagrid';
			},
			searchVillage(){
				this.$refs.datagrid.searchVillage(this.search.form.data)
			}
		}
	}
	
</script>

<style lang="less">
	.ivu-split-vertical {
		.top-pane {
			.split-pane{
				padding: 10px;
			}
		}
		.ivu-split-trigger-con {
			& + .bottom-pane {
				.split-pane{
					padding: 16px 10px 10px 10px;
				}
			}
		}
	}
</style>
