<style lang="less" scoped>
    @import "./aftersale-list.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="6">
                    <h1 class="head-title">售后列表</h1>
                </Col>
                <Col span="10">
                    <Input v-model="searchWords" icon="search" @on-change="handleSearch" placeholder="请输入要核销的券号..." class="search-input"/>
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
                <Row>
                    <Col span="8">
                        <label class="search-title">手机号码：</label>
                        <Input v-model="searchWords" placeholder="请输入手机号码"/>
                    </Col>
                    <Col span="8">
                        <label class="search-title">申请时间：</label>
                        <DatePicker type="date" placeholder="选择日期" class="datepicker"></DatePicker>
                        <Icon type="ios-minus-empty"></Icon>
                        <DatePicker type="date" placeholder="选择日期" class="datepicker"></DatePicker>
                    </Col>
                    <Col span="8">
                        <Button type="primary">搜索</Button>
                        <Button class="search-btn">清空条件</Button>
                        <Button class="search-btn">关闭</Button>
                    </Col>
                </Row>
            </div>
            <div class="list-tab">
                <Button class="btn-active" type="text">全部订单</Button>
                <Button type="text">待处理</Button>
                <Button type="text">退款成功</Button>
                <Button type="text">退款关闭</Button>
            </div>
            <table class="table" cellspacing="0" cellpadding="0" border="0">
                <thead>
                    <tr>
                        <th width="30%">商品</th>
                        <th width="8%">规格单价</th>
                        <th width="8%">规格数量</th>
                        <th width="8%">退款总金额</th>
                        <th width="10%">买家</th>
                        <th width="10%">订单状态</th>
                        <th width="14%">备注</th>
                        <th width="12%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="item in tableData">
                    <tr>
                        <td colspan="8">
                            <span>下单时间：{{item.orderTime}}</span> 
                            <span class="hd-space">订单编号：{{item.orderNum}}</span>
                            <span class="hd-space">物流单号：{{item.ticketNum}}</span>
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
                        <td><span class="red">￥{{item.totalPrice}}</span></td>
                        <td>
                            <p class="space">{{item.buyer}}</p>
                            <p class="space">{{item.buyerMobile}}</p>
                            <p class="space">{{item.address}}</p>
                        </td>
                        <td>
                            <p class="space" v-if="item.status == 0">待处理</p>
                            <p class="space" v-else-if="item.status == 1">退款成功</p>
                            <p class="space" v-else-if="item.status == 2">退款关闭</p>
                            <router-link :to="{ name: 'EcouponCheckDetail', params: { id: item.id }}" class="space">订单详情</router-link>
                            <router-link :to="{ name: 'EntityAftersaleDetail', params: { id: item.id }}" class="space">退款详情</router-link>
                        </td>
                        <td>{{item.demo}}</td>
                        <td>
                            <template v-if="item.status == 0">
                                <a @click="handleCheckRefund(item.id)">审核退款</a>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
            <div class="modal-section">
                <Modal v-model="modalCheckRefund" title="审核退款" class-name="vertical-center-modal" @on-ok="modalCheck" @on-cancel="modalCancel" :loading="modalLoading">
                    <Form ref="formItem" :model="formItem" :rules="ruleInline" label-position="right" :label-width="100">
                        <FormItem label="退款类型：">
                            <span>{{refundData.type}}</span>
                        </FormItem>
                        <FormItem label="退款原因：">
                            <span>{{refundData.reason}}</span>
                        </FormItem>
                        <FormItem label="退款金额：">
                            <span>￥{{refundData.refundMoney}}</span>
                        </FormItem>
                        <FormItem label="付款金额：">
                            <span>￥{{refundData.payMoney}}（包含邮费￥{{refundData.freight}}）</span>
                        </FormItem>
                        <FormItem label="修改退款金额：" prop="refundMoney">
                            <Input type="text" v-model.number="formItem.refundMoney" style="width: 300px">
                            </Input>
                        </FormItem>
                    </Form>
                    <p style="color:#ff7766; margin-top:20px;" >注：修改退款金额前请与买家联系达成一致哦！</p>
                </Modal>
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
            modalCheckRefund:false,
            modalLoading: true,
            refundData:{
                type:'仅退款',
                reason:'未收到货',
                refundMoney:'158.23',
                payMoney:'189.00',
                freight:'5.00'
            },
            formItem:{
                refundMoney:''
            },
            ruleInline:{
                refundMoney:[{ validator: validatePrice, trigger: 'blur' }]
            },
            total:55,
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
                goodsName:'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha',
                goodsSpec:'mocha',
                goodsCover:'https://img.alicdn.com/bao/uploaded/i4/3170729146/TB1PmEFidfJ8KJjy0FeXXXKEXXa_!!0-item_pic.jpg_430x430q90.jpg',
                price:170,
                amount:3,
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
                goodsName:'ins北欧茶几桌布简约现代长方形客厅餐桌布布艺茶几垫台布盖巾',
                goodsSpec:'60*180cm;粉色',
                goodsCover:'https://gd1.alicdn.com/imgextra/i1/1092321207/TB2gR0hgnwKL1JjSZFgXXb6aVXa_!!1092321207.jpg_400x400.jpg_.webp',
                price:89.5,
                amount:1,
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
                goodsName:'ins北欧茶几桌布简约现代长方形客厅餐桌布布艺茶几垫台布盖巾',
                goodsSpec:'60*180cm;粉色',
                goodsCover:'https://gd1.alicdn.com/imgextra/i1/1092321207/TB2wrJPdHwTMeJjSszfXXXbtFXa_!!1092321207.jpg_400x400.jpg_.webp',
                price:89.5,
                amount:1,
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
        changeLoading() {
            this.modalLoading = false;
            this.$nextTick(() => {
              this.modalLoading = true;
            });
        },
        modalCheck(){
            this.$refs['formItem'].validate((valid) => {
                if(!valid) {
                    return this.changeLoading();
                }
                setTimeout(() => {
                    this.changeLoading();
                    this.modalChangeCard = false;
                    this.$Message.success('保存成功！');
                }, 1000);
            })
        },
        modalCancel(){

        },
        handleCheckRefund(){
            this.modalCheckRefund = !this.modalCheckRefund;
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
            
        },
        delOrder (){
            this.$Modal.confirm({
                title: '温馨提示',
                content: '<p style="font-size:14px;">您确定要删除该订单吗?</p>',
                onOk: () => {
                    this.$Message.success('删除成功！');
                }
            });
        },
        checkUse (){
            this.$Modal.confirm({
                title: '验证使用',
                content: '<p style="font-size:14px;">您确定用户已到店并使用该券吗?</p>',
                onOk: () => {
                    this.$Message.success('验证成功！');
                }
            });
        }
    },
    mounted () {
    }
};
</script>
