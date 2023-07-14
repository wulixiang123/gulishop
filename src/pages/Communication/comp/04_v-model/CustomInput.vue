<template>
    <div class="box">
        <h3>CustomInput</h3>
        <div>value: {{ value }}</div>
        <input type="text" :value="value" @input="handler">
        <!-- <input type="text" :value="value" @input="$emit('input', $event.target.value)"> -->
    </div>
</template>

<script>
export default {
    name: 'CustomInput',
    props: ['value'],
    methods: {
        handler(e) {
            this.$emit('input', e.target.value)
        }
    }
}
</script>
