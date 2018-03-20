<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">店铺二维码</h1>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            <img :src="qrcode" class="qrcode-cover">
            <Button type="primary" @click="handleDownLoadImg">下载图片</Button>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import util from '@/libs/util.js'
import ajaxApi from '@/libs/ajax_api.js'

export default {
    name: 'Qrcode',
    data () {
        return {
            qrcode: '',
        };
    },
    methods: {
        getShopCode(){
            var vm = this;
            ajaxApi.getShopInfo(Cookies.get('shopId'))
                .then(function (response) {
                    var dataJson = response.data.data;
                    vm.qrcode = dataJson.shop_qrcode;  
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleDownLoadImg(){
            var imgPathURL = this.qrcode;
            if(imgPathURL){
                this.oDownLoad(imgPathURL);
             }else{
                this.$Message.error('二维码图片为空!');
             }
        },
        //IE浏览器图片保存本地
        saveAs5(imgURL){
            var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
            for(; oPop.document.readyState != "complete"; )
            {
                if (oPop.document.readyState == "complete")break;
            }
            oPop.document.execCommand("SaveAs");
            oPop.close();
        },
        oDownLoad(url){
            if (this.myBrowser()==="IE"||this.myBrowser()==="Edge"){
                this.saveAs5(url);
            }else{
                this.download(url);
            }
        },
         //谷歌，360极速等浏览器下载
        download(src) {
            var $a = document.createElement('a');
            $a.setAttribute("href", src);
            $a.setAttribute("download", "");

            var evObj = document.createEvent('MouseEvents');
            evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
            $a.dispatchEvent(evObj);
        },
        myBrowser(){
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1;
            if (isOpera) {
                return "Opera"
            }; //判断是否Opera浏览器
            if (userAgent.indexOf("Firefox") > -1) {
                return "FF";
            } //判断是否Firefox浏览器
            if (userAgent.indexOf("Chrome") > -1){
                return "Chrome";
            }
            if (userAgent.indexOf("Safari") > -1) {
                return "Safari";
            } //判断是否Safari浏览器
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                return "IE";
            }; //判断是否IE浏览器
            if (userAgent.indexOf("Trident") > -1) {
                return "Edge";
            } //判断是否Edge浏览器
        }
    },
    mounted () {
        this.getShopCode();
    }
};
</script>
