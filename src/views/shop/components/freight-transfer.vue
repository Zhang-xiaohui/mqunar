<style lang="less">

</style>

<template>
    <div>
        <Transfer
            :data="data"
            :target-keys="targetKeys"
            :titles="['选择区域','已选区域']"
            :operations="['移除','添加']"
            :list-style="style"
            filterable
            :filter-method="filterMethod"
            @on-change="changeKey"
            >
        </Transfer>
    </div>
</template>

<script>
export default {
    name: 'FreightTransfer',
    props: {
        data: Array,
        targetKeys: {
            type: Array,
            default:[]
        }
    },
    data (){
        return {
            style:{
                width: '250px',
                height: '300px'
            },
        }
    },
    methods: {
        changeKey (newTargetKeys, direction, moveKeys) {
            // console.log(newTargetKeys);
            // console.log(direction);
            // console.log(moveKeys);
            
            this.$emit('on-changed', newTargetKeys);
        },
        filterMethod (data, query) {
            return data.label.indexOf(query) > -1;
        }
    }
};
</script>
