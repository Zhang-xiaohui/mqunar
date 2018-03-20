<style lang="less" scoped>
    @import "./order-list.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="6">
                    <h1 class="head-title">订单列表</h1>
                </Col>
                <Col span="10">
                    <Input v-model="searchWords" icon="search" @on-change="handleSearch" placeholder="请输入要订单相关信息." class="search-input"/>
                    <Button type="primary">搜索</Button>
                    <a class="search-advanced" @click="handleShowSearchBox">高级搜索</a>
                </Col>
                <Col span="2" offset="6">
                    <Button type="primary">批量导出</Button>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <div class="select-box" v-show="showSearchBox">
                <Row type="flex" align="middle" class-name="select-row">
                    <Col span="8">
                        <label class="search-title">订单编号：</label>
                        <Input v-model="searchWords" placeholder="请输入订单编号"/>
                    </Col>
                    <Col span="8">
                        <label class="search-title">商品名称：</label>
                        <Input v-model="searchWords" placeholder="请输入商品名称"/>
                    </Col>
                    <Col span="8">
                        <label class="search-title">买家姓名：</label>
                        <Input v-model="searchWords" placeholder="请输入买家姓名"/>
                    </Col>
                </Row>
                <Row type="flex" align="middle" class-name="select-row">
                    <Col span="8">
                        <label class="search-title">手机号码：</label>
                        <Input v-model="searchWords" placeholder="请输入手机号码"/>
                    </Col>
                    <Col span="8">
                        <label class="search-title">物流单号：</label>
                        <Input v-model="searchWords" placeholder="请输入手机号码"/>
                    </Col>
                    <Col span="8">
                        <label class="search-title">下单时间：</label>
                        <DatePicker type="date" placeholder="选择日期" class="datepicker"></DatePicker>
                        <Icon type="ios-minus-empty"></Icon>
                        <DatePicker type="date" placeholder="选择日期" class="datepicker"></DatePicker>
                    </Col>
                </Row>
                <Row type="flex" align="middle" >
                    <Col span="8" class-name="clear-right">
                        <label class="search-title">配送方式：</label>
                        <Input v-model="searchWords" placeholder="请输入手机号码"/>
                    </Col>
                    <Col pull="4">
                        <Button type="primary">搜索</Button>
                        <Button class="search-btn">清空条件</Button>
                        <Button class="search-btn">关闭</Button>
                    </Col>
                </Row>
            </div>
            <div class="list-tab">
                <Button class="btn-active" type="text">全部订单</Button>
                <Button type="text">待付款</Button>
                <Button type="text">待发货</Button>
                <Button type="text">已发货</Button>
                <Button type="text">已完成</Button>
            </div>
            <table class="table" cellspacing="0" cellpadding="0" border="0">
                <thead>
                    <tr>
                        <th width="24%">商品</th>
                        <th width="8%">规格单价</th>
                        <th width="8%">规格数量</th>
                        <th width="8%">退款状态</th>
                        <th width="8%">总金额/件数</th>
                        <th width="10%">买家</th>
                        <th width="10%">订单状态</th>
                        <th width="12%">备注</th>
                        <th width="10%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in tableData">
                    <tr>
                        <td colspan="9">
                            <span>下单时间：{{item.orderTime}}</span> 
                            <span class="hd-space">订单编号：{{item.orderNum}}</span>
                        </td>
                    </tr>
                    
                    <tr class="tr-border even">
                        <td class="no-border">
                            <div class="goods-base">
                                <div class="goods-cover" :style="{backgroundImage: 'url(' + item.orderItem[0].goodsCover + ')'}"></div>
                                <div class="goods-info">
                                    <p class="goods-name">{{item.orderItem[0].goodsName}}</p>
                                    <p class="goods-spec">{{item.orderItem[0].goodsSpec}}</p>
                                </div>
                            </div>
                        </td>
                        <td>￥{{item.orderItem[0].price}}</td>
                        <td>{{item.orderItem[0].amount}}</td>
                        <td>
                            <template v-if="item.orderItem[0].orderStatus == 0">
                                <span class="red">退款中</span>
                            </template>
                            <template v-else-if="item.orderItem[0].orderStatus == 1">
                                <span>退款成功</span>
                            </template>
                        </td>
                        <td :rowspan="item.orderItem.length > 1 ? item.orderItem.length : false"><span class="red">￥{{item.totalPrice}}</span></td>
                        <td :rowspan="item.orderItem.length > 1 ? item.orderItem.length : false">
                            <p class="space">{{item.buyer}}</p>
                            <p class="space">{{item.buyerMobile}}</p>
                            <p class="space">{{item.address}}</p>
                        </td>
                        <td :rowspan="item.orderItem.length > 1 ? item.orderItem.length : false">
                            <p class="space" v-if="item.status == 0">待付款</p>
                            <p class="space" v-else-if="item.status == 1">待发货</p>
                            <p class="space" v-else-if="item.status == 2">已发货</p>
                            <p class="space" v-else-if="item.status == 3">已完成</p>
                            <router-link :to="{ name: 'EcouponCheckDetail', params: { id: item.id }}" class="space">订单详情</router-link>
                        </td>
                        <td :rowspan="item.orderItem.length > 1 ? item.orderItem.length : false">{{item.demo}}</td>
                        <td :rowspan="item.orderItem.length > 1 ? item.orderItem.length : false">
                            <template v-if="item.status == 0">
                                <a @click="handleCheckRefund(item.id)">关闭订单</a>
                            </template>
                            <template v-if="item.status == 1">
                                <a @click="handleCheckRefund(item.id)">添加发货信息</a>
                            </template>
                            <template v-if="item.status == 2 || item.status == 3">
                                <a @click="handleCheckRefund(item.id)">查看物流</a>
                            </template>
                        </td>
                    </tr>
                    <!-- 当有多个商品 -->
                    <template v-if="item.orderItem.length > 1">
                        <tr class="tr-border even" v-for="(subItem, subIndex) in item.orderItem" v-if="subIndex > 0">
                            <td class="no-border">
                                <div class="goods-base">
                                    <div class="goods-cover" :style="{backgroundImage: 'url(' + subItem.goodsCover + ')'}"></div>
                                    <div class="goods-info">
                                        <p class="goods-name">{{subItem.goodsName}}</p>
                                        <p class="goods-spec">{{subItem.goodsSpec}}</p>
                                    </div>
                                </div>
                            </td>
                            <td>￥{{subItem.price}}</td>
                            <td>{{subItem.amount}}</td>
                            <td>
                                <template v-if="subItem.orderStatus == 0">
                                    <span class="red">退款中</span>
                                </template>
                                <template v-else-if="subItem.orderStatus == 1">
                                    <span>退款成功</span>
                                </template>
                            </td>
                        </tr>
                    </template>
                    
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
    name: 'AftersaleList',
    data () {
        const validatePrice = (rule, value, callback) => {
            var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            if (!value) {
                callback(new Error('请输入秒杀价格'));
            }
            else if(!reg.test(value)) {
                callback(new Error('请输入正确的金额格式'));
            }
            else{
                callback();
            } 
        };
        return {
            searchWords: '',
            showSearchBox:false,
            total:55,
            tableData:[{
                id: 1,
                orderTime:'2017-10-16 12:23:34',
                orderNum:'20171016563214',
                ticketNum: 'HPH4558942',
                orderItem:[{
                    cid:1,
                    goodsName:'SUNSWEET 美国加州西梅汁1.89L*2瓶 果汁饮料 Costco直营SUNSWEET6月生产 美国原装进口日光牌西梅汁水果汁946ml*2 孕妇 饮品饮料6月生产 美国原装进口日光牌西梅汁水果汁946ml*2 孕妇 饮品饮料',
                    goodsSpec:'2017年7月-2018年8月；2灌装',
                    goodsCover:'https://img.alicdn.com/bao/uploaded/i2/3339682625/TB19v_8iIjI8KJjSsppXXXbyVXa_!!0-item_pic.jpg_430x430q90.jpg',
                    price:99,
                    amount:2,
                    orderStatus:0,
                }],
                totalPrice:187,
                buyer:'张存存',
                buyerMobile:18526587894,
                status:0,
                demo:'早点发货',
                address:'浙江省杭州市西湖区留下街道'
            },{
                id: 2,
                orderTime:'2017-11-16 10:33:14',
                orderNum:'20171016558914',
                ticketNum: 'HPH45587842',
                orderItem:[{
                    cid:21,
                    goodsName:'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha',
                    goodsSpec:'mocha',
                    goodsCover:'https://img.alicdn.com/bao/uploaded/i4/3170729146/TB1PmEFidfJ8KJjy0FeXXXKEXXa_!!0-item_pic.jpg_430x430q90.jpg',
                    price:170,
                    amount:3,
                    orderStatus:1,
                },{
                    cid:22,
                    goodsName:'SUNSWEET 美国加州西梅汁1.89L*2瓶 果汁饮料 Costco直营SUNSWEET6月生产 美国原装进口日光牌西梅汁水果汁946ml*2 孕妇 饮品饮料6月生产 美国原装进口日光牌西梅汁水果汁946ml*2 孕妇 饮品饮料',
                    goodsSpec:'2017年7月-2018年8月；2灌装',
                    goodsCover:'https://img.alicdn.com/bao/uploaded/i2/3339682625/TB19v_8iIjI8KJjSsppXXXbyVXa_!!0-item_pic.jpg_430x430q90.jpg',
                    price:99,
                    amount:2,
                    orderStatus:0,
                }],
                
                totalPrice:510,
                buyer:'赵小姐',
                buyerMobile:132456789876,
                status:1,
                demo:'发韵达快递',
                address:'浙江省杭州市西湖区五常街道'
            },{
                id: 3,
                orderTime:'2017-10-16 12:23:34',
                orderNum:'20171016563214',
                ticketNum: 'HPH4558942',
                orderItem:[{
                    cid:31,
                    goodsName:'ins北欧茶几桌布简约现代长方形客厅餐桌布布艺茶几垫台布盖巾',
                    goodsSpec:'60*180cm;粉色',
                    goodsCover:'https://gd1.alicdn.com/imgextra/i1/1092321207/TB2gR0hgnwKL1JjSZFgXXb6aVXa_!!1092321207.jpg_400x400.jpg_.webp',
                    price:89.5,
                    amount:1,
                    orderStatus:1,
                }],
                totalPrice:89.5,
                buyer:'李小姐',
                buyerMobile:132456789876,
                status:2,
                demo:'',
                address:'浙江省杭州市西湖区蒋村街道'
            },{
                id: 4,
                orderTime:'2017-10-16 12:23:34',
                orderNum:'20171016563214',
                ticketNum: 'HPH4558942',
                orderItem:[{
                    goodsName:'ins北欧茶几桌布简约现代长方形客厅餐桌布布艺茶几垫台布盖巾',
                    goodsSpec:'60*180cm;粉色',
                    goodsCover:'https://gd1.alicdn.com/imgextra/i1/1092321207/TB2wrJPdHwTMeJjSszfXXXbtFXa_!!1092321207.jpg_400x400.jpg_.webp',
                    price:89.5,
                    amount:1,
                    orderStatus:0
                }],
                totalPrice:89.5,
                buyer:'早点发货',
                buyerMobile:18974567456,
                status:0,
                demo:'',
                address:'浙江省杭州市西湖区留下街道'
            }]
        };
    },
    methods: {
        handleSearch () {
            alert(this.editorContent)
        },
        handleShowSearchBox(){
            this.showSearchBox = !this.showSearchBox;
        },
        rowClassName (row,index) {
            if(index%2 == 0){
                return 'even';
            }
            else{
                return 'odd';
            }
        },
        changePage() {
            
        }
    },
    mounted () {
    }
};
</script>
