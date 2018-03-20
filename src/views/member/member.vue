<style lang="less">
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">客户列表</h1>
                </Col>
                <Col span="16">
                    <Input v-model="searchMemberName" icon="search" @on-change="handleSearch" placeholder="请输入客户姓名..." class="searchInput"/>
                </Col>
            </Row>
        </div>
        <div class="wrap-main-member">
            <Table :data="tableData" :columns="tableColumns" :row-class-name="rowClassName" class="primary-table"></Table>
            <div class="page-section">
                <Page :total="page.totalCount" :current="page.currentPage" @on-change="changePage" show-elevator></Page>
            </div>
            <div class="modal-section">
                <Modal v-model="modalUpdate" title="修改推荐人" class-name="vertical-center-modal" @on-ok="modalOk" @on-cancel="modalCancel" :loading="loading">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleInline" label-position="right" :label-width="100">
                        <FormItem label="客户姓名：">
                            <span>{{formValidate.name}}</span>
                        </FormItem>
                        <FormItem label="手机号：">
                            <span>{{formValidate.mobile}}</span>
                        </FormItem>
                        <FormItem label="加入时间：">
                            <span>{{formValidate.jointime}}</span>
                        </FormItem>
                        <FormItem label="推荐人：">
                            <span>{{formValidate.referrer}}</span>
                        </FormItem>
                        <FormItem label="手机号码：" prop="referrermobile">
                            <Input type="text" v-model="formValidate.referrermobile" style="width: 300px"></Input>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import util from '@/libs/util.js'
import ajaxApi from '@/libs/ajax_api.js'

export default {
    name: 'Member',
    data () {
        const validatePhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号码不能为空！'));
            }
            else{
                var phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
                if (!phoneReg.test(value)) {
                    callback(new Error('请输入有效的手机号码！'));
                } else {
                    callback();
                }
            }
            return true
        };
        return {
            searchMemberName:'',
            modalUpdate:false,
            loading: true,
            tableColumns: [
                {
                    title: '客户名称',
                    key: 'user_name',
                },
                {
                    title: '手机号',
                    key: 'user_mobile',
                },
                {
                    title: '加入时间',
                    key: 'created_at',  
                    render: (h, params) => {
                        return h('span', {
                            domProps: {
                                innerHTML: util.momentDate(params.row.created_at)
                            }
                        });
                    }
                },
                {
                    title: '推荐人',
                    key: 'superior_name',
                },
                {
                    title: '推荐人手机号码',
                    key: 'superior_mobile', 
                },
                {
                    title: '操作',
                    key: 'operate',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                on: {
                                    click: () => { 

                                        this.showModal(true, params);

                                    }
                                }
                            }, '修改推荐人')
                        ]);
                    }
                }
            ],
            tableData:[],
            page:{},

            formValidate:{
                name:'',
                mobile:'',
                jointime:'',
                referrer:'',
                referrermobile:''
            },
            ruleInline: {
                referrermobile: [
                    { required: true, message: '请输入手机号码.', trigger: 'blur' },
                    { validator: validatePhone, message: '手机号码格式不正确！', trigger: 'blur' }
                ]
            }
        };
    },
    methods:{
        changeLoading() {
            this.loading = false;
            this.$nextTick(() => {
              this.loading = true;
            });
        },
        modalOk () {
            this.$refs['formValidate'].validate((valid) => {
                if(!valid) {
                    return this.changeLoading();
                }
                this.getReferrerMobile()
            })   
        },
        modalCancel () {
            this.$refs['formValidate'].resetFields();
        },
        showModal (isShow, params) {
            this.formValidate = {
                name: params.row.user_name,
                mobile: params.row.user_mobile,
                jointime: params.row.created_at,
                referrer: params.row.superior_name,
                referrermobile: params.row.superior_mobile
            }
            this.modalUpdate = isShow;
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
        mockTableData () {
            let data = [];
            for (let i = 0; i < 5; i++) {
                data.push({
                    name: 'name' + Math.floor(Math.random () * 10 + i),
                    mobile: '1515819407'+Math.floor(Math.random () * 3 + 1),
                    jointime: this.formatDate(new Date()),
                    referrer: 'referrer' + Math.floor(Math.random () * 200 + 1),
                    referrermobile: '1515819400'+ Math.floor(Math.random () * 7 + 1),
                    update: this.formatDate(new Date())
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

        },

        //请求客户列表
        getCustomerList(){  
            var that = this;  
            var id = Cookies.get('shopId');
            ajaxApi.getCustomerList(id) 
            .then(function(response){
                console.log(response)
                let _info = [];
                let items = response.data.data.items
                for(var i = 0; i < items.length;i++){
                    _info.push({
                        created_at : items[i].created_at,
                        user_name : items[i].user_info.nick_name,
                        user_mobile : items[i].user_info.mobile,
                        superior_name : items[i].superior_info.nick_name,
                        superior_mobile : items[i].superior_info.mobile
                    })
                }
               // console.log(_info)        
                that.tableData = _info
                that.page = response.data.data.page;
            })
            .catch(function(error){
                console.log(error);
            })
        },

        //请求修改推荐人
          getReferrerMobile(){   
          var vm = this  
            var formData = {
                shop_id : Cookies.get('shopId'),
                superior_mobile : this.formValidate.referrermobile
                } 
            
                    
            ajaxApi.getReferrerMobile(id,formData) 
            .then(function(response){
                console.log(response)
                vm.changeLoading();
                vm.modalUpdate = false;
                vm.$Message.success('保存成功！');

            })
            .catch(function(error){
                console.log(error)            
            })
        },
    }, 
    created(){
        this.getCustomerList();  
    }

};

</script>
