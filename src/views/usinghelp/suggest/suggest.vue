<style lang="less">
    @import "./index.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <Col span="8">
                    <h1 class="head-title">建议反馈</h1>
                </Col>
            </Row>
        </div>
        <div class="wrap-main-suggest">
            <Form ref="formItem" :model="formItem" :label-width="180" :rules="ruleValidate">
                <FormItem label="选择您遇到的问题：" prop="question">
                    <dl class="radio-group">
                        <dd>
                            <input type="radio" name="question" value="1" v-model="formItem.question">
                            <div class="radio-tab">网页刷新慢</div>
                        </dd>
                        <dd>
                            <input type="radio" name="question" value="2" v-model="formItem.question">
                            <div class="radio-tab">商品无法上传</div>
                        </dd>
                        <dd>
                            <input type="radio" name="question" value="3" v-model="formItem.question">
                            <div class="radio-tab">其他</div>
                        </dd>
                    </dl>
                </FormItem>
                <FormItem label="请详细描述您遇到的问题："  prop="desc">
                    <div id="editorElem" class="editor" v-model="formItem.desc"></div>
                </FormItem>
                <FormItem label="上传图片：" prop="uploadList">
                    <div class="upload-show" v-for="item in formItem.uploadList">
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
                        v-show="uploadStatus"
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
                        action="//jsonplaceholder.typicode.com/posts/"
                        class="upload-plugin">
                        <div class="upload-box">
                            <Icon type="ios-plus-empty" size="72" color="#e4e4e4"></Icon>
                        </div>
                    </Upload>
                </FormItem>
            </Form>
        </div>
        <div class="button-section">
            <Button type="primary" @click="handleSubmit">保存</Button>
            <Button>取消</Button>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
export default {
    name: 'Suggest',
    data () {
        return {
            formItem:{
                question:'1',
                desc:'',
                uploadList:[]
            },
            ruleValidate:{
                question: [
                    { required: true, message: '请选择遇到的问题', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请详细描述您遇到的问题', trigger: 'blur' }
                ]
            },
            defaultImagesList:[],//默认已上传的文件
            visible: false,
            uploadStatus: true,
        }
    },
    methods:{
        handleSubmit  (){
            this.$refs['formItem'].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            this.uploadStatus = true;
        },
        handleSuccess (res, file) {
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError (file) {
            this.uploadStatus = true;
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 的格式不正确, 请选择jpg、gif、png中的一种.'
            });
        },
        handleMaxSize (file) {
            this.uploadStatus = true;
            this.$Notice.warning({
                title: '文件大小超过限制',
                desc: '文件  ' + file.name + ' 太大了，不能超过1M.'
            });
        },
        handleBeforeUpload (file) {
            const check = this.formItem.uploadList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: '只能上传一张照片'
                });
            }
            else{
                this.uploadStatus = false;
            }
            return check;
        }
    },
    mounted () {
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.formItem.desc = html
        }
        editor.create();

        this.formItem.uploadList = this.$refs.upload.fileList;
    }
};
</script>
