<template>
  <div class="spec-preview">
    <img :src="currentImg?.imgUrl" />
    <div class="event" 
    ref="eventRef"
    @mouseenter="isShow = true"
    @mouseleave="isShow = false"
    @mousemove="moveHandler"
    ></div>
    <div class="big" v-show="isShow">
      <img :src="currentImg?.imgUrl" ref="bigRef"/>
    </div>
    <div class="mask" v-show="isShow" ref="maskRef"></div>
  </div>
</template>

<script>
// 放大镜交互
// 鼠标移动,mask蒙版跟着一块动
// 1. 获取到鼠标位置
// 2. 蒙版跟着鼠标动,给蒙版设置位置(ref获取到蒙版)
//    蒙版坐上角位置 = 鼠标位置 - 蒙版盒子的宽度的一般
//    得到蒙版左上角的位置给蒙版设置的时候,需要考虑边界条件
// 3. 大图也要跟着动
//    大图和蒙版移动位置是 -2 倍的关系
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data(){
      return{
        isShow:false
      }
    },
    computed:{
      currentImg(){
        return this.skuImageList[0]
      }
    },
    methods:{
      moveHandler(e){
      // console.log(e);
      // #region
      // clientX & clientY
      // 拿的是鼠标相对视口的水平距离和垂直距离，相对的是视口的左上角（以视口左上角为原点）
      // pageX & pageY
      // 拿的是鼠标相对页面的水平距离和垂直距离，相对的是页面的左上角（以页面左上角为原点）
      // offsetX & offsetY
      // 拿的是鼠标相对自身元素的水平距离和垂直距离，相对的是自身元素左上角（以自身元素左上角为原点）
      // #endregion

      // start拿到鼠标的起始位置
        let startX = e.offsetX
        let startY = e.offsetY

      // #region
      // **clientWidth**
      // **拿的是盒子   内容 + padding的宽；**
      // **clientHeight**
      // **拿的是盒子   内容 + padding的高；**

      // **offsetWidth**
      // **拿的是盒子   内容 + padding + border的宽**
      // **offsetHeight**
      // **拿的是盒子   内容 + padding + border的高**
      // #endregion

      // this.$refs.maskRef.clientWidth / 2  --> 宽度的一半
      // this.$refs.maskRef.clientHeight / 2  --> 高度的一半

      // 计算蒙版左上角的位置
      let endX = startX - this.$refs.maskRef.clientWidth / 2
      let endY = startY - this.$refs.maskRef.clientHeight / 2

      // 水平方向边界判断
      if(endX < 0){
        endX = 0
      }
      if(endX > this.$refs.eventRef.clientWidth - this.$refs.maskRef.clientWidth){
        endX = this.$refs.eventRef.clientWidth - this.$refs.maskRef.clientWidth
      }
      // 垂直方向判断
      if(endY < 0){
        endY = 0
      }
      if(endY > this.$refs.eventRef.clientHeight - this.$refs.maskRef.clientHeight){
        endY = this.$refs.eventRef.clientHeight - this.$refs.maskRef.clientHeight
      }

      this.$refs.maskRef.style.left = endX + 'px'
      this.$refs.maskRef.style.top = endY + 'px'

      this.$refs.bigRef.style.left = -2 * endX + 'px'
      this.$refs.bigRef.style.top = -2 * endY + 'px'
      }
    }
  }
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    // display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    // display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  // .event:hover ~ .mask,
  // .event:hover ~ .big {
  //   display: block;
  // }
}
</style>