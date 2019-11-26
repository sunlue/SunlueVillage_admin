const menu = [{
		name: '首页',
		href: 'data'
	},
	{
		name: '村落概况',
		children: [{
				name: '基本信息',
				href: 'basis'
			},
			{
				name: '地理信息',
				href: 'geo'
			},
			{
				name: '自然环境',
				href: 'natural'
			},
			{
				name: '文物古迹',
				href: 'relics'
			},
			{
				name: '风景名胜',
				href: 'scenic'
			}
		]
	},
	{
		name: '组织党建',
		children: [{
			name: '党组织',
			href: 'group'
		}, {
			name: '两新组织',
			href: 'newgroup'
		}]
	},
	{
		name: '村落幻灯片',
		href: 'slide'
	},
	{
		name: '历史演变',
		children: [{
				name: '村落历史'
			},
			{
				name: '历史人物'
			},
			{
				name: '历史事件'
			},
			{
				name: '掌故轶事'
			}
		]
	},
	{
		name: '村落建筑',
		children: [{
				name: '选址格局',
				children: [{
						name: '村落选址'
					},
					{
						name: '村落格局'
					},
					{
						name: '村落风貌'
					},
					{
						name: '建村智慧'
					}
				]
			},
			{
				name: '传统建筑'
			},
			{
				name: '历史要素'
			}
		]
	},
	{
		name: '生产生活',
		children: [{
				name: '特色物产'
			},
			{
				name: '商业集市',
				children: [{
						name: '农家乐'
					},
					{
						name: '小卖部'
					}
				]
			},
			{
				name: '生产工艺'
			},
			{
				name: '生产工具'
			},
			{
				name: '美味美食'
			},
			{
				name: '交通工具'
			}
		]
	},
	{
		name: '民俗文化',
		children: [{
				name: '非物质文化遗产'
			},
			{
				name: '节庆活动'
			},
			{
				name: '特色文化'
			}
		]
	},
	{
		name: '旅游导览',
		children: [{
				name: '入村线路'
			},
			{
				name: '村内导览'
			}
		]
	},
	{
		name: '720全景',
		href: 'krpano'
	}
];
export default menu;
