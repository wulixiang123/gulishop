<template>
    <div class="box">
        <h4>孙组件标题</h4>
        <div>dream1: {{ dream1 }}</div>
        <div>dream2.name: {{ dream2.name }}</div>
    </div>
</template>

<script>
export default {
    name: "GrandChild",
    inject: ['dream1', 'dream2']
};
</script>
