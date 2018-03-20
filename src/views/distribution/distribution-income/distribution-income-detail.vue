<style lang="less">
    @import "./distribution-income-detail.less";
</style>
<template>
    <div class="wrap-income-detail">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <h1 class="head-title">订单详情</h1>
                <router-link :to="{ name: 'DistributionIncome'}">返回列表</router-link>
            </Row>
        </div>
        <div class="wrap-main">
            <Row class-name="delivery-info" align="middle" >
                <Col class-name="space">收货信息：南瓜粉，13512341234，浙江省西湖区紫霞街88号，310000</Col>
                <Col>实名信息：南瓜粉，3303*******524</Col>
            </Row>
            <h3 class="section-title">分销商品</h3>
            <div class="order-info">
                <p class="order-status">订单状态：<span class="red">已发货</span></p>
                <p class="order-number">
                    <span>订单编号：20171016562312</span>
                    <span>发货时间：2017-09-08 12:30:25</span>
                </p>
                <Table :data="tableData" :columns="tableColumns" class="primary-table" :row-class-name="rowClassName"></Table>
                <router-link :to="{ name: '' }" class="link-a"><i class="iconfont icon-mingxi"></i>查看自营商品</router-link>
                <Row type="flex" align="middle">
                    <Col span="4" class="gray">下单时间：2017-02-05 10:17:30</Col>
                    <Col class="gray">支付时间：2017-02-05 10:17:30</Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span="4" class="gray">支付平台：支付宝</Col>
                    <Col class="gray">账单编号：2017021822548</Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DistributionIncomeDetail',
    data () {
        return {
            tableData:this.getTableData(),
            tableColumns:[
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
                            h('div', {
                                'class':{  
                                    'goods-name':true
                                }
                            },[
                                h('p', params.row.name),
                                h('p', {
                                    'class':{  
                                        'gray':true
                                    },
                                }, params.row.spec)
                            ]),
                            
                        ]);
                    }
                },
                {
                    title: '规格单价',
                    key: 'price'
                },
                {
                    title: '规格数量',
                    key: 'amount',
                },
                {
                    title: '退款状态',
                    key: 'refundStatus',
                    render: (h, params) => {
                        var html= "" ;
                        if(params.row.refundStatus == 0){
                            html = "<span class='red'>退款中</span>"
                        }
                        else{
                            html = "退款成功"
                        }
                        return h('a', {
                            domProps:{
                                innerHTML:html
                            }
                        });
                    }
                },
                {
                    title: '多件随机优惠',
                    key: 'discounts'
                },
                {
                    title: '总金额/件数',
                    key: 'totalPrice',
                    render: (h, params) => {
                        return h('div', [
                            h('p', {
                                'class':{
                                    'red':true
                                },
                                domProps: {
                                    innerHTML: params.row.totalPrice
                                }
                            }),
                            h('p', {
                                'class':{
                                    'gray':true
                                },
                                domProps: {
                                    innerHTML: '件数：' + params.row.amount + '件'
                                }
                            })
                        ])
                    }
                },
                {
                    title: '成本价',
                    key: 'costPrice'
                },
                {
                    title: '总利润',
                    key: 'totalProfits'
                }
            ],
        };
    },
    methods: {
        rowClassName (){
            return 'table-info-row';
        },
        getTableData() {
            let data = [{
                id: 1,
                goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mochaMAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mochaMAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mochaMAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mochaMAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mochaMAC/MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mochaMAC/MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mochaMAC/' + Math.floor(Math.random () * 3 + 1),
                spec:'2017年7月-2018年8月；2灌装',
                price: '￥'+ Math.floor(Math.random () * 200 + 1),
                amount: Math.floor(Math.random () * 30 + 1),
                discounts: '￥9.00',
                totalPrice: '￥187.00',
                costPrice: '￥5.00',
                totalProfits: '￥'+ Math.floor(Math.random () * 5662 ),
                refundStatus:0,
                specQuantity:6
            }];

            return data;
        },
    },
    mounted () {
    }
};
</script>
