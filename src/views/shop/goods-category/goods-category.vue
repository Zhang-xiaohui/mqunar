<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">商品分类</h1>
                </Col>
                <Col span="8">
                    <Input v-model="searchWords" icon="search" @on-change="handleSearch" placeholder="请输入商品名称..." class="searchInput"/>
                </Col>
                <Col span="2" offset="6">
                    <Button type="primary" @click="showModal('新增分类', 'add', 0, '')">新增分类</Button>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <!-- <div class="operate-all">
                <div class="operate-left">
                    <span class="selected-tips">已选择<b class="selected-num">{{totalSelectNum}}</b>条</span>
                    <Button @click="handleBatchDel">删除</Button> 
                </div>
                <div class="operate-right">
                    <Button type="text" icon="close">关闭</Button>
                </div>
            </div> -->
            <table cellspacing="0" cellpadding="0" border="0" class="table-cat">
                <thead>
                    <tr>
                        <th class="t-checkbox">
                            <!-- <Checkbox
                            :indeterminate="indeterminate"
                            :value="checkAll"
                            @click.prevent.native="handleCheckAll" label=""></Checkbox> -->
                        </th>
                        <th>分类名称</th>
                        <th>排序</th>
                        <th>是否显示</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in tableData" v-if="item.parent_id == 0">
                        <tr>
                            <td class="t-checkbox"><Checkbox label="" :value="item.id" v-model="item.check" @on-change="handleCheckChange(item.check,index,item.id)"></Checkbox></td>
                            <td>
                                <template v-if="item.children.length > 0">
                                    <span @click="handleUnfold(index)" class="unfold-span">{{item.name}}<Icon :type='item.icon' class="table-icon"></Icon></span>
                                </template>
                                <template v-else>{{item.name}}</template>
                            </td>
                            <td>{{item.sort_order}}</td>
                            <td>
                                <template v-if="item.status === 0">否</template>
                                <template v-else>是</template>
                            </td>
                            <td>
                                <a style="margin-right:15px;" @click="showModal('新增分类','add', item.id,'')">新增下级</a>
                                <a style="margin-right:15px;" @click="showModal('编辑分类','edit', 0, item)">编辑</a>
                                <a @click="comfirmDel(item.id)">删除</a>
                            </td>
                        </tr>
                        <template v-for="subItem in item.children" v-if="item.children.length > 0">
                            <tr class="t-data-sub" v-show="item.icon == 'arrow-up-b'">
                                <td class="t-checkbox t-checkbox-sub"></td>
                                <td class="t-name-sub">{{subItem.name}}</td>
                                <td>{{subItem.sort_order}}</td>
                                <td>
                                    <template v-if="item.status === 0">否</template>
                                    <template v-else>是</template>
                                </td>
                                <td>
                                    <a style="margin-right:15px;" @click="showModal('编辑分类','edit', item.id, subItem)">编辑</a>
                                    <a @click="comfirmDel(subItem.id)">删除</a>
                                </td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>

            <div class="modal-section">
                <Modal v-model="modalUpdate" :title="modalTitle" class-name="vertical-center-modal" @on-ok="modalOk" @on-cancel="modalCancel" :loading="modalLoading">
                    <Form ref="formItem" :model="formItem" :rules="ruleInline" label-position="right" :label-width="90">
                        <FormItem label="分类名称：" prop="name">
                             <Input type="text" v-model="formItem.name" placeholder="请输入分类名称"></Input>
                        </FormItem>
                        <FormItem label="上级分类：" prop="parent_cat" class="form-cat">
                            <Select v-model="formItem.parent_cat" :disabled="selectDisabled" placeholder="">
                                <Option :value="item.id" v-for="item in tableData" :key="item.id">{{item.name}}</Option>
                            </Select>
                            <p>新增一级分类时无须选择此项，新增二级分类时请选择所属上级分类</p>
                        </FormItem>
                        <FormItem label="排序：" prop="sort">
                            <Input v-model.number="formItem.sort" placeholder="值越大越靠前"></Input>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
// import expandRow from '../components/table-expand.vue';
import Cookies from 'js-cookie'
import util from '@/libs/util.js'
import ajaxApi from '@/libs/ajax_api.js'

