<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">店铺资料</h1>
                </Col>
            </Row>
        </div>
        <div class="wrap-main wrap-main-baseInfo">
            <Form :model="formItem" :label-width="100">
                <FormItem label="店铺名称：">
                    <span class="shop-name">{{shopName}}</span>
                </FormItem>
                <FormItem label="店铺大图：">
                    <div class="upload-show" v-for="item in shopCoverList">
                        <!-- <Progress v-if="item.showProgress" :percent="item.percentage" hide-info ></Progress> -->
                        <template v-if="item.status === 'finished'">
                            <div class="upload-cover" v-bind:style="{backgroundImage :  'url(' + item.url + ')'}">
                                <Icon type="close-circled" color="#ff776d" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload 
                        ref="upload"
                        v-show="uploadStatusCover"
                        :show-upload-list="false"
                        :default-file-list="defaultImagesList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png','gif']"
                        :max-size="1024"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        action="/web/upload/index"
                        class="upload-plugin">
                        <div class="upload-box">
                            <Icon type="ios-plus-empty" size="72" color="#e4e4e4"></Icon>
                        </div>
                    </Upload>
                    <p class="upload-tips">图片尺寸为750*365；大小不超过1MB；图片清晰展示效果更佳</p>
                </FormItem>
                <FormItem label="微信二维码：" prop="qrcode">
                    <div class="upload-show-qr" v-for="item in qrcodeList">
                        <template v-if="item.status === 'finished'">
                            <div class="upload-cover" v-bind:style="{backgroundImage :  'url(' + item.url + ')'}">
                                <Icon type="close-circled" color="#ff776d" @click.native="handleRemoveQr(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload 
                        ref="uploadQrcode"
                        v-show="uploadStatusQrcode"
                        :show-upload-list="false"
                        :default-file-list="defaultQrcodeList"
                        :on-success="handleSuccessQr"
                        :format="['jpg','jpeg','png','gif']"
                        :max-size="1024"
                        :on-format-error="handleFormatErrorQr"
                        :on-exceeded-size="handleMaxSizeQr"
                        :before-upload="handleBeforeUploadQr"
                        multiple
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/"
                        class="upload-plugin-qr">
                        <div class="upload-box-qr">
                            <Icon type="ios-plus-empty" size="72" color="#e4e4e4"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="微信号：" prop="wechatId">
                    <Input v-model="formItem.wechatId" placeholder="请输入微信号"></Input>
                </FormItem>
                <FormItem label="联系方式：" prop="contact">
                    <Input v-model="formItem.contact" placeholder="请输入联系方式"></Input>
                </FormItem>
                <FormItem label="店铺地址：" prop="qrcode">
                    <al-selector v-model="areaValue" data-type="code" level="2" class="area-select" disabled/>
                    <!-- <Cascader :data="areaData" v-model="areaValue" class="cascader-area"></Cascader> -->
                    <Input v-model="formItem.address" class="input-address" disabled></Input>
                </FormItem>
            </Form>
        </div>
        <div class="button-section">
            <Button type="primary" @click="handleEdit">保存</Button>
            <Button>取消</Button>
        </div>
    </div>
</template>

<script>


import Cookies from 'js-cookie'
import util from '@/libs/util.js'
import ajaxApi from '@/libs/ajax_api.js'

