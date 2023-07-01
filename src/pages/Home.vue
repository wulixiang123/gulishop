<template>
  <div class="home">
    <type-nav></type-nav>
    <list-container></list-container>
    <recommend></recommend>
    <Rank></Rank>
    <like></like>
  </div>
</template>

<script>
import ListContainer from './ListContainer.vue'
import TypeNav from '../components/TypeNav.vue'
import Recommend from './Recommend.vue'
import Rank from './Rank.vue'
import Like from './Like.vue'
export default {
  components: { TypeNav, ListContainer,Recommend,Rank, Like, },
name:'Home'
}
</script>

<style>

</style>