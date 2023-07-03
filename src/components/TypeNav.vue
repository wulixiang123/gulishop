<template>
  <div class="type-nav">
    <div class="container">
      <div class="nav-left" @mouseleave="endShowHandler">
        <h2 class="all" @mouseenter="isShow = true">全部商品分类</h2>
        <transition>
          <div class="sort" v-if="isShow" @click="toSearch">
          <div class="all-sort-list2">
            <div class="item" :class="{item_on:activeIndex == index}" v-for="(c1,index) in categoryList" :key="c1.categoryId" @mouseenter="mouseItemHandler(index)" @mouseleave="activeIndex = -1">
              <h3>
                <a href="javascript:;" :data-category1Id="c1.categoryId" :data-categoryName="c1.categoryName">{{ c1.categoryName }}</a>
                <!-- <a href="">{{ c1.categoryName }}</a> -->
              </h3>
              <div class="item-list clearfix" v-show="activeIndex == index">
                <div class="subitem">
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a href="javascript:;" :data-category2Id="c2.categoryId" :data-categoryName="c2.categoryName">{{ c2.categoryName }}</a>
                      <!-- <a href="">{{ c2.categoryName }}</a> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a href="javascript:;" :data-category3Id="c3.categoryId" :data-categoryName="c3.categoryName">{{ c3.categoryName }}</a>
                        <!-- <a href="">{{ c3.categoryName }}</a> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
        
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, } from 'vuex'
import _ from 'lodash'
export default {
  name: "TypeNav",
  data(){
    return{
      activeIndex:-1,
      isShow:true//默认首页展示
    }
  },
  mounted(){
    if(this.$route.path !== '/home'){
      this.isShow = false
    }
  },
  methods:{

    toSearch(e){
      console.dir(e.target);
      console.log(e.target.dataset);
      if(e.target.nodeName == 'A'){
        const {category1id,category2id,category3id,categoryname}=e.target.dataset
        let query = {}
        category1id ? query.category1id = category1id:''
        category2id ? query.category2id = category2id:''
        category3id ? query.category3id = category3id:''
        query.categoryName = categoryname
        this.$router.push({
          path:'/search',
          query
        })
      }
    },

    endShowHandler(){
      if(this.$route.path !== '/home'){
        this.isShow = false
      }
    },
    mouseItemHandler:_.throttle(function(index){
      this.activeIndex = index
      // console.log(index);
    },20,{
      leading:true,
      trailing:false
    })
  },
  computed:{
    ...mapState({
      categoryList:state => state.home.categoryList
    })
  }
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #f64d44;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 650px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
          &.item_on {
            background: #f87d77;
          }
        }
      }
    }
    .v-enter{
      height: 0;
      opacity: 0;
    }
    .v-enter-to{
      height: 461px;
      opacity: 1;
    }
    .v-enter-active{
      transition: all 0.5s;
    }
  }
}
</style>