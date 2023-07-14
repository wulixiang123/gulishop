<template>
    <div class="box">
        <h1>v-model</h1>
        
        <div>keywrod: {{ keywrod }}</div>
        <input type="text" v-model="keywrod">
        <!-- 问: 如果不使用 v-model 能不能实现和 v-model 一样的效果(双向数据绑定) -->
        <br><br>
        <!--
            @input 事件,当输入的内容发生变化立即执行回调
            @change 内容变化且失焦
            @blur 失焦
        -->
        <!--
        <input type="text" :value="keywrod" @input="inputHandler">
        inputHandler(e) {
            this.keywrod = e.target.value
        }
        -->
        <input type="text" :value="keywrod" @input="keywrod = $event.target.value">

        <!--
            组件能不能实现类似于 v-model 的效果

            数据流向:
            1. 父把keyword通过props的value属性传递给子组件,子组件可以展示
            2. 子组件中修改input框中的文本内容,通过自定义事件传给父组件,此时父组件就能拿到最新数据
            3. 父组件拿到数据之后赋值给keyword,此时keyword发生改变,重新通过props的value属性传给子组件
            

        -->

        <!--
            <CustomInput :value="keywrod" @input="xxxHandler"></CustomInput>
            xxxHandler(val) {
                this.keywrod = val
            }
        -->
        <CustomInput :value="keywrod" @input="keywrod = $event"></CustomInput>

        <br><br>

        <CustomInput v-model="keywrod"></CustomInput>


        <!--
            结论:
            组件可以使用v-model
            组件使用v-model的时候,组件必须实现 :value 和 @input 这两个条件(缺一不可)
            
            组件的v-model是父子组件间的数据同步
        -->

    </div>
</template>

<script>
import CustomInput from './CustomInput'
export default {
    name: "ModelTest",
    components: { CustomInput },
    data() {
        return {
            keywrod: '我爱你'
        }
    },
}
</script>

<style scoped>

</style>