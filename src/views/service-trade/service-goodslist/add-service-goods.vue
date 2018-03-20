<style lang="less" scoped>
    @import "./add-service-goods.less";
</style>
<template>
    <div class="wrap">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <h1 class="head-title">{{headTitle}}商品</h1>
                <router-link :to="{ name: 'ServiceGoodslist'}">返回商品列表</router-link>
            </Row>
        </div>
        <div class="wrap-main">
            <template v-if="step == 1">
                <choose-goods-type
                    :first-list='typeFirstList'
                    :second-list='typeSecondList'
                    :third-list='typeThirdList'
                    @on-changed="handleChange"
                >
                </choose-goods-type>
                <div class="btn-section">
                    <Button class="btn-publish" @click="stepNext">我已阅读协议规则，开始发布</Button>
                </div>
            </template>
            <template v-else-if="step == 2">
                <goods-form></goods-form>
            </template>
        </div>
    </div>
</template>

<script>
import ChooseGoodsType from '../components/choose-goods-type.vue'
import GoodsForm from '../components/goods-form.vue'
export default {
    name: 'AddServiceGoods',
    components: {
        ChooseGoodsType,
        GoodsForm
    },
    data () {
        var title = this.$route.query.t === 'edit' ? '编辑' : '新增';
        return {
            step: 2,
            headTitle:title,
            typeFirstList:[{
                    id:1,
                    name:'亲子购物'
                },{
                    id:2,
                    name:'育婴护理'
                },{
                    id:3,
                    name:'游泳洗澡'
                },{
                    id:4,
                    name:'周边游'
                },{
                    id:5,
                    name:'亲子游乐'
            }],
            typeSecondList:[],
            typeThirdList:[],

        };
    },
    methods: {
        handleChange(type,name){
            if (type == 'first') {
                this.typeSecondList = [{
                        id:11,
                        name:'纸尿裤'
                    },{
                        id:12,
                        name:'拉拉裤'
                    },{
                        id:13,
                        name:'隔尿垫'
                    },{
                        id:14,
                        name:'宝宝湿巾'
                    },{
                        id:15,
                        name:'尿不湿'
                    },{
                        id:11,
                        name:'纸尿裤'
                    },{
                        id:12,
                        name:'拉拉裤'
                    },{
                        id:13,
                        name:'隔尿垫'
                    },{
                        id:14,
                        name:'宝宝湿巾'
                    },{
                        id:15,
                        name:'尿不湿'
                    }]
            }
            else if (type == 'second') {
                this.typeThirdList = [{
                        id:111,
                        name:'婴儿尿布'
                    },{
                        id:112,
                        name:'婴儿纸尿裤'
                    }
                ]
            }
        },
        stepNext(){
            console.log(4444)
            this.step = 2;
        }
    },
    mounted () {
    }
};
</script>
