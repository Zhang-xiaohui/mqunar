<style lang="less">
    @import "./service-goodslist.less";
</style>
<template>
    <div class="wrap-service-goodslist">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="3">
                    <h1 class="head-title">商品列表</h1>
                </Col>
                <Col span="19">
                    <Input v-model="searchWords" placeholder="请输入商品名称..." class="search-input"/>
                    <span>价格范围：</span>
                    <Input v-model="priceMin" class="search-price"></Input>
                    <Icon type="ios-minus-empty"></Icon>
                    <Input v-model="priceMax" class="search-price price-space"></Input>

                    <span>上架时间：</span>
                    <DatePicker type="date" placeholder="选择日期"></DatePicker>
                    <Icon type="ios-minus-empty"></Icon>
                    <DatePicker type="date" placeholder="选择日期"></DatePicker>
                    <Button type="primary">搜索</Button>
                </Col>
                <Col span="2" >
                    <Button type="primary" @click="redirectToEdit('add')">新增商品</Button>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <div class="list-tab">
                <Button :class="{'btn-active': listTabStyle == 'all'}" type="text" @click="handleListStatus('all')">全部商品</Button>
                <Button :class="{'btn-active': listTabStyle == 'sale'}" type="text" @click="handleListStatus('sale')">上架商品</Button>
                <Button :class="{'btn-active': listTabStyle == 'sold'}" type="text" @click="handleListStatus('sold')">未上架商品</Button>
                <Button :class="{'btn-active': listTabStyle == 'noEnough'}" type="text" @click="handleListStatus('noEnough')">库存告急</Button>
            </div>
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table"></Table>
            <div class="page-section">
                <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ServiceGoodslist',
    data () {
        return {
            searchWords: '',
            priceMin:'',  //搜索  最小价格
            priceMax:'', //搜索  最大价格
            listTabStyle:'all',
            tableData:this.getTableData(),
            tableColumns:[
                {
                    width: '65',
                    title: '排序',
                    key: 'sort',
                    className:'sort-border-r',
                    align:'center'
                },
                {
                    width: '34%',
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
                },
                {
                    width: '8%',
                    title: '库存',
                    key: 'stock',
                },
                {
                    width: '13%',
                    title: '效期',
                    key: 'expiryDate',
                },
                {
                    width: '8%',
                    title: '上架状态',
                    key: 'statusText',
                },
                {
                    width: '8%',
                    title: '销售',
                    key: 'sellNum',
                },
                {
                    title: '操作',
                    key: 'operate',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                domProps:{
                                    innerText: params.row.recommendStatus == 0 ? '推荐':'取消推荐',
                                },
                                style: {
                                        marginRight: '15px'
                                    },
                                on: {
                                    click: (event) => {
                                        console.log(event);
                                        this.recommendGoods(params.row,event);
                                    }
                                }
                            }),
                            h('a', {
                                style: {
                                        marginRight: '15px'
                                    },
                                on: {
                                    click: (event) => {
                                        this.redirectToEdit('edit',params.row.id)
                                    }
                                }
                            }, '编辑'),
                            h('a', {
                                domProps:{
                                    innerText: params.row.saleStatus == 0 ? '上架':'下架',
                                },
                                style: {
                                        marginRight: '15px'
                                    },
                                on: {
                                    click: (event) => {
                                        this.handleSaleStatus(params.row,event)
                                    }
                                }
                            }),
                            h('a', {
                                on: {
                                    click: () => {
                                        this.comfirmDel(params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                },
            ],
        };
    },
    methods: {
        handleSearch () {
            
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
                if(i %2 == 0){
                    data.push({
                        id: i,
                        sort: i + 1,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: '￥'+ Math.floor(Math.random () * 200 + 1),
                        stock: Math.floor(Math.random () * 30 + 1),
                        expiryDate: '2017-08-09~2017-8-19' ,
                        saleStatus: 1,
                        sellNum: Math.floor(Math.random () * 5662 + i),
                        statusText:'上架中',
                        recommendStatus:1,
                    })
                }
                else{
                    data.push({
                        id: i,
                        sort: i + 1,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: '￥'+ Math.floor(Math.random () * 200 + 1),
                        stock: Math.floor(Math.random () * 30 + 1),
                        expiryDate: '2017-08-09~2017-8-19' ,
                        saleStatus: 0,
                        sellNum: Math.floor(Math.random () * 5662 + i),
                        statusText:'未上架',
                        recommendStatus:0,
                    })
                }
                
            }
            return data;
        },
        changePage() {
            
        },
        handleListStatus(status){
            this.listTabStyle = status;
        },
        recommendGoods(json,event) {
            if(json.recommendStatus == 0){
                event.target.innerText = '取消推荐';
                this.$Message.success('商品已成功推荐至首页！');
            }
            else{
                event.target.innerText = '推荐';
                this.$Message.success('商品已取消推荐！');
            }
        },
        redirectToEdit(title,id){
            if(title == 'add'){
                this.$router.push({
                    name: 'AddServiceGoods',
                    query: { t: title }
                });
            }
            else{
                this.$router.push({
                    name: 'AddServiceGoods',
                    query: { t: title, id:id }
                });
            }
        },
        // 改变商品上下架状态
        handleSaleStatus(json,event){
            if(json.saleStatus == 0){
                event.target.innerText = '下架';
                this.$Message.success('商品已上架！');
            }
            else{
                event.target.innerText = '上架';
                this.$Message.success('商品已下架！');
            }
        },
        comfirmDel(){
            this.$Modal.confirm({
                title: '温馨提示',
                content: '<p style="font-size:14px;">您确定要删除该商品吗?</p>',
                onOk: () => {
                    this.$Message.success('删除成功！');
                }
            });
        },
    },
    mounted () {
    }
};
</script>
