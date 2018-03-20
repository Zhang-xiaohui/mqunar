<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="3">
                    <h1 class="head-title">收益明细</h1>
                </Col>
                <Col span="16" offset="3">
                    <Input v-model="searchWords" placeholder="请输入订单编号/姓名..." class="search-input"/>
                    <span>下单时间：</span>
                    <DatePicker type="date" placeholder="选择日期"></DatePicker>
                    <Icon type="ios-minus-empty"></Icon>
                    <DatePicker type="date" placeholder="选择日期"></DatePicker>
                    <Button type="primary">搜索</Button>
                </Col>
                <Col span="2">
                    <Button type="primary">批量导出</Button>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <Row class="total-data" type="flex" align="middle">
                <span class="font-l">分销收入：</span><span class="red">￥{{income}}</span>元
                <span class="text-space">订单数：</span><span class="blue">{{orderNum}}</span>
                <span class="text-space">累计：</span><span>{{total}}</span>
            </Row>
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table"></Table>
            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'

export default {
    name: 'ReturnsDetail',
    data () {
        return {
            searchWords: '',
            income:100000.00,
            orderNum:20,
            total:55,
            tableData:this.getTableData(),
            tableColumns:[
                {
                    title: '下单时间',
                    key: 'orderTime',
                },
                {
                    title: '订单编号',
                    key: 'orderId',
                },
                {
                    title: '商品金额',
                    key: 'goodsAmount',
                },
                {
                    title: '买家',
                    key: 'buyer',
                },
                {
                    title: '一级介绍人',
                    key: 'firstReferrer',
                },
                {
                    title: '一级金豆',
                    key: 'firstBean',
                },
                {
                    title: '二级介绍人',
                    key: 'secondReferrer',
                },
                {
                    title: '二级金豆',
                    key: 'secondBean',
                },
            ],
        };
    },
    methods: {
        handleSearch () {
            alert(this.editorContent)
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
                    orderTime: '2017-08-18 14:20:58',
                    orderId: '255158945'+ Math.floor(Math.random () * 3 + 1),
                    goodsAmount: Math.floor(Math.random () * 200 + 1),
                    buyer: 'buyer'+ Math.floor(Math.random () * 10 + 1),
                    firstReferrer: '一级介绍人'+ Math.floor(Math.random () * 10 + i),
                    firstBean: Math.floor(Math.random () * 6 + i),
                    secondReferrer: '二级介绍人'+ Math.floor(Math.random () * 10 + i),
                    secondBean: Math.floor(Math.random () * 8 + i),
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
