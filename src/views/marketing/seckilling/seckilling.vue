<style lang="less">
    @import "./index.less";
</style>
<template>
    <div class="wrap wrap-seckilling">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="3">
                    <h1 class="head-title">秒杀管理</h1>
                </Col>
                <Col span="15" offset="3">
                    <Input v-model="searchWords" placeholder="请输入商品名称..." class="search-input"/>
                    
                    <span>价格范围：</span>
                    <Input v-model="priceMin" class="search-price"></Input>
                    <Icon type="ios-minus-empty"></Icon>
                    <Input v-model="priceMax" class="search-price price-space"></Input>
                    <Button type="primary">搜索</Button>
                </Col>
                <Col span="2">
                    <Button type="primary" @click="redirectToPage('add')">挑选商品加入秒杀</Button>
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
    name: 'Seckilling',
    data () {
        return {
            searchWords: '',
            priceMin:'',  //搜索  最小价格
            priceMax:'', //搜索  最大价格
            tableData:this.getTableData(),
            tableColumns:[
                {
                    width: '31%',
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
                    title: '秒杀价',
                    key: 'seckillPrice',
                    sortable: true
                },
                {
                    width: '8%',
                    title: '售价',
                    key: 'price',
                    sortable: true
                },
                {
                    width: '8%',
                    title: '活动状态',
                    key: 'activityStatus',
                    render: (h, params) => {
                        var text="";
                        if(params.row.activityStatus == 0 ){
                            text = '即将开始'
                        }
                        else if(params.row.activityStatus == 1 ){
                            text = '进行中'
                        }
                        else{
                            text = '已结束'
                        }
                        return h('span',{
                            'class': {
                                end: params.row.activityStatus == 2
                            },
                            domProps: {
                                innerHTML: text
                            },
                        });
                    }
                },
                {
                    width: '12%',
                    title: '活动时间',
                    key: 'activityTime',
                },
                {
                    width: '8%',
                    title: '秒杀总件数',
                    key: 'seckillTotal',
                },
                {
                    width: '8%',
                    title: '销量',
                    key: 'sellNum',
                    sortable: true
                },
                {
                    title: '操作',
                    key: 'operate',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                domProps:{
                                    innerText: params.row.activityStatus != 2 ? '秒杀设置':'',
                                },
                                style: {
                                        marginRight: '15px'
                                    },
                                on: {
                                    click: (event) => {
                                        this.redirectToSetting('edit',params.row.id)
                                    }
                                }
                            }),
                            h('a', {
                                domProps:{
                                    innerText: params.row.activityStatus != 2 ? '取消秒杀':'',
                                },
                                style: {
                                        marginRight: '15px'
                                    },
                                on: {
                                    click: (event) => {
                                        this.handleCancelSeckill(params.row,event)
                                    }
                                }
                            }),

                        ]);
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
                name: 'SeckillingGoodsList',
            });
        },
        redirectToSetting(){
            this.$router.push({
                name: 'SeckillingSetting',
            });
        },
        handleCancelSeckill(){
            this.$Modal.confirm({
                title: '温馨提示',
                width: "500px",
                content: '<p style="font-size:14px; margin-bottom:30px;">确定取消商品的秒杀吗?</p><p style="font-size:14px; color:#ff776d">注：取消后秒杀活动自动结束，已下单的秒杀商品价格不受影响?</p>',
                onOk: () => {
                    this.$Message.success('删除成功！');
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
                if(i % 3 == 0){
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 200 + 1),
                        seckillPrice: Math.floor(Math.random () * 30 + 1),
                        activityTime: '2017-07-09 12:12:02~2017-08-19 12:12:02' ,
                        activityStatus: 1,
                        sellNum: Math.floor(Math.random () * 5662 + i),
                        seckillTotal:i+10
                    })
                }
                else if(i % 3 == 1){
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 200 + 1),
                        seckillPrice: Math.floor(Math.random () * 30 + 1),
                        activityTime: '2017-07-09 12:12:02~2017-08-19 12:12:02' ,
                        activityStatus: 2,
                        sellNum: Math.floor(Math.random () * 5662 + i),
                        seckillTotal:i+10
                    })
                }
                else{
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 200 + 1),
                        seckillPrice: Math.floor(Math.random () * 30 + 1),
                        activityTime: '2017-08-09 12:12:02~2017-09-19 12:12:02' ,
                        activityStatus: 0,
                        sellNum: Math.floor(Math.random () * 5662 + i),
                        seckillTotal:i+10
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
