<style lang="less">
    @import "./distribution-set-form.less";
</style>
<template>
    <div class="wrap wrap-distribution-setForm">
        <div class="wrap-head">
            <Row type="flex" align="middle" class-name="head-row">
                <h1 class="head-title">分销设置</h1>
                <router-link :to="{ name: ''}">返回分销商品列表</router-link>
            </Row>
        </div>
        <div class="wrap-main">
            <Row>
                <div class="form-title">商品信息</div>
                <div class="form-content clearfix">
                    <div class="goods-cover" style="background-image: url('https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg')"></div>
                    <div class="goods-info">
                        <h3 class="name"><router-link :to="{name:''}">海外原装进口德国爱他美3段婴儿成长配方宝爸爸想国内现货</router-link></h3>
                        <p class="price"><span class="space">市场价：￥50.00</span></p>
                    </div>
                </div>
            </Row>
            <Row>
                <div class="form-title">选择分销商品的店铺分类</div>
                <div class="form-content">
                    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="120">
                        <FormItem label="店铺分类：" prop="price">
                            <Input v-model="formItem.price" placeholder="输入秒杀价格"></Input>
                        </FormItem>
                        <FormItem label="排序：" class="formItem-prefix">
                            <Input v-model="formItem.prefix" placeholder="例：双11特价"></Input>
                        </FormItem>
                    </Form>
                </div>
            </Row>
            <Row>
                <div class="form-title">修改利润</div>
                <div class="form-content">
                    <table class="table-profit">
                        <thead>
                            <tr>
                                <th>市场价</th>
                                <th>规格</th>
                                <th>成本价</th>
                                <th>利润</th>
                                <th>售价</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="4">￥50.00</td>
                                <td>颜色：蓝色</td>
                                <td>￥35.00</td>
                                <td>
                                    <Input></Input>
                                    <p class="tips">只能填写数字，最多两位小数，最低不能对于5</p>
                                </td>
                                <td>￥60.00</td>
                            </tr>
                            <tr>
                                <td>颜色：红色</td>
                                <td>￥35.00</td>
                                <td>
                                    <Input></Input>
                                    <p class="tips">只能填写数字，最多两位小数，最低不能对于5</p>
                                </td>
                                <td>￥60.00</td>
                            </tr>
                            <tr>
                                <td>颜色：黄色</td>
                                <td>￥35.00</td>
                                <td>
                                    <Input></Input>
                                    <p class="tips">只能填写数字，最多两位小数，最低不能对于5</p>
                                </td>
                                <td>￥60.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Row>
        </div>
        <div class="button-section">
            <Button type="primary" @click="handleSubmit">保存</Button>
            <Button>取消</Button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DistributionSetForm',
    data () {

        return {
            formItem:{
                price:'',
                prefix:'',
                beginTime:'',
                endTime:'',
                limitNum:'',
                sellNum:'',
            },
            // ruleValidate: {
            //     price: [
            //         { validator: validatePrice, trigger: 'blur' }
            //     ],
            //     beginTime: [
            //         { required: true, type: 'date', message: '请选择开始时间', trigger: 'change' },
            //     ],
            //     endTime: [
            //         { required: true, type: 'date', message: '请选择结束时间', trigger: 'change' }
            //     ],
            //     limitNum: [
            //         { required: true, message: '请输入限购数',pattern: /.+/ ,trigger: 'blur'},
            //         { type: 'integer', message: '必须为数字值'}  
            //     ],
            //     sellNum: [
            //         { required: true,  message: '请输入秒杀总件数', pattern: /.+/ , trigger: 'blur' },
            //         { type: 'integer', message: '必须为数字值', trigger: 'blur' }
            //     ]
            // }
        }
    },
    methods: {
        handleSearch () {
            
        },
        redirectToPage(){
            this.$router.push({
                name: 'SeckillingGoodsList',
            });
        },
        redirectToSetting(){
            this.$router.push({
                name: 'SeckillingGoodsList',
            });
        },
        handleCancelSeckill(){
            this.$Modal.confirm({
                title: '温馨提示',
                width: "500px",
                content: '<p style="font-size:14px; margin-bottom:30px;">确定取消商品的秒杀吗?</p><p style="font-size:14px; color:#ff776d">注：取消后秒杀活动自动结束，已下单的秒杀商品价格不受影响?</p>',
                onOk: () => {
                    this.$Message.success('删除成功！');
                }
            });
        },
        handleSubmit  (){
            this.$refs['formItem'].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        rowClassName (row,index) {
            if(index%2 == 0){
                return 'even';
            }
            else{
                return 'odd';
            }
        },
        getTableData() {
            let data = [];
            for (let i = 0; i < 10; i++) {
                if(i % 3 == 0){
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 200 + 1),
                        seckillPrice: Math.floor(Math.random () * 30 + 1),
                        activityTime: '2017-07-09~2017-08-19' ,
                        activityStatus: 1,
                        sellNum: Math.floor(Math.random () * 5662 + i),
                        seckillTotal:i+10
                    })
                }
                else if(i % 3 == 1){
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'MAC/魅可子弹头口红正品唇膏chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 200 + 1),
                        seckillPrice: Math.floor(Math.random () * 30 + 1),
                        activityTime: '2017-07-09~2017-08-19' ,
                        activityStatus: 2,
                        sellNum: Math.floor(Math.random () * 5662 + i),
                        seckillTotal:i+10
                    })
                }
                else{
                    data.push({
                        id: i,
                        goodsImg:'https://img10.360buyimg.com/n1/jfs/t10768/243/1809311216/472100/e26469b/59e6c14fN9fc8e0d8.jpg',
                        name: 'chili小辣椒西柚色人鱼姬豆沙色mocha' + Math.floor(Math.random () * 3 + 1),
                        price: Math.floor(Math.random () * 200 + 1),
                        seckillPrice: Math.floor(Math.random () * 30 + 1),
                        activityTime: '2017-08-09~2017-09-19' ,
                        activityStatus: 0,
                        sellNum: Math.floor(Math.random () * 5662 + i),
                        seckillTotal:i+10
                    })
                }
                
            }
            return data;
        },
        changePage() {
            
        },
        handleListStatus(status){
            this.listTabStyle = status;
        },
        recommendGoods(json,event) {
            if(json.recommendStatus == 0){
                event.target.innerText = '取消推荐';
                this.$Message.success('商品已成功推荐至首页！');
            }
            else{
                event.target.innerText = '推荐';
                this.$Message.success('商品已取消推荐！');
            }
        },
        redirectToEdit(title,id){
            if(title == 'add'){
                this.$router.push({
                    name: 'AddServiceGoods',
                    query: { t: title }
                });
            }
            else{
                this.$router.push({
                    name: 'AddServiceGoods',
                    query: { t: title, id:id }
                });
            }
        },
        // 改变商品上下架状态
        handleSaleStatus(json,event){
            if(json.saleStatus == 0){
                event.target.innerText = '下架';
                this.$Message.success('商品已上架！');
            }
            else{
                event.target.innerText = '上架';
                this.$Message.success('商品已下架！');
            }
        },
    },
    mounted () {
    }
};
</script>
