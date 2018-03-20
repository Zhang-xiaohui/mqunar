<style lang="less" scoped>
    @import "./goods-form.less";
</style>

<template>
    <div class="form-section">
        <Row class="form-item">
            <div class="form-title">基本信息</div>
            <div class="form-content">
                <Form :model="formItem" :label-width="100">
                    <FormItem label="商品分类：">
                        <span></span>
                    </FormItem>
                    <FormItem label="商品品牌：">
                        <Select v-model="formItem.brand">
                            <Option value="beijing">New York</Option>
                            <Option value="shanghai">London</Option>
                            <Option value="shenzhen">Sydney</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="商品标题：">
                        <Input v-model="formItem.title" placeholder="输入商品标题"></Input>
                    </FormItem>
                    <FormItem label="商品特色卖点：">
                        <Input v-model="formItem. sellPoint" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="填写卖点优惠信息让ta脱颖而出"></Input>
                    </FormItem>
                    <FormItem label="有效时间：">
                        <DatePicker type="date" placeholder="选择日期" class="datepicker"></DatePicker>
                        <Icon type="ios-minus-empty"></Icon>
                        <DatePicker type="date" placeholder="选择日期" class="datepicker"></DatePicker>
                    </FormItem>
                    <FormItem label="注意事项：">
                        <Input v-model="formItem.attention" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="填写卖点优惠信息让ta脱颖而出"></Input>
                    </FormItem>
                </Form>
            </div>
        </Row>
        <Row>
            <div class="form-title">商品规格</div>
            <div class="form-content">
                <div class="add-spec-box">
                    <Row class="spec-item">
                        <Col span="3"><Input v-model="formItem.title" placeholder="例：类型"></Input></Col>
                        <Col span="21">
                            <a class="btn-add-sub" @click="handleModalSpecValue">+添加规格子项</a>
                            <ul class="spec-value">
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月月卡月卡卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月月卡卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月月卡卡<Icon type="android-close"></Icon></li>
                                <li>月月卡卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                            </ul>
                        </Col>
                    </Row>
                    <Row class="spec-item">
                        <Col span="3"><Input v-model="formItem.title" placeholder="例：类型"></Input></Col>
                        <Col span="21">
                            <a class="btn-add-sub">+添加规格子项</a>
                            <ul class="spec-value">
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月卡<Icon type="android-close"></Icon></li>
                                <li>月月卡月卡卡<Icon type="android-close"></Icon></li>
                            </ul>
                        </Col>
                    </Row>
                    <Button type="primary">+添加规格</Button>
                </div>
                <div class="show-spec-table">
                    <table cellspacing="0" cellpadding="0" border="0">
                        <thead>
                            <tr>
                                <th colspan="2" width="15%">商品规格</th>
                                <th rowspan="2">价格（元）</th>
                                <th rowspan="2">库存（件）</th>
                                <th rowspan="2">货号</th>
                                <th rowspan="2">图片</th>
                            </tr>
                            <tr>
                                <th>类型</th>
                                <th>日期</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="3">季卡</td>
                                <td>长形</td>
                                <td><Input class="table-input"></Input></td>
                                <td><Input class="table-input"></Input></td>
                                <td><Input class="table-input"></Input></td>
                                <td>
                                    <Icon type="plus" class="table-addPic"></Icon>
                                </td>
                            </tr>
                            <tr>
                                <td>圆形</td>
                                <td><Input class="table-input"></Input></td>
                                <td><Input class="table-input"></Input></td>
                                <td><Input class="table-input"></Input></td>
                                <td><Input class="table-input"></Input></td>
                            </tr>
                            <tr>
                                <td>正方形</td>
                                <td><Input class="table-input"></Input></td>
                                <td><Input class="table-input"></Input></td>
                                <td><Input class="table-input"></Input></td>
                                <td><Input class="table-input"></Input></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="batch-spec">
                    <label class="batch-title">
                        <b>*</b>一口价及库存：
                    </label>
                    <Form :model="formItem" :label-width="90">
                        <FormItem label="价格（元）">
                            <Input v-model="formItem.title" placeholder="输入商品标题"></Input>
                        </FormItem>
                        <FormItem label="原价（元）">
                            <Input v-model="formItem.title" placeholder="输入商品标题"></Input>
                        </FormItem>
                        <FormItem label="总库存（件）">
                            <Input v-model="formItem.title" placeholder="输入商品标题"></Input>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </Row>
        <Row>
            <div class="form-title">商品详情</div>
            <div class="form-content form-media">
                <p>商品橱窗图：大小不超过1MB;尺寸：700*700px;建议发商品白底图可在手机端有更好的展现</p>

                <p>商品视频：建议长宽比1:1;大小不超过5MB;时间不超过10s;仅支持flv,mp4,3gp三种格式</p>

                <p class="red">宝店通会员特享受，有声画面展示更真实的商品</p>
                <Button type="primary">+上传视频</Button>
            </div>
        </Row>
        <Row>
            <div class="form-title">商品描述</div>
            <div class="form-content">
                <Form :model="formItem">
                    <FormItem>
                        <div id="editorElem" class="editor" v-model="formItem.desc"></div>
                    </FormItem>
                </Form>
            </div>
        </Row>
        <Row>
            <div class="form-title">其他设置</div>
            <div class="form-content">
                <Form :model="formItem" :label-width="100">
                    <FormItem label="店铺分类：">
                        <a>+添加店铺分类</a>
                    </FormItem>
                    <FormItem label="排序：">
                        <Input v-model="formItem.sort" placeholder="数值越小越靠前"></Input>
                    </FormItem>
                </Form>
            </div>
        </Row>
        <goods-spec-value
            ref="child"
            @on-changed="getSpecValue"
        >
        </goods-spec-value>
    </div>
    
</template>

<script>
import E from 'wangeditor'
import GoodsSpecValue from './goods-spec-value.vue';
export default {
    name: 'GoodsForm',
    components:{
        GoodsSpecValue
    },
    props: {
        
    },
    data (){
        return {
            formItem:{
                brand:'',
                title:'',
                sellPoint:'',
                attention:'',
                sort:''
            }
        }
    },
    methods: {
        handleModalSpecValue () {
            // console.log('status:',status)
            this.$refs.child.handleShow(true)
        },
        getSpecValue(value){
            console.log('value:',value)
        }
    },
    mounted () {
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.formItem.desc = html
        }
        editor.create()
    }
};
</script>
