<template>
  <div class="home">
    <type-nav></type-nav>
    <list-container></list-container>
    <recommend></recommend>
    <Rank></Rank>
    <like></like>
    <floor></floor>
    <floor></floor>
    <brand></brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer.vue'
import TypeNav from '../components/TypeNav.vue'
import Recommend from './Recommend.vue'
import Rank from './Rank.vue'
import Like from './Like.vue'
import Floor from './Floor.vue'
import Brand from './Brand.vue'
export default {
  components: { TypeNav, ListContainer,Recommend,Rank, Like, Floor, Brand, },
name:'Home'
}
</script>

<style>

</style>