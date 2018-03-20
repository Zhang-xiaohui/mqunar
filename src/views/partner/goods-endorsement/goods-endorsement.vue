<style lang="less">
    @import "./index.less";
</style>
<template>
    <div class="wrap-goods-endorsement">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">代言商品列表</h1>
                </Col>
                <Col span="16">
                    <Input v-model="searchWords" icon="search" @on-change="handleSearch" placeholder="请输入商品名称..." class="searchInput"/>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <!-- <table class="table-custom" cellspacing="0" cellpadding="0" border="0">
                <thead>
                    <tr>
                        <th><div class="table-cell">商品</div></th>
                        <th><div class="table-cell">售价</div></th>
                        <th><div class="table-cell">库存</div></th>
                        <th><div class="table-cell">一级会员可得金豆</div></th>
                        <th><div class="table-cell">二级会员可得金豆</div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="table-cell">
                                <img src="https://wx2.sinaimg.cn/mw690/705e523bgy1fmiub1x7o1j229t1leu0x.jpg" class="goods-cover"/><span></span>
                            </div>
                        </td>
                        <td><div class="table-cell">￥50</div></td>
                        <td><div class="table-cell">3646</div></td>
                        <td><div class="table-cell">50</div></td>
                        <td><div class="table-cell">50</div></td>
                    </tr>
                </tbody>
            </table> -->
            <div class="test"></div>
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table"></Table>
            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
import Cookies from 'js-cookie'
import util from '@/libs/util.js'
import ajaxApi from '@/libs/ajax_api.js'

export default {
    name: 'GoodsEndorsement',
    data () {
        return {
            searchWords: '',
            tableData:this.getTableData(),
            tableColumns: [
                {
                    title: '商品',
                    key: 'name',
                    width:'50%',
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
                    title: '售价',
                    key: 'salePrice',
                    width: '100px'
                },
                {
                    title: '库存',
                    key: 'stock',
                    width: '100px'
                },
                {
                    title: '一级会员可得金豆',
                    key: 'firstBean',
                },
                {
                    title: '二级会员可得金豆',
                    key: 'secondBean',
                },
            ]
        };
    },
    methods: {
        handleSearch (){
            
        },
        rowClassName (row,index) {
            if(index%2 == 0){
                return 'even';
            }
            else{
                return 'odd';
            }
        },
        getTableData (){
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    id:i+1,
                    goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                    name: '海外原装进口保真德国爱他美奶粉3段2段1段pre段海外原装进口保真德国爱他美奶粉3段2段1段pre段' + Math.floor(Math.random () * 71 + 1),
                    salePrice: Math.floor(Math.random () * 395 + 1),
                    stock: Math.floor(Math.random () * 315 + 1),
                    firstBean: Math.floor(Math.random () * 25 + 1),
                    secondBean: Math.floor(Math.random () * 17 + 1)
                })
            }
            return data;
        },
        changePage() {
            this.tableData = this.getTableData();
        },
        // getGoodsEndorsement(){
        //     let vm = this;
        //     ajaxApi.getGoodsEndorsement()
        //     .then(function(response){
        //         console.log(response)
        //         vm.tableData = response.data.items;
        //         vm.page = response.data.page;
        //     })
        //     .catch(function (error) {
        //             console.log(error);
        //     });
        // }
        
    },
    // mounted () {
    //     this.getGoodsEndorsement()
    // }
};
</script>
