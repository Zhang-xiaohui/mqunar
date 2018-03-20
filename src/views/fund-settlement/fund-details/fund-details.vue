<style src="./index.less" lang="less" scoped></style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">资金提现</h1>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <div class="bankCard-info">
                <p class="withdraw-ops">
                    <span class="text-size">可提现资金：</span><span class="red">￥<b class="num-size">{{data.tixianMoney}}</b></span>元
                    <a class="btn-op" @click="handleShowTixian">我要提现</a>
                    <router-link :to="{name:''}" class="btn-op">提现记录</router-link>
                </p>
                <div class="card-section">
                    <template v-if="haveCardInfo">
                        <div class="add-card" @click="handleShowChangeCard"><Icon type="ios-plus-empty" class="icon-add"></Icon>添加银行卡</div>
                    </template>
                    <template v-if="!haveCardInfo">
                        <div class="card-info">
                            <div class="title">提现现金</div>
                            <div class="content">
                                <Row type="flex" align="middle">
                                    <Col>银行卡号：45632588****5556</Col>
                                    <Col offset="1">开户行：中国银行望江支行</Col>
                                    <Col offset="1">户名：**宁</Col>
                                    <Col offset="1" class-name="btn-right">电话：189****5558</Col>
                                    <Col ><a>+更换银行卡</a></Col>
                                </Row>
                                
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="wrap-head">
                <Row type="flex" align="middle" class-name="head-row">
                    <Col span="8">
                        <h1 class="head-title">资金明细</h1>
                    </Col>
                </Row>
            </div>
            <div class="fund-data">
                <Row type="flex" align="middle">
                    <Col>
                        <i class="iconfont icon-tixian"></i>
                        <div class="data-text">
                            <p class="tit">可提现金额</p>
                            <p class="red">￥{{data.tixianMoney}}</p>
                        </div>
                    </Col>
                    <Col offset="1">
                        <i class="iconfont icon-dengdaishijian"></i>
                        <div class="data-text">
                            <p class="tit">交易中金额</p>
                            <p>￥{{data.tradingMoney}}</p>
                        </div>
                    </Col>
                    <Col offset="1">
                        <i class="iconfont icon-yiwancheng"></i>
                        <div class="data-text">
                            <p class="tit">累计交易</p>
                            <p>￥{{data.totalTrading}}</p>
                        </div>
                    </Col>
                    <Col offset="1">
                        <i class="iconfont icon-tixianjine"></i>
                        <div class="data-text">
                            <p class="tit">分销收入</p>
                            <p>￥{{data.distributionIncome}}</p>
                        </div>
                    </Col>
                    <Col offset="1">
                        <i class="iconfont icon-tixianzhong"></i>
                        <div class="data-text">
                            <p class="tit">提现中</p>
                            <p>￥{{data.progressMoney}}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="search-box">
                <Input v-model="searchWords" placeholder="请输入商品名称/订单编号" class="search-input"/>
                <span>下单时间：</span>
                <DatePicker type="date" placeholder="选择日期"></DatePicker>
                <Icon type="ios-minus-empty"></Icon>
                <DatePicker type="date" placeholder="选择日期" class="space"></DatePicker>
                <Button type="primary">搜索</Button>
            </div>
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table"></Table>
            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
        <Modal
            v-model="modalTiXian"
            title="我要提现"
            ok-text="申请提现"
            cancel-text="取消"
            class-name="vertical-center-modal"
            @on-ok="confirmTiXian">
            <p>提现金额：￥{{data.tixianMoney}}元</p>
            <p style="color:#ff776d; margin-top:30px;">注：申请提现后，将在2-3个工作日到账</p>
        </Modal>
        <Modal
            v-model="modalChangeCard"
            title="更换银行卡"
            ok-text="保存"
            class-name="vertical-center-modal"
            width="550"
            transfer
            @on-ok="handleSubmit"
            @on-cancel="cancelSubmit"
            :loading="modalLoading">
            <Form ref="formItem" :model="formItem" :rules="ruleInline" label-position="right" :label-width="90">
                <FormItem label="开户银行：" prop="openBank">
                    <Select v-model="formItem.openBank" placeholder="请选择银行卡所属银行">
                        <Option value="1">中国银行</Option>
                        <Option value="2">中国工商银行</Option>
                        <Option value="3">中国农业银行</Option>
                        <Option value="4">中国建设银行</Option>
                        <Option value="5">招商银行</Option>
                        <Option value="6">广发银行</Option>
                        <Option value="7">华夏银行</Option>
                    </Select>
                </FormItem>
                <FormItem label="支行信息：" prop="subbranchBank">
                    <Input type="text" v-model="formItem.subbranchBank" placeholder="准确的支行名称能确保提现即时到账"></Input>
                </FormItem>
                <FormItem label="持卡人：" prop="cardholder">
                    <Input type="text" v-model="formItem.cardholder" placeholder="开户姓名（如为公司账号，请输入公司名称）"></Input>
                </FormItem>
                <FormItem label="卡号：" prop="cardNum">
                    <Input type="text" v-model.number="formItem.cardNum" placeholder="银行卡号"></Input>
                </FormItem>
                <FormItem label="手机号码：">
                    <span>158****5255</span>
                </FormItem>
                <FormItem label="验证码：" prop="code">
                    <Input type="text" v-model.number="formItem.code" style="width: 300px"></Input>
                    <Button>获取验证码</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'FundDetails',
    data () {
        return {
            searchWords:'',
            haveCardInfo: true,
            modalTiXian: false,
            modalChangeCard: false,
            modalLoading:true,
            formItem:{
                openBank:'',
                subbranchBank:'',
                cardholder:'',
                cardNum:'',
                code:''
            },
            ruleInline:{
                openBank: [
                    { required: true, message: '请选择开户银行', trigger: 'change' }
                ],
                subbranchBank:[
                    { required: true, message: '请输入支行信息', trigger: 'blur' }
                ],
                cardholder:[
                    { required: true, message: '请输入持卡人信息', trigger: 'blur' }
                ],
                cardNum:[
                    { required: true, message: '请输入卡号',pattern: /.+/ ,trigger: 'blur'},
                    { type: 'integer', message: '必须为数字值'}  
                ],
                code:[
                    { required: true, message: '请输入持卡人信息', pattern: /.+/ , trigger: 'blur' },
                    { type: 'integer', message: '必须为数字值'}  
                ]
            },
            data:{
                tixianMoney: '1500.32',
                tradingMoney: '1000.15',
                totalTrading: '8001.56',
                distributionIncome: '2514.96',
                progressMoney: '1122.00'
            },
            tableData: this.getTableData(),
            tableColumns: [
                {
                    title: '下单时间',
                    key: 'orderTime',
                },
                {
                    title: '订单编号',
                    key: 'orderNum',
                },
                {
                    title: '订单金额',
                    key: 'orderMoney',
                },
                {
                    title: '退款金额',
                    key: 'refundAmount',
                },
                {
                    title: '交易完成时间',
                    key: 'finishTime', 
                }
            ]
        };
    },
    methods:{
        handleShowTixian() {
            this.modalTiXian = !this.modalTiXian;
        },
        confirmTiXian(){
            this.$Message.success("申请成功！")
        },
        handleShowChangeCard() {
            this.modalChangeCard = !this.modalChangeCard;
        },
        changeLoading() {
            this.modalLoading = false;
            this.$nextTick(() => {
              this.modalLoading = true;
            });
        },
        handleSubmit(){
            this.$refs['formItem'].validate((valid) => {
                console.log(valid)
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
        cancelSubmit(){
            this.$refs['formItem'].resetFields();
        },
        rowClassName (row,index) {
            if(index%2 == 0){
                return 'even';
            }
            else{
                return 'odd';
            }
        },
        handleSearch () {

        },
        getTableData () {
            let data = [];
            for (let i = 0; i < 5; i++) {
                data.push({
                    orderTime: this.formatDate(new Date()) + ' 15:30',
                    orderNum: '25581977816884'+Math.floor(Math.random () * 3 + 1),
                    orderMoney: Math.floor(Math.random () * 2180 + 1),
                    refundAmount: Math.floor(Math.random () * 3200 + 1),
                    finishTime: this.formatDate(new Date()) + ' 16:30'
                })
            }
            return data;
        },
        formatDate (date) {
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },
        changePage () {

        }
    }
};
</script>
