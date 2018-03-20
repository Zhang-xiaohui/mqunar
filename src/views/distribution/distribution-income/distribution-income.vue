<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="3">
                    <h1 class="head-title">
                        分销收入
                        <router-link :to="{ name: 'QuestionList'}">
                            <Tooltip content="如何加入分销，获得更多收益？" placement="bottom">
                                <i class="iconfont icon-wenti"></i>
                            </Tooltip>
                        </router-link>
                    </h1>
                </Col>
                <Col span="21">
                    <Input v-model="searchWords" placeholder="请输入商品名称/订单编号" class="search-input"/>
                    <span>价格范围：</span>
                    <Input v-model="priceMin" class="search-price"></Input>
                    <Icon type="ios-minus-empty"></Icon>
                    <Input v-model="priceMax" class="search-price space"></Input>

                    <span>下单时间：</span>
                    <DatePicker type="date" placeholder="选择日期" class="search-date"></DatePicker>
                    <Icon type="ios-minus-empty"></Icon>
                    <DatePicker type="date" placeholder="选择日期" class="space search-date"></DatePicker>
                    <Button type="primary">搜索</Button>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <Row class="total-data" type="flex" align="middle">
                <span class="font-l">分销收入：</span><span class="red">￥{{income}}</span>元
                <span class="text-space">订单数：</span><span class="blue">{{orderNum}}</span>
                <span class="text-space">累计：</span><span>{{total}}</span>
            </Row>
            <div class="list-tab">
                <Button :class="{'btn-active': listTabStyle == 'all'}" type="text" @click="handleListStatus('all')">全部订单</Button>
                <Button :class="{'btn-active': listTabStyle == 'sale'}" type="text" @click="handleListStatus('sale')">待付款</Button>
                <Button :class="{'btn-active': listTabStyle == 'sold'}" type="text" @click="handleListStatus('sold')">待发货</Button>
                <Button :class="{'btn-active': listTabStyle == 'noEnough'}" type="text" @click="handleListStatus('noEnough')">已发货</Button>
                <Button :class="{'btn-active': listTabStyle == 'noEnough'}" type="text" @click="handleListStatus('noEnough')">已完成</Button>
            </div>
            <table class="table" cellspacing="0" cellpadding="0" border="0">
                <thead>
                    <tr>
                        <th width="32%">商品</th>
                        <th width="8%">规格单价</th>
                        <th width="8%">规格数量</th>
                        <th width="10%">退款状态</th>
                        <th width="12%">总金额/件数</th>
                        <th width="10%">成本价</th>
                        <th width="10%">总利润</th>
                        <th width="10%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="item in tableData">
                    <tr>
                        <td colspan="8">
                            <span>下单时间：{{item.orderTime}}</span> 
                            <span class="hd-space">订单编号：{{item.orderNum}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="goods-base">
                                <div class="goods-cover" :style="{backgroundImage: 'url(' + item.goodsCover + ')'}"></div>
                                <div class="goods-info">
                                    <p class="goods-name">{{item.goodsName}}</p>
                                    <p class="goods-spec">{{item.goodsSpec}}</p>
                                </div>
                            </div>
                        </td>
                        <td>￥{{item.price}}</td>
                        <td>{{item.amount}}</td>
                        <td>
                            <template v-if="item.refundStatus == 0"><span class="red">退款中</span></template>
                            <template v-if="item.refundStatus == 1 ">退款成功</template>
                        </td>
                        <td>
                            <p class="red">￥{{item.totalPrice}}</p>
                            <p>件数：4件</p>
                        </td>
                        <td>￥{{item.costPrice}}</td>
                        <td>￥{{item.totalProfits}}</td>
                        <td>
                            <p class="space" v-if="item.status == 0">待付款</p>
                            <p class="space" v-else-if="item.status == 1">待发货</p>
                            <p class="space" v-else-if="item.status == 2">已发货</p>
                            <p class="space" v-else="item.status == 4">已完成</p>
                            <router-link :to="{ name: 'DistributionIncomeDetail', params: { id: item.id }}" class="space">订单详情</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'GoodsLibrary',
    data () {
        return {
            searchWords: '',
            priceMin:'',  //搜索  最小价格
            priceMax:'', //搜索  最大价格
            income:'15710.32',
            orderNum:'15',
            total:'50',
            listTabStyle:'all',
            tableData:[{
                id: 1,
                orderTime:'2017-10-16 12:23:34',
                orderNum:'20171016563214',
                ticketNum: 'HPH4558942',
                goodsName:'SUNSWEET 美国加州西梅汁1.89L*2瓶 果汁饮料 Costco直营SUNSWEET6月生产 美国原装进口日光牌西梅汁水果汁946ml*2 孕妇 饮品饮料6月生产 美国原装进口日光牌西梅汁水果汁946ml*2 孕妇 饮品饮料',
                goodsSpec:'2017年7月-2018年8月；2灌装',
                goodsCover:'https://img.alicdn.com/bao/uploaded/i2/3339682625/TB19v_8iIjI8KJjSsppXXXbyVXa_!!0-item_pic.jpg_430x430q90.jpg',
                price:99,
                amount:2,
                totalPrice:187,
                costPrice:9.00,
                totalProfits:9.00,
                status:0,
                refundStatus:0
            },{
                id: 2,
                orderTime:'2017-11-16 10:33:14',
                orderNum:'20171016558914',
                ticketNum: 'HPH45587842',
                goodsName:'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha',
                goodsSpec:'mocha',
                goodsCover:'https://img.alicdn.com/bao/uploaded/i4/3170729146/TB1PmEFidfJ8KJjy0FeXXXKEXXa_!!0-item_pic.jpg_430x430q90.jpg',
                price:170,
                amount:3,
                totalPrice:510,
                costPrice:9.00,
                totalProfits:9.00,
                status:1,
                refundStatus:1

            },{
                id: 3,
                orderTime:'2017-10-16 12:23:34',
                orderNum:'20171016563214',
                ticketNum: 'HPH4558942',
                goodsName:'ins北欧茶几桌布简约现代长方形客厅餐桌布布艺茶几垫台布盖巾',
                goodsSpec:'60*180cm;粉色',
                goodsCover:'https://gd1.alicdn.com/imgextra/i1/1092321207/TB2gR0hgnwKL1JjSZFgXXb6aVXa_!!1092321207.jpg_400x400.jpg_.webp',
                price:89.5,
                amount:1,
                totalPrice:89.5,
                costPrice:9.00,
                totalProfits:9.00,
                status:2,
                refundStatus:0
            },{
                id: 4,
                orderTime:'2017-10-16 12:23:34',
                orderNum:'20171016563214',
                ticketNum: 'HPH4558942',
                goodsName:'ins北欧茶几桌布简约现代长方形客厅餐桌布布艺茶几垫台布盖巾',
                goodsSpec:'60*180cm;粉色',
                goodsCover:'https://gd1.alicdn.com/imgextra/i1/1092321207/TB2wrJPdHwTMeJjSszfXXXbtFXa_!!1092321207.jpg_400x400.jpg_.webp',
                price:89.5,
                amount:1,
                totalPrice:89.5,
                costPrice:9.00,
                totalProfits:9.00,
                status:3,
                refundStatus:1
            }]
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
