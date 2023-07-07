<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span href="#">全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级分类面包屑 -->
            <li class="with-x"
            v-if="searchParams.categoryName"
            >{{ searchParams.categoryName }}<i @click="removeCategory">×</i></li>
            <!-- 搜索面包屑 -->
            <li class="with-x"
            v-if="searchParams.keyword"
            >{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌展示 -->
            <li class="with-x"
            v-if="searchParams.trademark"
            >{{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 平台属性 -->
            <li class="with-x"
            v-if="searchParams.props.length"
            v-for="(attr,index) in searchParams.props"
            >{{ attr.split(':')[1] }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!-- 搜索器 -->
        <!-- <SearchSelector /> -->
        <search-selector 
        @changeTrademark="changeTrademark"
        @changeProps="changeProps"
        ></search-selector>

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="searchParams.order.split(':')[0] == '1' && 'active'">
                  <a href="javascript:;" @click="orderHandler(1)">
                    <span>综合</span>
                    <span
                    v-if="searchParams.order.split(':')[0] == '1'"
                    class="iconfont"
                    :class="{
                      'icon-jiantou_xiangxia':searchParams.order.split(':')[1] == 'desc',
                      'icon-jiantou_xiangshang':searchParams.order.split(':')[1] == 'asc'
                    }"
                    ></span>
                  </a>
                </li>
                <!-- <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li> -->
                <li :class="{
                  active:searchParams.order.split(':')[0] == '2'
                }">
                  <a href="javascript:;" @click="orderHandler(2)">
                    <span>价格</span>
                  <span
                  v-if="searchParams.order.split(':')[0] == '2'"
                  class="iconfont"
                  :class="{
                    'icon-jiantou_xiangshang':searchParams.order.split(':')[1] == 'desc',
                    'icon-jiantou_xiangxia':searchParams.order.split(':')[1] == 'asc'
                  }"
                  ></span>
                  </a>
                  
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5"
              v
              v-for="goods in goodsList"
              :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="javascript:;"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price.toFixed(2) }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="javascript:;"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--
            分页器
            当前页 -- 高亮使用,计算使用
            每页条数  -- 用于计算
            总条数  --  直接展示
            连续数 -- 连续展示几个数  一般是奇数3  5  7
            注意: 这里的总页面我们通过计算得出    总页码 = 向上取整(总条数/每页条数)
            :pageNo="searchParams.pageNo"
          -->
          <pagination 
            :pageNo="30"
            :pageSize="searchParams.pageSize"
            :total="total"
            :count="5"
            >

          </pagination>
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 写页面步骤
// 1. 搭建静态(直接把组件粘贴过来-去"静态组件"文件夹中去找)
// 2. 初始化数据展示
//    2.1 api准备
//    2.2 三连环
//    2.3 mounted调用接口拿数据
//        注意: 发请求的时候,一定要有一个参数,空对象也行,否则后端不给数据
//    2.4 展示数据
// 问题: 想要显示 goodsList.length 会报错,因为数据还没回来,此时state中的searchData是空对象
//      searchData.goodsList是undefined,  那么页面computed映射过来的goodsList也是und
//      goodsList.length  就相当于是 undefined.length 所以报错
//      问:  a.b 会有几种情况?(面试题)
//      a如果是Number类型 --> 点任何内容的时候,会转成包装对象,然后去点一个属性 -->  如果有b这个属性,就是b这个属性,没有就是und
//      a如果是Boolean类型 -->点任何内容的时候,会转成包装对象,然后去点一个属性 -->  如果有b这个属性,就是b这个属性,没有就是und
//      a如果是String类型 --> 点任何内容的时候,会转成包装对象,然后去点一个属性 -->  如果有b这个属性,就是b这个属性,没有就是und
//      a如果是undefined  ->  报错
//      a如果是null       ->  报错
//      a如果是对象 -> 如果有b属性则就是这个属性,如果没有就是und
//      a如果是数组 -> 如果有b属性则就是这个属性,如果没有就是und
//      a如果是函数 -> 如果有b属性则就是这个属性,如果没有就是und
// 3. 交互
// 需要先知道参数的意义,然后再写交互
//    先看一下线上的请求,把请求整明白之后,写代码(正常情况下应该去看接口文档)
//    请求:
//      {
//        "category1Id": "2",   ---> 三级分类
//        "categoryName": "手机",  --->  三级分类
//        "keyword": "aa", --->  搜索框数据
//        "trademark": "", --->  品牌   实例: "2:小米"  2是品牌ID  小米是品牌名称
//        "props": [], ---> 平台属性筛选
//        "order": "1:desc", ---> 排序  1是综合 2是价格  asc是升序 desc降序
//        "pageNo": 1, // 当前页  --> 翻页
//        "pageSize": 2, // 每页条数
//      }
//    3.1 三级分类的点击
//        点击三级分类,通过事件委派改变的是路由参数,只要路由的query参数发生变化,那么一定是点击了三级分类
//        watch监听路由,当路由的参数发生变化的时候,发请求
//        面包屑交互
//        判断searchParmas中有没有参数,有就展示,没有就隐藏
//        删除面包屑 -->  重新跳转当前要全面,把query参数干掉,重新去组装数据,发送请求
//    3.2 搜索点击
//        组装数据
//        发送请求
//        由于这个过程和3.1几乎一模一样,所以直接再3.1的代码中加上 搜索的组装数据、发送请求的代码
//        面包屑(也是一样)
//    3.3 品牌点击
//        品牌在 SearchSelector 组件中,当点击品牌的时候需要组装数据,发送请求
//        组装的数据是在 Search 组件中的 searchParams
//        子组件修改父组件数据用 自定义事件,改完发请求,拿数据即可,重新渲染页面
//        面包屑
//        判断 searchParmas 中  trademark 字段有没有值,有值展示
//        点击删除 - 组装数据(searchParams.trademark 删除)、发送请求
//    3.4 平台属性筛选
//        在 SearchSelector 当中,组装数据、发送请求
//        修改Search组件的 searchParams.props，用自定义事件
//    3.5 优化:
//        需求: 在search页,点击后退,必须后退到home页
//        思路: 首页跳转搜索页,要历史记录
//              在搜索页内部跳转的不能有历史记录
//              1. 三级分类  -  点击就会跳转页面,目前跳转使用的是push
//                   可以在首页点击    ----    push
//                   可以在搜索页点击  ----    replace
//              2. header  --  点击搜索就会跳转页面.目前跳转使用的是push
//                   可以在首页点击    ----    点击的时候使用push
//                   可以在搜索页点击  ----    点击的时候使用replace
//              3. 点击 删除三级分类 和 删除搜索 面包屑,都是通过重新跳转到当前页面做的
//                  删除三级分类 --  重新跳转到当前页,把query参数去掉
//                  删除搜索     --  重新跳转到当前页,把params参数去掉
//                  现在目前重新跳转用的push,应该没有历史记录,用replace
//    3.6 排序
//        先把数据整理清楚,在展示页面
//        3.6.1 数据层
//            默认发请求的时候,就携带的参数  "1:desc"  1代表综合 2代表价格 desc代表降序 asc代表升序
//            总共就4中排列组合  "1:desc"综合降序  "1:asc"综合升序   "2:desc"价格降序   "2:asc"价格升序
//            
//        3.6.2 展示层
//    3.7 翻页
import SearchSelector from './SearchSelector.vue';
import {mapActions,mapGetters} from 'vuex'
import Pagination from '../components/Pagination.vue';
export default {
  name: "Search",
  components: {
    SearchSelector,
    Pagination
  },
  data(){
    return{
      // 发请求携带的参数
      searchParams:{
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '', // 搜索框
        trademark: '', // 品牌
        props: [], // 平台属性
        order: '1:desc',  // 默认 "1:desc" 综合:降序
        pageNo: 1,
        pageSize: 2
      }
    }
  },
  computed:{
    ...mapGetters('search',['goodsList','total'])
  },
  watch:{
    $route:{
      handler(navl){
        this.receiveRouteData()//组装数据
        this.getSearchData(this.searchParams)//发送请求
      },
      immediate:true,
      deep:true
    }
  },
  methods:{
    ...mapActions('search',['getSearchData']),
    // 三级分类组装数据
    receiveRouteData(){
      const {category1Id,category2Id,category3Id,categoryName} = this.$route.query
      this.searchParams.category1Id = category1Id
      this.searchParams.category2Id = category2Id
      this.searchParams.category3Id = category3Id
      this.searchParams.categoryName = categoryName
      // 注意: 请求参数中如果是undefined,axios就不会给我们携带参数

      const {keyword} = this.$route.params// 搜索组装数据
      this.searchParams.keyword = keyword
    },
     // 删除三级分类
    removeCategory(){
      // 直接删除的问题是: 路由的参数没有干掉
      // this.searchParams.category1Id = undefined
      // this.searchParams.categoryName = undefined
      // 应该把路由参数也干掉
      // 重新跳转当前要全面,把query参数干掉,重新去组装数据,发送请求
      this.$router.push({
        name:'Search',
        params:this.$route.params
      })
    },
    // 删除搜索
    removeKeyword(){
      // 和三级分类删除一样,干掉params参数(重新跳转干掉)
      this.$router.push({
        name:'Search',
        query:this.$route.query
      })
    },
    // 品牌点击
    changeTrademark(tm){
      // 组装数据
      this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`
      // 发送请求
      this.getSearchData(this.searchParams)
    },
    // 删除品牌面包屑
    removeTrademark(){
      // 组装数据
      this.searchParams.trademark = ''
      // 发送请求
      this.getSearchData(this.searchParams)
    },
    // 平台属性点击
    changeProps(attr,attrValue){
      // 组装数据
      let text = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 重复校验
      if(this.searchParams.props.includes(text)){
        return
      }
      this.searchParams.props.push(text)
      // 发送请求
      this.getSearchData(this.searchParams)
    },
    // 删除平台属性面包屑
    removeAttr(index){
      // 组装数据
      this.searchParams.props.splice(index,1)
      // 发送请求
      this.getSearchData(this.searchParams)
    },
    // 点击排序
    orderHandler(type){
      let text = ''
      let [orderType,orderRank] = this.searchParams.order.split(':')
      if(type == orderType){
        if(orderRank == 'desc'){
          text = `${orderType}:asc`
        }else{
          text = `${orderType}:desc`
        }
      }else{
        text = `${type}:desc`
      }
      this.searchParams.order = text
      this.getSearchData(this.searchParams)
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>