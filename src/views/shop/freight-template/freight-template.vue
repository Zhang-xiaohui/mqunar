<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">运费模板</h1>
                </Col>
                <Col span="8">
                    <Input v-model="searchWords" icon="search" @on-change="handleSearch" placeholder="请输入模板名称..." class="searchInput"/>
                </Col>
                <Col span="2" offset="6">
                    <Button type="primary" @click="redirectToAddPage('add')">新增模板</Button>
                </Col>
            </Row>
        </div>
        <div class="wrap-main-freight">
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table"></Table>
            <div class="page-section">
                <Page :total="page.totalCount" :current="page.currentPage" :page-size="page.perPage" @on-change="changePage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import util from '@/libs/util.js'
import ajaxApi from '@/libs/ajax_api.js'

export default {
    name: 'FreightTemplate',
    data () {
        return {
            searchWords:'',
            tableColumns: [
                {
                    title: '模板名称',
                    key: 'name',
                },
                {
                    title: '商品使用数',
                    key: 'goods_num',
                    width: 120
                },
                {
                    title: '模板描述',
                    key: 'description',
                },
                {
                    title: '创建时间',
                    key: 'created_at',
                    width: 200,
                    render: (h, params) => {
                        return h('span', {
                            domProps: {
                                innerHTML: util.momentDate(params.row.created_at)
                            }
                        });
                    }
                },
                {
                    title: '操作',
                    key: 'operate',
                    render: (h, params) => {
                        var updateStyle, delStyle;
                        if(params.row.valuation == 1){
                            updateStyle = {
                                marginRight: '15px',
                                color: '#999'
                            }
                        }
                        else{
                            updateStyle = {
                                marginRight: '15px',
                            }
                        }

                        if(params.row.goods_num > 0){
                            delStyle = {
                                color: '#999'
                            }
                        }
                        return h('div', [
                            h('a', {
                                style: updateStyle,
                                on: {
                                    click: () => {
                                        this.handleUpdate(params);
                                    }
                                }
                            }, '修改'),
                            h('a', {
                                style: delStyle,
                                on: {
                                    click: () => {
                                        this.comfirmDel(params);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tableData:[],
            page:{}
        };
    },
    methods: {
        handleSearch (){

        },
        redirectToAddPage (title,id) {
            if(title == "add"){
                this.$router.push({
                    name: 'AddTemplate',
                    query: { t: title }
                });
            }
            else{
                this.$router.push({
                    name: 'AddTemplate',
                    query: { t: title, id:id }
                });
            }
            
        },
        handleUpdate(params){
            if(params.row.valuation !== 1){
                this.redirectToAddPage('edit', params.row.id);
            }
            else{
                this.$Modal.warning({
                    title: '警告提示',
                    content: '<p style="font-size:14px;">改版后运费模板由“重量”改为“件数”计量，老运费模板不再支持修改编辑，建议商家修改商品的运费模板。</p>'
                });
            }
        },
        comfirmDel (params) {
            console.log(params)
            if(params.row.goods_num == 0){
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '<p style="font-size:14px;">您确定要删除该运费模板吗?</p>',
                    onOk: () => {
                        this.delTemplateItem(params);
                    }
                });
            } 
            else{
                this.$Modal.warning({
                    title: '警告提示',
                    content: '<p style="font-size:14px;">有商品在使用该模板，不可删除！</p>'
                });
            }
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
            var vm = this;
            ajaxApi.getFreightTemplateList()
                .then(function (response) {
                    console.log(response);
                    vm.tableData = response.data.data.items;
                    vm.page = response.data.data.page;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 删除运费模板接口
        delTemplateItem (params){
            var vm = this;
            ajaxApi.delFreightTemplateItem(params.row.id)
                .then(function (response) {
                    vm.tableData.splice(params.index, 1);
                    vm.$Message.success('删除成功！');
                })
                .catch(function (error) {
                    vm.$Message.error('删除失败！');
                });
        },
        changePage () {

        }
    },
    mounted () {
        this.getTableData();
    }
};
</script>
