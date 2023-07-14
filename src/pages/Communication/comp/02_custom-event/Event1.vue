<template>
    <div class="box">
        <h2>Event1组件</h2>
        <span>其它内容</span>
        <button @click="$emit('qwer',111)">触发组件的自定义事件</button>
    </div>
</template>

<script>
export default{
    mounted(){
        setTimeout(()=>{
            this.$emit('click')
        },2000)
    }
}
</script>