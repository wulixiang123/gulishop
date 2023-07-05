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
                <!-- <router-link :to=" `/search?category1Id=${ c1.categoryId }&categoryName=${ c1.categoryName }` ">{{ c1.categoryName }}</router-link> -->
                <!-- <a href="javascript:;" @click="$router.push(`/search?category1Id=${ c1.categoryId }&categoryName=${ c1.categoryName }`)">{{ c1.categoryName }}</a> -->
              </h3>
              <div class="item-list clearfix" v-show="activeIndex == index">
                <div class="subitem">
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a href="javascript:;" :data-category2Id="c2.categoryId" :data-categoryName="c2.categoryName">{{ c2.categoryName }}</a>
                      <!-- <router-link :to=" `/search?category2Id=${ c2.categoryId }&categoryName=${ c2.categoryName }` ">{{ c2.categoryName }}</router-link> -->
                      <!-- <a href="javascript:;" @click="$router.push(`/search?category2Id=${ c2.categoryId }&categoryName=${ c2.categoryName }`)">{{ c2.categoryName }}</a> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a href="javascript:;" :data-category3Id="c3.categoryId" :data-categoryName="c3.categoryName">{{ c3.categoryName }}</a>
                        <!-- <router-link :to=" `/search?category3Id=${ c3.categoryId }&categoryName=${ c3.categoryName }` ">{{ c3.categoryName }}</router-link> -->
                        <!-- <a href="javascript:;" @click="$router.push(`/search?category3Id=${ c3.categoryId }&categoryName=${ c3.categoryName }`)">{{ c3.categoryName }}</a> -->
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
// 需求1:
// ypeNav 展示 - 展示右侧列表 - 高亮
// 使用参考值思想，需要哪一个数据来记录下标，当记录的下标和实际item的下标一样的时候，展示右侧列表，高亮显示，高亮显示用的动态绑定class(3种方式)
// 需求2:
// TypeNav 跳转search页面隐藏 sort
//  整个三级分类使用一个变量 isShow 开控制显示隐藏，但是在首页不能隐藏，只在其他的页面隐藏
//  默认把这个数据设置成 true
//  判断当前路由如果不是 Home 让 isShow 变为 false
//  如果是 Home 鼠标移出的时候不能隐藏，也是通过路由判断
// 需求3:
//    鼠标移入过,下拉展示渡效果
//    1. 将需要过渡的内容放在 transition 标签中
//    2. 书写类名
//    3. 用一个变量控制显示隐藏
// 需求4:
//    TypeNav 快速移动鼠标,打印移入的下标,发现下标打印的不全,这是因为鼠标移动过快,计算机跟不上计算造成的.
//    使用防抖、节流解决
//    防抖节流是给函数的防抖和节流
//      防抖: 函数的多次执行变成一次执行
//      节流: 函数的多次执行变成少量执行
//    什么情况下会用到防抖节流:
//    1. 搜索框中,执行回调的时候进行防抖、节流
//    2. 抢购的时候也可进行防抖、节流
//    3. 轮播图 - 自己手写
//    4. 响应式页面 - 根据页面的宽度发生变化,页面中展示的内容结构发生变化
//    面试题: 手写防抖节流
//    在public中写的有
//    -----------------
//    给item的移入事件加节流
// 需求5:
// 点击三级分类进入search页面
// 点击一级:  /search?category1Id=2&categoryName=手机
// 点击二级:  /search?category2Id=13&categoryName=手机通讯
// 点击三级:  /search?category3Id=1&categoryName=电子书
// 现在我们需要给TypeNav的三级分类,添加跳转页面的功能,跳转到search,并且带参
// 解决:
// 方案一(否定):
//    跳转使用router-link在to属性中带参
//    存在的问题: 鼠标在三级分类中移入移出的时候,会有卡顿的效果,很不友好,为啥?
//    router-link是一个组件,每次使用一个router-link相当于在内存中new了一个实例
//    我们这里new了好几百个实例,这些组件在频繁的显示和隐藏,就会卡顿
//    不能使用router-link
// 方案二(可以使用,不是最优解):
//    可以改成编程式导航 $router.push()
//    此时改成编程式导航,效果已经很好了,移入右侧显示的效果已经非常跟手了
//    但是,还是不是最优解
//    因为循环的时候,给每个@click绑定的回调,是一个函数,相当于在内存中创建了好几百个函数,函数也是要占内存的
// 方案三:
//    事件委派 - 原理是用的事件冒泡
//        给祖先元素绑定点击事件,只要在这个祖先元素中点击的,最终事件都会冒泡到当前这个祖先元素
//        相当于给祖先元素绑定一个事件回调,就可以处理该元素内的所有点击事件
// 需求6:
//    单独点击三级分类进入search页面,没问题
//    单独点击搜索进入search页面,没问题
//    先点击三级分类,再点击搜索,会丢失掉三级分类的query参数,需要header组件中进行处理
//        如果有query参数也得携带上
//    先点击搜索,再点击三级分类,会丢失掉搜索得params参数,需要在TypeNav组件中进行处理
//        如果有params参数也得携带上(注意使用 name 和 params配合使用)
// 需求7:
//    我们发现:
//    Home切换到Search会发请求,Search切换到Home也会发请求
//    原因是 /a -> /b 路径改变得时候,组件也会随之得销毁和创建
//    我们现在发请求在Home和Search得mounted中发请求得
//    改到一个不会被销毁得组件即可,APP组件
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
    if(this.$route.path !== '/home'){// 不是首页,默认隐藏下拉列表
      this.isShow = false
    }
  },
  methods:{
    // 事件委派 - 跳转Search页面
    toSearch(e){
      console.dir(e.target);
      console.log(e.target.dataset);
      // |          | nodeType | nodeName   | nodeValue |
      // | -------- | -------- | ---------- | --------- |
      // | 元素节点  | 1        | 元素名大写  | null      |
      // | 文本节点  | 3        | #text      | 文本内容   |
      // | 属性节点  | 2        | 属性名      | 属性值    |
      // | 注释节点  | 8        | #comment   | 注释内容   |
      // <a href="javascript:;" aa='bb' data-cc="dd"  :category1Id="c1.categoryId">{{ c1.categoryName }}</a>
      // 自定义属性
      //    e.target.getAttribute('aa')
      // data- 携带参数
      //    e.target.dataset
      //    data-的带参形式,不支持大写,所有写在标签上的大写,在dataset对象中都会变成小写: 例如:
      //    category1Id  --->  category1id
      if(e.target.nodeName == 'A'){// 点击的是A标签,要跳转页面
        const {category1id,category2id,category3id,categoryname}=e.target.dataset
        let query = {}
        category1id ? query.category1Id = category1id:''
        category2id ? query.category2Id = category2id:''
        category3id ? query.category3Id = category3id:''
        query.categoryName = categoryname
        // 如果有params参数,不能丢失掉
        let location = {
          // path:'/search',
          name:'Search',// name和params可以配合使用
          query
        }
        if(this.$router.params){
         location.params = this.$route.params 
        }
        
        // 首页要历史记录,搜索页不要历史记录
        if(this.$route.path == '/home'){
          this.$router.push(location)
        }else{
          this.$router.replace(location)
        }
      }
    },
    // 鼠标移出隐藏sort
    endShowHandler(){
      if(this.$route.path !== '/home'){// 不是首,才能让列表隐藏
        this.isShow = false
      }
    },
    // 鼠标移入item的回调
    mouseItemHandler:_.throttle(function(index){
      this.activeIndex = index
      // console.log(index);
    },20,{
      leading:true,// 等待之前不调用
      trailing:false// 等待之后不调用
    })
    // 官网的配置项告诉我们,当我们不设置options的时候 leading 和 trailing 默认都为true
    // _.throttle(renewToken, 300000, {
    //   leading: true, // 先执行,后等待(等待之前调用)
    //   trailing: true // 先等待,后执行(等待之后调用)
    // })
  },
  computed:{//计算属性
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