<template>
  <div>
    <h3>Search</h3>
    <div>params:{{ $route.params.keyword }}</div>
    <div>query:{{ $route.query.text }}</div>
  </div>
</template>

<script>
export default {
name:'Search'
}
</script>

<style>

</style>