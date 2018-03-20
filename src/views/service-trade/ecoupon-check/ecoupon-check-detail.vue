<style lang="less" scoped>
    @import "./ecoupon-check-detail.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <h1 class="head-title">电子券详情</h1>
                <router-link :to="{ name: ''}">返回商品列表</router-link>
            </Row>
        </div>
        <div class="wrap-main">
            <Row class-name="order-info" type="flex" align="middle" >
                <Col>订单状态：已使用</Col>
                <Col offset="1">订单编号：20170155628964</Col>
                <Col offset="1">付款时间：2017-10-18 12:12:12</Col>
                <Col offset="1">使用时间：2017-11-8 11:11:11</Col>
            </Row>
            <div class="base-info">
                <div class="goods-cover" style="background-image: url('https://img.alicdn.com/bao/uploaded/i4/3170729146/TB1PmEFidfJ8KJjy0FeXXXKEXXa_!!0-item_pic.jpg_430x430q90.jpg')"></div>
                <div class="goods-info">
                    <div class="goods-name"><router-link :to="{ name: ''}">MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha</router-link></div>
                    <div class="goods-params">
                        <Row type="flex" align="middle" class-name="params-row">
                            <Col span="5">数量：1</Col>
                            <Col>单价：￥109.00</Col>
                        </Row>
                        <Row type="flex" align="middle" class-name="params-row">
                            <Col span="5">购买手机号：13554543433</Col>
                            <Col>订单总价：<span class="red">￥109.00</span></Col>
                        </Row>
                        <Row type="flex" align="middle" class-name="params-row">
                            <Col>支付方式：支付宝</Col>
                        </Row>
                        <Row type="flex" align="middle" class-name="params-row">
                            <Col>有效期：2017-02-12至2017-02-28</Col>
                        </Row>
                        <Row type="flex" align="middle" class-name="params-row">
                            <Col>券号：<span class="red">745145475</span></Col>
                        </Row>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EcouponCheckDetail',
    data () {
        return {
            
        };
    },
    methods: {
        
    },
    mounted () {
    }
};
</script>
