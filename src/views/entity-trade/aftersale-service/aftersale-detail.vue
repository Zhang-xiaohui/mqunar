<style lang="less">
    @import "./aftersale-detail.less";
</style>
<template>
    <div class="wrap wrap-aftersale-detail">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col class-name="clear-right">
                    <h1 class="head-title">退款详情</h1>
                    <router-link :to="{ name: 'EntityAftersaleList'}" class="head-link">返回售后列表</router-link>
                </Col>
                <Col pull="1"><Button type="primary">审核退款</Button></Col>
            </Row>
        </div>
        <div class="wrap-main">
            <div class="section-title">退款信息</div>
            <div class="section-content">
                <Row type="flex" align="middle" class-name="refund-info-row">
                    <Col span="5">退款编号：<span class="red">25154787751</span></Col>
                    <Col>申请时间：2017-05-08 08:26:12</Col>
                </Row>
                <Row type="flex" align="middle" class-name="refund-info-row">
                    <Col span="5">会员名称：劳力</Col>
                    <Col>联系电话：15847899874</Col>
                </Row>
                <Row type="flex" align="middle" class-name="refund-info-row">
                    <Col span="5">退款金额：<span class="red">￥400.00</span></Col>
                    <Col>退款类型：<span class="red">仅退款</span></Col>
                </Row>
                <Row type="flex" align="middle" class-name="refund-info-row">
                    <Col span="5">退款原因：没有收到商品</Col>
                    <Col>退款说明：这里是退款说明</Col>
                </Row>
                <Row type="flex" align="middle" class-name="refund-info-row">
                    <Col>图片：</Col>
                    <Col>
                        <ul class="refund-cover-list">
                            <li style="background-image: url('https://img.alicdn.com/bao/uploaded/i4/3170729146/TB1PmEFidfJ8KJjy0FeXXXKEXXa_!!0-item_pic.jpg_430x430q90.jpg')"></li>
                            <li style="background-image: url('https://img.alicdn.com/bao/uploaded/i4/3170729146/TB1PmEFidfJ8KJjy0FeXXXKEXXa_!!0-item_pic.jpg_430x430q90.jpg')"></li>
                            <li style="background-image: url('https://img.alicdn.com/bao/uploaded/i4/3170729146/TB1PmEFidfJ8KJjy0FeXXXKEXXa_!!0-item_pic.jpg_430x430q90.jpg')"></li>
                        </ul>
                    </Col>
                </Row>
            </div>
            <div class="section-title">订单信息</div>
            <div class="section-content">
                <Row type="flex" align="middle" >
                    <Col>订单编号：20170155628964</Col>
                    <Col offset="1">当前订单状态：待确认收货</Col>
                    <Col offset="1">退款时间：2017-10-18 12:12:12</Col>
                    <Col offset="1"><router-link :to="{name:''}">查看物流</router-link></Col>
                </Row>
                <Table :data="tableData" :columns="tableColumns" class="primary-table" :row-class-name="rowClassName"></Table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AftersaleDetail',
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
                    title: '退款总金额',
                    key: 'totalMoney'
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
                totalMoney: '￥187.00',
                refundStatus:0,
            }];

            return data;
        }
    },
    mounted () {
    }
};
</script>
