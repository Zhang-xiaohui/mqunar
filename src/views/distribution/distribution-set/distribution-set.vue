<style lang="less">
    @import "./index.less";
</style>
<template>
    <div class="wrap-distribution-set">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="3">
                    <h1 class="head-title">
                        分销商品列表
                        <router-link :to="{ name: 'QuestionList'}">
                            <Tooltip content="如何加入分销，获得更多收益？" placement="bottom">
                                <i class="iconfont icon-wenti"></i>
                            </Tooltip>
                        </router-link>
                    </h1>
                </Col>
                <Col span="21">
                    <Input v-model="searchWords" placeholder="请输入商品名称..." class="search-input"/>
                    
                    <span>价格范围：</span>
                    <Input v-model="priceMin" class="search-price"></Input>
                    <Icon type="ios-minus-empty"></Icon>
                    <Input v-model="priceMax" class="search-price price-space"></Input>

                    <span>利润范围：</span>
                    <Input v-model="priceMin" class="search-price"></Input>
                    <Icon type="ios-minus-empty"></Icon>
                    <Input v-model="priceMax" class="search-price price-space"></Input>
                    <Button type="primary">搜索</Button>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <div class="list-tab">
                <Button :class="{'btn-active': listTabStyle == 'sale'}" type="text" @click="handleListStatus('sale')">出售中</Button>
                <Button :class="{'btn-active': listTabStyle == 'stay'}" type="text" @click="handleListStatus('stay')">待上架</Button>
                <Button :class="{'btn-active': listTabStyle == 'sold'}" type="text" @click="handleListStatus('sold')">已下架</Button>
                <Button class="btn-batch" v-if="showBatchSection">批量修改分类</Button>
                <Button class="btn-batch" v-if="showBatchSection && listTabStyle == 'sale'" @click="batchSoldOut">批量下架</Button>
                <Button class="btn-batch" v-if="showBatchSection && listTabStyle == 'sold'">批量上架</Button>
            </div>
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table" @on-selection-change="handleSelectChange"></Table>
            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DistributionSet',
    data () {
        return {
            searchWords: '',
            priceMin:'',  //搜索  最小价格
            priceMax:'', //搜索  最大价格
            listTabStyle: 'sale',
            showBatchSection:false,
            tableData:this.getTableData(),
            tableColumns:[
                {
                    type: 'selection',
                    width: 55,
                    align: 'center',
                    className:'table-border-r'
                },
                {
                    width: '36%',
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
                    width: '8%',
                    title: '售价',
                    key: 'price',
                    sortable:true
                },
                {
                    width: '8%',
                    title: '成本价',
                    key: 'costPrice',
                    sortable:true
                },
                {
                    width: '8%',
                    title: '利润',
                    key: 'profit',
                    sortable:true
                },
                {
                    width: '10%',
                    title: '上架状态',
                    key: 'saleStatus',
                    render: (h, params) => {
                        var text="";
                        if(params.row.saleStatus == 0 ){
                            text = '上架中'
                        }
                        else if(params.row.saleStatus == 1 ){
                            text = '待上架'
                        }
                        else{
                            text = '已下架'
                        }
                        return h('span',{
                            'class': {
                                end: params.row.saleStatus == 2
                            },
                            domProps: {
                                innerHTML: text
                            },

                        });
                    }
                },
                {
                    width: '8%',
                    title: '销量',
                    key: 'sellNum',
                    sortable: true
                },
                {
                    title: '操作',
                    key: 'operate',
                    render: (h, params) => {
                        var htmlArray = [h('a', {
                            domProps:{
                                innerHTML:'分销设置'
                            },
                            style: {
                                    marginRight: '15px'
                                },
                            on: {
                                click: (event) => {
                                    this.redirectToPage('edit',params.row.id)
                                }
                            }
                        }),h('a', {
                            domProps:{
                                innerHTML:'取消分销'
                            },
                            style: {
                                marginRight: '15px'
                            },
                            on: {
                                click: (event) => {
                                    this.handleCancelDistribute('edit',params.row.id)
                                }
                            }
                        })];
                        if(this.listTabStyle == 'sale') { //上架中
                            htmlArray.push([h('a', {
                                domProps:{
                                    innerHTML:'下架'
                                },
                                on: {
                                    click: (event) => {
                                        this.handleSoldOut('edit',params.row.id)
                                    }
                                }
                            })]);
                        }
                        else if(this.listTabStyle == 'sold'){ //已下架
                            htmlArray.push([h('a', {
                                domProps:{
                                    innerHTML:'上架'
                                },
                                on: {
                                    click: (event) => {
                                        this.handleSaleIn('edit',params.row.id)
                                    }
                                }
                            })]);
                        }
                        return htmlArray;
                        
                    }
                },
            ],
        };
    },
    methods: {
        handleListStatus(status){
            this.listTabStyle = status;
            this.tableData = this.getTableData();
        },
        handleSelectChange (selection){
            if(selection.length > 0){
                this.showBatchSection = true;
            }
            else{
                this.showBatchSection = false;
            }
        },
        handleSearch () {
            
        },
        redirectToPage(){
            this.$router.push({
                name:'DistributionSetForm'
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
                        costPrice: Math.floor(Math.random () * 30 + 1),
                        profit: Math.floor(Math.random () * 30 + 5),
                        saleStatus: 0,
                        sellNum: Math.floor(Math.random () * 5662 + i)
                    })
                }
                else if(i % 3 == 1) {
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 201 + 1),
                        costPrice: Math.floor(Math.random () * 31 + 1),
                        profit: Math.floor(Math.random () * 35 + 9),
                        saleStatus: 1,
                        sellNum: Math.floor(Math.random () * 5663 + i)
                    })
                }
                else{
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 201 + 1),
                        costPrice: Math.floor(Math.random () * 31 + 1),
                        profit: Math.floor(Math.random () * 35 + 9),
                        saleStatus: 2,
                        sellNum: Math.floor(Math.random () * 5663 + i)
                    })
                }
                
            }
            return data;
        },
        changePage() {
            
        },
        handleSaleIn() {
            this.$Message.success('上架成功！');
        },
        handleSoldOut() {
            this.$Modal.confirm({
                title: '下架商品',
                width: "500px",
                content: '<p style="font-size:14px; margin-bottom:30px;">确定下架该商品吗？</p>',
                onOk: () => {
                    this.$Message.success('下架成功！');
                }
            });
        },
        handleCancelDistribute(){
            this.$Modal.confirm({
                title: '取消分销',
                width: "500px",
                content: '<p style="font-size:14px; margin-bottom:30px;">确定取消该商品的分销吗？</p>',
                onOk: () => {
                    this.$Message.success('取消成功！');
                }
            });
        },
        batchSoldOut(){
            this.$Modal.confirm({
                title: '批量下架',
                width: "500px",
                content: '<p style="font-size:14px; margin-bottom:30px;">确定下架选中的商品吗？</p>',
                onOk: () => {
                    this.$Message.success('下架成功！');
                }
            });
        }

    },
    mounted () {
    }
};
</script>
