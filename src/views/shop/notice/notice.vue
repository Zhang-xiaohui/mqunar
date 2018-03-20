<style lang="less" scoped>
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">发布公告</h1>
                </Col>
            </Row>
        </div>
        <div class="wrap-main">
            
            <div class="form">
                <div class="label-title"><b>*</b>内容：</div>
                <div id="editorElem" class="editor"></div>
            </div>
            
            <Button type="primary" @click="handleSave">保存</Button>
            <!-- <button v-on:click="getContent">查看内容</button> -->
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
import Cookies from 'js-cookie'
import util from '@/libs/util.js'
import ajaxApi from '@/libs/ajax_api.js'

var editor = new E('#editorElem');
export default {
    name: 'Notice',
    data () {
        return {
            editorContent: ''
        };
    },
    methods: {
        getContent: function () {
            alert(this.editorContent)
        },
        handleSave(){
            var vm = this;
            ajaxApi.editShopNotice(Cookies.get('shopId'),{content:this.editorContent,})
                .then(function (response) {
                    vm.$Message.success('更新成功！');
                })
                .catch(function (error) {
                    vm.$Message.error('更新失败！');
                });
        },
        getNoticeContent() {
            var vm = this;
            ajaxApi.getShopInfo(Cookies.get('shopId'))
                .then(function (response) {
                    var dataJson = response.data.data;
                    vm.editorContent = dataJson.notice;
                    editor.txt.html(dataJson.notice);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    },
    mounted () {
        this.getNoticeContent();
        
        editor.customConfig.onchange = (html) => {
          this.editorContent = html;
        }
        editor.create();
        
    }
};
</script>