export default {
    name: 'GoodsCategory',
    // components: { expandRow },
    data () {
        return {
            searchWords:'',
            modalUpdate: false,
            modalTitle: "新增分类",
            modalLoading: true,
            modalType: 0, // 0代表增加父级  1代表增加二级  2代表编辑
            selectDisabled: false,
            tableData:[],
            formItem:{
                id:'',
                name: '',
                parent_cat: '' ,
                sort: ''
            },
            ruleInline: {
                name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入排序值' },
                    { type: 'number', message: '请输入数字' }
                ]
            },
            indeterminate: false,
            checkAll:false, //初始化 全选的value
            checkAllArr:[], //存放所有的id
            checkAllGroup:[], //存放选中的id
            totalSelectNum:0 //全选数量
        };
    },
    methods:{
        handleCheckAll(){
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            var checkArr = [];
            if (this.checkAll) {
                this.tableData.map(item => {
                    item.check = true;
                });
                var checkArr = this.checkAllArr;
                this.checkAllGroup = JSON.parse(JSON.stringify(checkArr))
                var length = this.checkAllGroup.length;
                this.totalSelectNum = length;
                //统计选择数量
            } else {
                this.tableData.map(item => {
                    item.check = false;
                });
                this.checkAllGroup = [];
                this.totalSelectNum = 0;
            }
        },
        handleCheckChange(isCheck,index,id){
            console.log(isCheck)
            if(isCheck){
                this.checkAllGroup.splice(index,1,id)
            }
            else{
                this.checkAllGroup.splice(index,1,-1);
            }

            var num = 0;
            this.checkAllGroup.forEach(function(item,index,arr){
                if(item == -1){
                    num++;
                }
            });
            // 赋值 被选中的数量总和
            this.totalSelectNum = num;

            if(num == 0){
                this.indeterminate = false;
                this.checkAll = true;
            }
            else if(num > 0 && num < this.checkAllGroup.length){
                this.indeterminate = true;
                this.checkAll = false;
            }
            else{
                this.indeterminate = false;
                this.checkAll = false;
            }
        },
        handleBatchDel(){
            var vm = this;
            this.checkAllGroup.forEach(function(item,index,arr){
                if(item != -1){
                    vm.tableData.splice(index,1);
                }
            })
        },
        showModal ( title, type, parent_id, obj) {
            this.modalTitle = title;
            if(type == 'add' && parent_id == 0){ //新增父级分类
                this.selectDisabled = false;
                this.formItem.parent_cat = '';
                this.modalType = 0;
            }
            else if(type == 'add' && parent_id != 0){ //新增二级分类
                this.selectDisabled = true;
                this.formItem.parent_cat = parent_id;
                this.modalType = 1;
            }
            else if(type == 'edit'){
                if(parent_id == 0){
                    this.formItem = {
                        id: obj.id,
                        name: obj.name,
                        parent_cat: '' ,
                        sort: obj.sort_order
                    }
                    this.selectDisabled = true;
                }
                else{
                    this.selectDisabled = false;
                    this.formItem = {
                        id: obj.id,
                        name: obj.name,
                        parent_cat: parent_id ,
                        sort: obj.sort_order
                    }
                }
                this.modalType = 2;
            }
            this.modalUpdate = true;
        },
        comfirmDel (id) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: '<p style="font-size:14px;">您确定要删除该商品分类吗?</p>',
                onOk: () => {
                    this.delCategory(id);
                }
            });
        },
        changeLoading() {
            this.modalLoading = false;
            this.$nextTick(() => {
                this.modalLoading = true;
            });
        },
        modalOk () {
            this.$refs['formItem'].validate((valid) => {
                if(!valid) {
                    return this.changeLoading();
                }
                else{
                    this.changeLoading();
                    if(this.modalType == 0 || this.modalType == 1){
                        this.addCategory();
                    }
                    else{
                        this.editCategory(this.formItem.id);
                    }
                }
            })
        },
        modalCancel () {
            this.$refs['formItem'].resetFields();
        },
        handleSearch () {

        },
        handleUnfold(index){
            // this.$set('this.tableData[index]',)
            if(this.tableData[index].icon === 'arrow-up-b'){
                this.tableData[index].icon = 'arrow-down-b';
            }
            else{
                this.tableData[index].icon = 'arrow-up-b';
            }
            
        },
        // 获取列表数据
        getTableData(){
            var vm = this;
            ajaxApi.getShopGoodsCateList({
                'shop_id': Cookies.get("shopId")
            })
                .then(function (response) {
                    var dataJson = response.data.data;
                    vm.checkAllArr = dataJson.map(item => {
                        item.icon = 'arrow-down-b';
                        item.check = false;
                        return item.id;
                    })
                    vm.tableData = dataJson;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addCategory(){
            var vm = this;
            var parentId = 0;
            if(this.formItem.parent_cat){
                parentId = this.formItem.parent_cat;
            }
            var data = {
                shop_id: Cookies.get("shopId"),
                parent_id: parentId,
                name:this.formItem.name,
                sort_order: this.formItem.sort
            }
            ajaxApi.addShopGoodsCate(data)
                .then(function (response) {
                    vm.modalUpdate = false;
                    vm.$Message.success('保存成功！');
                    vm.getTableData();
                    vm.$refs['formItem'].resetFields();
                })
                .catch(function (error) {
                    vm.$Message.error('保存失败！');
                    console.log(error);
                });
        },
        editCategory(id){
            var vm = this;
            var data = {
                id: id,
                shop_id: Cookies.get("shopId"),
                parent_id: this.formItem.parent_cat == '' ? 0 : this.formItem.parent_cat,
                name:this.formItem.name,
                sort_order: this.formItem.sort,
            }
            ajaxApi.editShopGoodsCate(id,data)
                .then(function (response) {
                    vm.modalUpdate = false;
                    vm.$Message.success('编辑成功！');
                    vm.getTableData();
                    vm.$refs['formItem'].resetFields();
                })
                .catch(function (error) {
                    vm.$Message.error('编辑失败！');
                    console.log(error);
                });
        },
        delCategory(id){
            var vm = this;
            var data = {
                'shop_id': Cookies.get("shopId")
            }

            ajaxApi.delShopGoodsCate(id,data)
                .then(function (response) {
                    vm.$Message.success('删除成功！');
                    vm.getTableData();
                })
                .catch(function (error) {
                    vm.$Message.error(error.data.message);
                    console.log(error);
                });
        },
    },
    mounted () {
        this.getTableData();
    }
};
</script>
