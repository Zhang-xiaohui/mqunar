<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">提现记录</h1>
                </Col>
                <Col span="16">
                    <span>下单时间：</span>
                    <DatePicker type="date" placeholder="选择日期"></DatePicker>
                    <Icon type="ios-minus-empty"></Icon>
                    <DatePicker type="date" placeholder="选择日期" class="space"></DatePicker>
                    <Button type="primary">查询</Button>
                </Col>
            </Row>
        </div>
        <div class="wrap">
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table"></Table>
            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'FundWithDraw',
    data () {
        return {
            tableData: this.getTableData(),
            tableColumns: [
                {
                    title: '提现金额',
                    key: 'money',
                },
                {
                    title: '提现账户',
                    key: 'account',
                },
                {
                    title: '状态',
                    key: 'status',
                    render: (h, params) => {
                        var text = "";
                        if (params.row.status == 0) {
                            text = '已打款';
                        }
                        else if (params.row.status == 1){
                            text = '申请中';
                        }
                        else{
                            text = '审核未通过';
                        }
                        return h('span', {
                            domProps:{
                                innerHTML: text
                            },
                            on: {
                                click: (event) => {
                                    this.handleJoin(params.row.id)
                                }
                            }
                        });
                    }
                },
                {
                    title: '提现时间',
                    key: 'drawTime',
                },
                {
                    title: '打款时间',
                    key: 'payTime', 
                }
            ]
        };
    },
    methods:{
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
            for (let i = 0; i < 10; i++) {
                if(i % 3 == 0){
                    data.push({
                        money: '￥' + Math.floor(Math.random () * 1450 + i),
                        account: '465897455147835745'+Math.floor(Math.random () * 3 + 1),
                        drawTime: this.formatDate(new Date()),
                        payTime: this.formatDate(new Date()),
                        status: 0
                    })
                }
                else if(i % 3 == 1){
                    data.push({
                        money: '￥' + Math.floor(Math.random () * 1450 + i),
                        account: '465897455147835745'+Math.floor(Math.random () * 3 + 1),
                        drawTime: this.formatDate(new Date()),
                        payTime: this.formatDate(new Date()),
                        status: 1
                    })
                }
                else{
                    data.push({
                        money: '￥' + Math.floor(Math.random () * 1450 + i),
                        account: '465897455147835745'+Math.floor(Math.random () * 3 + 1),
                        drawTime: this.formatDate(new Date()),
                        payTime: this.formatDate(new Date()),
                        status: 2
                    })
                }
                
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
