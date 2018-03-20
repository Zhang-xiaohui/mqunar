<style lang="less" scoped>
    .selected-tree{
        padding: 10px 15px;
        border-top:1px solid #dddee1;
        border-bottom:1px solid #dddee1;
        .ivu-icon{
            margin: 0 6px;
        }
    }
    .component-main{
        position: relative;
        .select-groups{
            padding:30px 20px 50px;
            background-color: #fdfdfd;
            margin-right: 400px;
        }
        .list{
            li{
                height: 40px;
                line-height: 40px;
                border-bottom:1px solid #dddee1;
                position:relative;
                cursor: pointer;
                &:hover,&.active{
                    color:#ff776d;
                }
            }
        }
        .icon-arrow-r{
            position:absolute;
            top:14px;
            right:5px;
        }

        
    }
    
</style>

<template>
    <div>
        <div class="selected-tree">
            已选择商品的类目：{{goodsTypeFirst}}<span v-if="goodsTypeSecond"><Icon type="ios-arrow-right"></Icon>{{goodsTypeSecond}}</span><span v-if="goodsTypeThird"><Icon type="ios-arrow-right"></Icon>{{goodsTypeThird}}</span>
        </div>
        <div class="component-main">
            <div class="select-groups">
                <Row>
                    <Col span="7">
                        <Input v-model="goodsTypeFirst" icon="search"></Input>
                        <ul class="list">
                            <li v-for="item in firstList" @click="handleChange('first',item.name)" :class="{'active': goodsTypeFirst == item.name}">
                                {{item.name}}
                                <Icon type="ios-arrow-right" class="icon-arrow-r"></Icon>
                            </li>
                        </ul>
                    </Col>
                    <Col span="7" offset="1">
                        <Input v-model="goodsTypeSecond" icon="search"></Input>
                        <ul class="list">
                            <li v-for="item in secondList" @click="handleChange('second',item.name)" :class="{'active': goodsTypeSecond == item.name}">
                                {{item.name}}
                                <Icon type="ios-arrow-right" class="icon-arrow-r"></Icon>
                            </li>
                        </ul>
                    </Col>
                    <Col span="7" offset="1">
                        <Input v-model="goodsTypeThird" icon="search"></Input>
                        <ul class="list">
                            <li v-for="item in thirdList" @click="handleChange('third',item.name)" :class="{'active': goodsTypeThird == item.name}">
                                {{item.name}}
                                <Icon type="ios-arrow-right" class="icon-arrow-r"></Icon>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
            <goods-protocol></goods-protocol>
        </div>
        
    </div>
</template>

<script>
import GoodsProtocol from './goods-protocol.vue';
export default {
    name: 'ChooseGoodsType',
    components:{
        GoodsProtocol
    },
    props: {
        firstList: Array,
        secondList: Array,
        thirdList: Array
    },
    data (){
        return {
            goodsTypeFirst:'',
            goodsTypeSecond:'',
            goodsTypeThird:''
        }
    },
    methods: {
        handleChange(type,name){
            
            if(type == 'first'){
                this.goodsTypeFirst = name;
            }
            if(type == 'second'){
                this.goodsTypeSecond = name;
            }
            if(type == 'third'){
                this.goodsTypeThird = name;
            }
            this.$emit('on-changed', type, this.goodsTypeFirst);
        }
    },
    mounted (){
        console.log(this.firstList)
    }
};
</script>
