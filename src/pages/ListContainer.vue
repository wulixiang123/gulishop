<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <swiper-list :list="bannerList"></swiper-list>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="../components//images//ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// swiper轮播图步骤
// 1. 安装
//    npm i swiper@6
// 2. 引入
//    需要引入 swiper-bundle.min.js 和 swiper-bundle.min.css
// 引入的是不是我们需要的js文件?
// import Swiper from 'swiper' --> 这个引入的不是我们想要的文件
// 找node_modules下的swiper包,这个包下的package.json中配置的main属性,就是默认引入的文件
// 我们查看之后发现 main: "swiper.cjs.js" 不是官网告诉我们的 swiper-bundle.min.js
// 所以我们需要单独自己引入
// import Swiper from 'swiper/swiper-bundle.min.js'
// import 'swiper/swiper-bundle.min.css'
// 3. 准备DOM
//    已存在,不需要我们自己写
// 4. 初始化实例
//    在挂载完之后才能获取到DOM结构
// 遇到的问题:
// 只要页面改动一点点保存,轮播图就好使,但是刷新就是不好使
// 原因: 因为发请求是异步的,当调用 this.$store.dispatch('getBannerList') 此时去发请求
//      发完请求,请求是异步,数据还没有回来的时候调用的 this.initSwiper()
//      此时去初始化swiper实例了, 而初始化swiper实例的时候需要DOM结构
//      数据没回来,DOM渲染不完全
//      等数据来之后,渲染DOM完成之后,已经创建了swiper实例,所以不好使
// 解决方案:
// 1. 定时器:
//    setTimeout(() => {
//      this.initSwiper()
//    }, 500)
//    问题: 不确定请求什么时候回来
// 2. updated
//    问题: 只要数据变化都会执行 updated
// 3. watch + $nextTick
//    watch监听保证数据回来
//    数据回来之后,要更新页面,更新页面是异步的,我们需要等待页面的更新完毕之后再调用 initSwiper
//    此时需要等待DOM的更新,
//    $nextTick  -->  在修改数据之后立即使用它，然后等待 DOM 更新
import { mapState } from 'vuex';
import SwiperList from '../components/SwiperList.vue';
export default {
  components: { SwiperList },
  name: "ListContainer",
  // data(){
  //   return {
  //     mySwiper:null
  //   }
  // },
  mounted(){
    this.$store.dispatch('getBannerList')
   
  },
  // watch:{
  //   bannerList:{
  //     handler(navl){
  //       if(navl && navl.length){
  //         this.$nextTick(()=>{
  //           this.initSwiper()
  //         })
  //       }
  //     }
  //   }
  // },
  // methods:{
  //   initSwiper(){
  //     this.mySwiper = new Swiper('.swiper-container',{
  //       loop:true,//循环模式选项
  //       // 如果需要分页器
  //       pagination:{
  //         el:'.swiper-pagination'
  //       },
  //       pagination:{
  //         el:'.swiper-pagination',
  //       },
  //       navigation:{
  //         nextEl:'.swiper-button-next',
  //         prevEl: '.swiper-button-prev',
  //       }
  //     })
  //   }
  // },
  computed:{//计算属性
    ...mapState({
      bannerList:state => state.home.bannerList
    })
  }
};
</script>

<style scoped lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url('@/assets/images/icons.png');
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>