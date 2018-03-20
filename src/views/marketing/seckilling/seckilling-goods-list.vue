<style lang="less">
    @import "./index.less";
</style>
<template>
    <div class="wrap wrap-seckilling wrap-seckilling-goods">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="3">
                    <h1 class="head-title">商品列表</h1>
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
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table"></Table>
            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SeckillingGoodslist',
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
            tableData:this.getTableData(),
            tableColumns:[
                {
                    width: '36%',
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
                    width: '8%',
                    title: '售价',
                    key: 'price'
                },
                {
                    width: '8%',
                    title: '库存',
                    key: 'stock'
                },
                {
                    width: '8%',
                    title: '包邮',
                    key: 'pinkage',
                    render: (h, params) => {
                        var text="";
                        if(params.row.pinkage == 0 ){
                            text = '否'
                        }
                        else{
                            text = '是'
                        }
                        return h('span',{
                            domProps: {
                                innerHTML: text
                            },
                        });
                    }
                },
                {
                    width: '10%',
                    title: '商品类型',
                    key: 'type',
                    render: (h, params) => {
                        var text="";
                        if(params.row.type == 0 ){
                            text = '自营商品'
                        }
                        else{
                            text = '分销商品'
                        }
                        return h('span',{
                            domProps: {
                                innerHTML: text
                            },
                        });
                    }
                },
                {
                    width: '10%',
                    title: '上架状态',
                    key: 'saleStatus',
                    render: (h, params) => {
                        var text="";
                        if(params.row.saleStatus == 0 ){
                            text = '已下架'
                        }
                        else{
                            text = '上架中'
                        }
                        return h('span',{
                            domProps: {
                                innerHTML: text
                            },
                        });
                    }
                },
                {
                    width: '8%',
                    title: '销量',
                    key: 'sellNum',
                },
                {
                    title: '操作',
                    key: 'operate',
                    render: (h, params) => {
                        return h('a', {
                            domProps:{
                                innerHTML:'加入秒杀活动'
                            },
                            on: {
                                click: (event) => {
                                    this.redirectToPage('edit',params.row.id)
                                }
                            }
                        });
                    }
                },
            ],
        };
    },
    methods: {
        handleSearch () {
            
        },
        redirectToPage(){
            this.$router.push({
                name:'SeckillingSetting'
            })
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
                if(i % 3 == 0){
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 200 + 1),
                        stock: Math.floor(Math.random () * 30 + 1),
                        pinkage: 0,
                        type: 1,
                        saleStatus: 0,
                        sellNum: Math.floor(Math.random () * 5662 + i)
                    })
                }
                else{
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 201 + 1),
                        stock: Math.floor(Math.random () * 31 + 1),
                        pinkage: 1,
                        type: 0,
                        saleStatus: 1,
                        sellNum: Math.floor(Math.random () * 5663 + i)
                    })
                }
                
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
