<style lang="less" scoped>
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>

<template>
    <Modal
        v-model="isModal"
        title="添加规格子项"
        @on-ok="modalOk"
        @on-cancel="modalCancel"
        width="400"
        class-name="vertical-center-modal">
        <Input v-model="value" placeholder="请填写规格子项"></Input>
    </Modal>
</template>

<script>
export default {
    name: 'GoodsForm',
    // props: {
    //     modalSpecValue:Boolean
    // },
    data (){
        return {
            isModal:false,
            value:''
        }
    },
    methods: {
        modalOk () {
            this.$emit('on-changed',this.value)
        },
        modalCancel (){
            this.value = "";
            this.$emit('on-changed','');
        },
        handleShow (status){
            this.isModal = status;
        }
    }
};
</script>
