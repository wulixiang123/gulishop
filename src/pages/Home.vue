<template>
  <div class="home">
    <type-nav></type-nav>
    <list-container></list-container>
  </div>
</template>

<script>
import ListContainer from './ListContainer.vue'
import TypeNav from '../components/TypeNav.vue'
export default {
  components: { TypeNav, ListContainer },
name:'Home'
}
</script>

<style>

</style>