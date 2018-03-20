<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <div class="login-logo"></div>
            <div class="login-main">
                <Form ref="loginForm" :model="form" :rules="rules" inline>
                    <FormItem prop="userName">
                        <Input v-model="form.userName" placeholder="请输入用户名" class="form-input">
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="form.password" placeholder="请输入密码" class="form-input">
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button @click="handleSubmit" type="primary" long class="form-btn" :loading="btnLoading">登录</Button>
                    </FormItem>
                </Form>
                <div class="checkbox-pwd"><Checkbox v-model="rememberPwd">记住密码</Checkbox></div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import util from '@/libs/util.js';

export default {
    data () {
        let pwd = '';
        let user = '';
        if(Cookies.get('rememberPwd') == 'true'){
            pwd = Cookies.get('password') == undefined ? '' : Cookies.get('password');
            user = Cookies.get('userName') == undefined ? '' : Cookies.get('userName');
        }
        return {
            rememberPwd: Cookies.get('rememberPwd') == 'true' ? true : false,
            form: { 
                userName: user,
                password: pwd
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            btnLoading: false
        };
    },
    methods: {
        handleSubmit () {
            var vm = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    vm.btnLoading = !vm.btnLoading;
                    util.ajax.post('/web/user/v1/user/shop-login',{
                            mobile:this.form.userName,
                            password:this.form.password
                        })
                        .then(function (response) {
                            console.log(response)
                            vm.btnLoading = !vm.btnLoading;
                            Cookies.set('userName', vm.form.userName);
                            Cookies.set('rememberPwd', vm.rememberPwd);
                            Cookies.set('shopId', response.data.data.shop_id);
                            if(vm.rememberPwd){
                                Cookies.set('password', vm.form.password);
                            }
                            else{
                                Cookies.remove('password');
                            }
                            vm.$router.push({
                                name: 'home_index'
                            });
                            
                        })
                        .catch(function (response) {
                            vm.btnLoading = !vm.btnLoading;
                            console.log(response);
                        });
                }
            });
        }
    }
};
</script>

<style>

</style>
