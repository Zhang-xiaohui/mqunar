<style lang="less">
    @import "./index.less";
</style>
<template>
    <div class="wrap wrap-goods-library">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="3">
                    <h1 class="head-title">
                        分销商品库
                        <router-link :to="{ name: 'QuestionList'}">
                            <Tooltip content="如何加入分销，获得更多收益？" placement="bottom">
                                <i class="iconfont icon-wenti"></i>
                            </Tooltip>
                        </router-link>
                    </h1>
                </Col>
                <Col span="21">
                    <Input v-model="searchWords" placeholder="请输入商品名称..." class="search-input"/>
                    <Select v-model="searchParentClassify" placeholder="请选择一级分类" class="search-select">
                        <Option v-for="item in parentClassifyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <Select v-model="searchSubClassify" placeholder="请选择二级分类" class="search-select">
                        <Option v-for="item in subClassifyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                    <span>价格范围：</span>
                    <Input v-model="priceMin" class="search-price"></Input>
                    <Icon type="ios-minus-empty"></Icon>
                    <Input v-model="priceMax" class="search-price price-space"></Input>
                    <Button type="primary">搜索</Button>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <div class="batch-section" v-if="showBatchSection">
                <Button class="btn-batch">批量加入分销</Button>
            </div>
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table" @on-selection-change="handleSelectChange"></Table>
            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DistributionLib',
    data () {
        return {
            searchWords: '',
            priceMin:'',  //搜索  最小价格
            priceMax:'', //搜索  最大价格
            searchParentClassify:'',
            searchSubClassify:'',
            parentClassifyList:[{
                    id:1,
                    name:'亲子购物'
                },{
                    id:2,
                    name:'育婴护理'
                },{
                    id:3,
                    name:'游泳洗澡'
                },{
                    id:4,
                    name:'周边游'
                },{
                    id:5,
                    name:'亲子游乐'
            }],
            subClassifyList:[],
            showBatchSection:false,
            tableData:this.getTableData(),
            tableColumns:[
                {
                    type: 'selection',
                    width: 55,
                    align: 'center',
                    className:'table-border-r'
                },
                {
                    width: '45%',
                    title: '商品',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', {
                            'class':{
                                'goods-info':true
                            }
                        },
                        [
                            h('div', {
                                'class':{  
                                    'goods-cover':true
                                },
                                style: {
                                    backgroundImage: 'url(' + params.row.goodsImg + ')',
                                }
                            }),
                            h('a', {
                                'class':{  
                                    'goods-name':true
                                },
                                attrs: {
                                    href: ''
                                },
                            }, params.row.name)
                        ]);
                    }
                },
                {
                    title: '售价',
                    key: 'price',
                    sortable:true
                },
                {
                    title: '利润',
                    key: 'profit',
                },
                {
                    title: '库存',
                    key: 'stock'
                },
                
                {
                    title: '操作',
                    key: 'operate',
                    render: (h, params) => {
                        return h('a', {
                            domProps:{
                                innerHTML:'加入分销'
                            },
                            on: {
                                click: (event) => {
                                    this.handleJoin(params.row.id)
                                }
                            }
                        });
                    }
                },
            ],
        };
    },
    methods: {
        handleSelectChange (selection){
            if(selection.length > 0){
                this.showBatchSection = true;
            }
            else{
                this.showBatchSection = false;
            }
        },
        handleSearch () {
            
        },
        handleJoin(id){
            this.$Modal.confirm({
                title: '加入分销',
                width: "500px",
                content: '<p style="font-size:14px; margin-bottom:30px;">已将商品添加至分销，快去设置分销规则吧！</p><p style="font-size:14px; color:#ff776d">注：未设置的分类商品将无法上架</p>',
                okText:'去设置',
                cancelText:'继续添加',
                onOk: () => {
                    this.$router.push({
                        name: 'DistributionSet'
                    });
                }
            });
        },
        rowClassName (row,index) {
            if(index%2 == 0){
                return 'even';
            }
            else{
                return 'odd';
            }
        },
        getTableData() {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    id: i,
                    goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                    name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                    price: Math.floor(Math.random () * 200 + 1),
                    stock: Math.floor(Math.random () * 30 + 1),
                    profit: 155 + Math.floor(Math.random () * 30 + 1)
                })
                
            }
            return data;
        },
        changePage() {
            
        }
    },
    mounted () {
    }
};
</script>
