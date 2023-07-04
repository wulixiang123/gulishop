<template>
  <div class="swiper-container" ref="mySwiperRef" id="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
            v-for="(banner,index) in list"
            :key="banner.id"
            >
              <img :src="banner.imgUrl" />
            </div>
            <!-- <div class="swiper-slide">
              <img src="../components//images//banner2.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="../components//images//banner3.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="../components//images//banner4.jpg" /> -->
            <!-- </div> -->
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper-bundle.min.css'
export default {
name:'SwiperList',
props:{
    list:{
        type:Array,
        required:true
    },
    options:{
        type:Object,
        default(){
            return {
                autoplay:{
                    disableOnInteraction:false// 用户触摸swiper之后,继续自动播放
                },
                loop:true,// 循环模式选项

                pagination:{// 如果需要分页器
                    el: '.swiper-pagination',
                },
                navigation: {// 如果需要前进后退按钮
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            }
        }
    }
},
data(){
    return {
        mySwiper:null
    }
},
watch:{
    list:{
      handler(navl){
        if(navl && navl.length){
          // 在vue中,DOM的更新是异步的,数据回来之后,DOM才要开始更新
          // 等待DOM更新完毕之后,再执行我们想要执行的代码即可
          // $nextTick 传入一个回调,回调中的内容会在DOM更新完毕之后立即执行
          this.$nextTick(()=>{
            this.initSwiper()
          })
        }
      },
      immediate:true
    }
  },
  methods:{
    initSwiper() {
      // 类名不好说,万一页面中由多个,不确定选的是哪一个
      // this.mySwiper = new Swiper('.swiper-container', this.options)
      // $refs.mySwiperRef 是确定,一定是当前组件中
      this.mySwiper = new Swiper(this.$refs.mySwiperRef, this.options)
    }    
  }
}
</script>

<style>

</style>