export default {
    name: 'base-info',
    data () {
        return {
            defaultImagesList:[],//默认已上传的文件
            visible: false,
            shopCoverList: [],
            uploadStatusCover: true,
            defaultQrcodeList:[], //默认已上传的二维码
            visibleQrcode: false,
            qrcodeList:[],
            uploadStatusQrcode: true,

            areaValue:[], //默认省市区
            shopName:'',
            formItem:{
                shopCover:'',
                qrcode:'',
                wechatId:'',
                contact:'',
                address:'',
            },
        };
    },
    methods: {
        handleEdit(){
            this.editShopInfo();
        },
        getShopData(){
            var vm = this;
            ajaxApi.getShopInfo(Cookies.get('shopId'))
                .then(function (response) {
                    console.log(response)
                    var dataJson = response.data.data;
                    vm.shopName = dataJson.shop_name;
                    vm.formItem = {
                        shopCover: dataJson.banner,
                        qrcode:dataJson.qr_code,
                        wechatId: dataJson.wechat_id,
                        contact: dataJson.contact,
                        address:dataJson.address,
                    }
                    vm.areaValue = [dataJson.province, dataJson.city, dataJson.district];

                    var filename = vm.formatFileName(dataJson.banner);
                    vm.uploadStatusCover = false;
                    vm.defaultImagesList = [{
                        'name': filename,
                        'url': dataJson.banner,
                        'percentage':100,
                        'status':"finished",
                    }];
                    vm.shopCoverList = vm.defaultImagesList;

                    // 微信
                    var filenameQr = vm.formatFileName(dataJson.qr_code);
                    vm.uploadStatusQrcode = false;
                    vm.defaultQrcodeList = [{
                        'name': filenameQr,
                        'url': dataJson.qr_code,
                        'percentage':100,
                        'status':"finished",
                    }];
                    vm.qrcodeList = vm.defaultQrcodeList;

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        formatFileName(url_name){
            var filename;
            if(url_name.indexOf("/")>0){ //如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
                filename = url_name.substring(url_name.lastIndexOf("/") + 1 , url_name.length);
            }
            else{
                filename = url_name;
            }
            return filename;
        },
        handleRemove (file) {
            this.shopCoverList = [];
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.uploadStatusCover = true;
        },
        handleSuccess (res, file) {
            // console.log(res)
            // console.log(file)
            file.url = res.data.url;
            file.name = this.formatFileName(res.data.url)
            this.formItem.shopCover = res.data.url;
        },
        handleFormatError (file) {
            this.uploadStatusCover = true;
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 的格式不正确, 请选择jpg、gif、png中的一种.'
            });
        },
        handleMaxSize (file) {
            this.uploadStatusCover = true;
            this.$Notice.warning({
                title: '文件大小超过限制',
                desc: '文件  ' + file.name + ' 太大了，不能超过1M.'
            });
        },
        handleBeforeUpload (file) {
            const check = this.shopCoverList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: '只能上传一张照片'
                });
            }
            else{
                this.shopCoverList = this.$refs.upload.fileList;
                this.uploadStatusCover = false;
            }
            return check;
        },
        // 微信
        handleRemoveQr (file) {
            this.qrcodeList = [];
            const fileList = this.$refs.uploadQrcode.fileList;
            this.$refs.uploadQrcode.fileList.splice(fileList.indexOf(file), 1);
            this.uploadStatusQrcode = true;
        },
        handleSuccessQr (res, file) {
            console.log(res)
            file.url = res.data.url;
            file.name = this.formatFileName(res.data.url)
            this.formItem.qrcode = res.data.url;
        },
        handleFormatErrorQr (file) {
            this.uploadStatusQrcode = true;
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确, 请选择jpg、gif、png中的一种.'
            });
        },
        handleMaxSizeQr (file) {
            this.uploadStatusQrcode = true;
            this.$Notice.warning({
                title: '文件大小超过限制',
                desc: '文件  ' + file.name + ' 太大了，不能超过1M.'
            });
        },
        handleBeforeUploadQr (file) {
            const check = this.qrcodeList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: '只能上传一张照片'
                });
            }
            else{
                this.qrcodeList = this.$refs.uploadQrcode.fileList;
                this.uploadStatusQrcode = false;
            }
            return check;
        },
        editShopInfo(){
            var vm = this;
            var id = Cookies.get("shopId");
            ajaxApi.editShopInfo(id, {
                shop_name:this.shopName,
                banner: this.formItem.shopCover,
                qr_code:this.formItem.qrcode,
                contact:this.formItem.contact,
                wechat_id:this.formItem.wechatId,
            })
            .then(function (response) {
                    vm.modalUpdate = false;
                    vm.$Message.success('编辑成功！');
                    vm.getShopData();
                })
                .catch(function (error) {
                    vm.$Message.error('编辑失败！');
                    console.log(error);
                });
        }
    },
    mounted () {
        // this.getShopData();
        // this.shopCoverList = this.$refs.upload.fileList;
        
        // this.qrcodeList = this.$refs.uploadQrcode.fileList;
    },
    created (){
        this.getShopData();
    }
};
</script>
