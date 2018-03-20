<style lang="less">
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
            
            <Button type="primary">保存</Button>
            <button v-on:click="getContent">查看内容</button>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'

export default {
    name: 'HomeSetting',
    data () {
        return {
            editorContent: ''
        };
    },
    methods: {
        getContent: function () {
            alert(this.editorContent)
        }
    },
    mounted () {
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
    }
};
</script>
