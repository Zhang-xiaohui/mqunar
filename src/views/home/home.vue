<style lang="less">
    @import "./home.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="15">
                <Card :bordered="false">
                    <p slot="title">自销营业额</p>
                    <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
            </Col>
            <Col :md="24" :lg="9">
                <Card :bordered="false">
                    <p slot="title">分销收入</p>
                    <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            //
        };
    }
};
</script>
