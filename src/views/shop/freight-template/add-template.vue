<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div class="wrap-addtemplate">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <h1 class="head-title">{{headTitle}}运费模板</h1>
                <router-link :to="{ name: 'FreightTemplate'}">返回运费模板</router-link>
            </Row>
        </div>
        <div class="wrap-main">
            <Form ref="formItem" :model="formItem" label-position="right" :label-width="90">
                <FormItem label="模板名称：" prop="name">
                     <Input type="text" v-model="formItem.name" placeholder="请输入模板名称" class="input-text"></Input>
                </FormItem>
                <FormItem label="模板描述：" prop="desc">
                     <Input type="text" v-model="formItem.desc" placeholder="请输入模板描述" class="input-text"></Input>
                </FormItem>
                <FormItem label="运费设置：">
                    <table class="table">
                        <thead>
                            <tr>
                                <th width="42%" class="first-col">区域设置</th>
                                <th width="12%">首件</th>
                                <th width="12%">运费</th>
                                <th width="12%">续件</th>
                                <th width="12%">运费</th>
                                <th width="10%">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in formItem.feeList">
                                <td class="first-col"><span class="show-district">{{item.str}}</span><a class="add-setting" @click="addDistrict(index, item.areas)">+添加区域设置</a></td>
                                <td><Input type="text" v-model="item.start"></Input></td>
                                <td><Input type="text" v-model="item.postage"></Input></td>
                                <td><Input type="text" v-model="item.plus"></Input></td>
                                <td><Input type="text" v-model="item.postageplus"></Input></td>
                                <td><a @click="delListItem(index, item.areas)">删除</a></td>
                            </tr>
                            <tr class="foot-bg">
                                <td colspan="6"><a @click="addListItem">+为指定区域设置运费模板</a></td>
                            </tr>
                        </tbody>
                    </table>
                </FormItem>
            </Form>
            <Modal 
                v-model="showTransfer"
                title="选择可配送区域"
                width="615px"
                @on-ok="modalSaveTransfer"
            >
                <freight-transfer
                    :data="transferData"
                    :target-keys="transferTargetKeys"
                    @on-changed="handleChange"
                ></freight-transfer>
            </Modal>
        </div>
        <div class="button-section">
            <Button type="primary" @click="btnSave">保存</Button>
            <Button>取消</Button>
        </div>
    </div>

</template>

<script>
import FreightTransfer from '../components/freight-transfer.vue'
import CityData from '@/libs/city_data.js';
import Cookies from 'js-cookie'
import util from '@/libs/util.js'
import ajaxApi from '@/libs/ajax_api.js'


export default {
    name: 'AddTemplate',
    components: {
        FreightTransfer
    },
    data () {
        var title = this.$route.query.t === 'edit' ? '编辑' : '新增';
        return {
            searchWords:'',
            showTransfer:false,
            headTitle: title,
            transferData:this.getCityData(),
            transferTargetKeys:[],
            transfterTargetIndex:0,
            formItem:{
                id:'',
                name:'',
                desc:'',
                feeList:[]   
            }
        };
    },
    methods: {
        handleSearch (){

        },
        getCityData () {
            let cityData = CityData;
            let filterData = [];
            console.log(cityData)
            for (let i = 0; i < cityData.length; i++) {
                if(cityData[i].parent_id == "0"){
                    
                    filterData.push({
                        key : cityData[i].id,
                        label : cityData[i].name
                    })
                }
            }
            return filterData;
        },
        getTargetKeys (idsArray) {
            var keyData = this.getCityData()
                            .filter(item => {
                                if(idsArray.indexOf(item.key) > -1 ){
                                    return item;
                                }
                            })
                            .map(item => item.key);
            this.transferTargetKeys = keyData;
        },
        addDistrict(index,ids){
            var areas_ids = [];
            console.log(ids)
            if(ids != ""){
                areas_ids = ids.split(",");
            }
            this.getTargetKeys(areas_ids);
            this.transfterTargetIndex = index;
            this.showTransfer = !this.showTransfer;
        },
        modalSaveTransfer(){
            this.formItem.feeList[this.transfterTargetIndex].areas = this.transferTargetKeys.join(",");
            var labelData = this.getCityData()
                .filter(item => {
                    if(this.transferTargetKeys.indexOf(item.key) > -1 ){
                        return item.label;
                    }
                })
                .map(item => item.label);
            this.formItem.feeList[this.transfterTargetIndex].str = labelData.join(",");
        },
        addListItem() {
            var data = { 
                areas:'',
                str:'区域名称',
                start:'',
                postage:'',
                plus:'',
                postageplus:''      
            }
            this.formItem.feeList.unshift(data);
        },
        delListItem(index,id) {
            this.formItem.feeList.splice(index,1)
        },

        handleChange (keys){
            this.transferTargetKeys = keys;
        },
        getTemplateDetail(id){
            var vm = this;
            ajaxApi.getFreightTemplateDetail(id)
                .then(function (response) {
                    console.log(response);
                    var dataJson = response.data.data;
                    vm.formItem.name = dataJson.name;
                    vm.formItem.desc = dataJson.description;
                    vm.formItem.feeList = JSON.parse(dataJson.fee_json_str);
                })
                .catch(function (error) {
                    vm.$Message.error('数据获取失败！');
                    console.log(error);
                });
        },
        btnSave(){
            if(this.$route.query.t == 'edit'){
                var formData = {
                    id: this.$route.query.id,
                    shop_id: Cookies.get('shopId'),
                    name: this.formItem.name,
                    description: this.formItem.desc,
                    fee_json_str:JSON.stringify(this.formItem.feeList)
                }
                console.log(formData)
                var vm = this;
                ajaxApi.editFreightTemplateItem(this.$route.query.id, formData)
                    .then(function(response){
                        vm.$Message.success('修改成功！');
                    })
                    .catch(function (error) {
                        vm.$Message.error('修改失败！');
                        console.log(error);
                    });
            }
            else if(this.$route.query.t == 'add'){
                var formData = {
                    shop_id: Cookies.get('shopId'),
                    name: this.formItem.name,
                    description: this.formItem.desc,
                    fee_json_str:JSON.stringify(this.formItem.feeList)
                }
                console.log(formData)
                var vm = this;
                ajaxApi.addFreightTemplateItem(this.$route.query.id, formData)
                    .then(function(response){
                        vm.$Message.success('添加成功！');
                    })
                    .catch(function (error) {
                        vm.$Message.error('添加失败！');
                        console.log(error);
                    });
            }
            
        }
    },
    created (){
    },
    mounted () {
        if(this.$route.query.id){
            this.getTemplateDetail(this.$route.query.id);
        }
        
    }
};
</script>
