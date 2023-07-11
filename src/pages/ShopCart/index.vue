<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cart in cartList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input 
            type="checkbox" 
            name="chk_list" 
            :checked="cart.isChecked" 
            @change="changeSkuCheck($event, cart)"
            :key="Date.now()"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice?.toFixed(2) }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeSkuNum(cart,-1)">-</a>
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="changeSkuNumHandler(cart,$event.target.value)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeSkuNum(cart,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ (cart.skuNum * cart.skuPrice)?.toFixed(2) }}</span>
          </li>
          <li class="cart-list-con7">
            <a
             href="javascript:;" 
             class="sindelet"
             @click.prevent="deleteHandler(cart)"
             >删除</a>
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isSelAll" @change="changeCheckAll"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCartSel">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{ selCount }}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalAmount }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 1. 静态搭建
//    定义、注册(路由注册)、使用(两个入口: 添加购物车成功页面、header一个入口)
// 2. 初始化数据展示
//    2.1 api准备
//    2.2 三连环
//    2.3 页面初始化的时候调用actions拿数据
//      发现问题: 没有数据回来,为什么?
//      因为后端不知道你是谁,所以不知道给你返回哪个购物车中的东西
//      购物车思路:
//        1. 天猫,只要点页面,就得登录(目的:为了防止数据的爬取)
//        2. 京东,当点击"加入购物车"此时必须登录
//        3. 亚马逊,点击"加入购物车",跳转添加购物车成功页面,前往购物车页面,可以看到购物车中的商品
//          注意: 此时是没有登录
//    2.4 展示数据
//        2.4.1 直接展示 - 拿着store中的数据直接循环展示
//        2.4.2 计算展示 - 全选状态、选中个数、总价
// 3. 交互
//    3.1 商品的选中状态
//        api准备
//        三连环(一连环,只写一个actions即可)
//        点击商品的选中状态,调用actions
//    3.2 删除商品
//    3.3 商品数量的修改(小心一点)
//    3.4 全选、全不选
//    3.5 删除选中商品
//    3.6 结算
import { mapActions, mapState } from 'vuex';
export default {
  name: "ShopCart",
  computed: {
    ...mapState('cart', ['cartList']),
    // 全选状态
    isSelAll() {
      return this.cartList.every(cart => cart.isChecked) && this.cartList.length
    },
    // 选中个数
    selCount() {
      return this.cartList.reduce((prev, cart) => {
        //            数量        * 选中状态
        return prev + cart.skuNum * cart.isChecked
      }, 0)
    },
    // 总价
    totalAmount() {
      return this.cartList.reduce((prev, cart) => {
        //            数量        *  单价          * 选中状态
        return prev + cart.skuNum * cart.skuPrice * cart.isChecked
      }, 0)
    }
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    ...mapActions('cart', ['getCartList', 'checkCart','deleteCart','addCart','batchCheckAll','batchDeleteSel']),
    // 删除选中
    async deleteCartSel(){
      let skuIdList = this.cartList.filter(cart => cart.isChecked).map(cart => cart.skuId)
      try {
        await this.batchDeleteSel(skuIdList)
        alert('批量删除成功')
        this.getCartList()
      } catch (error) {
        console.error(error)
        alert('批量删除失败')
      }
    },
    // 全部选中
    async changeCheckAll(e){
      console.log(e.target.checked);
      // 所有商品的id列表
      let skuIdList = this.cartList.map(cart => cart.skuId)
      console.log(skuIdList);
      try {
        await this.batchCheckAll({
          isChecked:+e.target.checked,//转成数值
          skuIdList
        })
        alert('修改全部商品选中状态成功')
        this.getCartList()//刷新页面数据
      } catch (error) {
        console.error(error);
        alert('修改全部商品选中状态失败')
      }
    },
    // input框修改商品数量
    async changeSkuNumHandler(cart,num){// num 注意是输入的值
      // input框不允许输入 小数、字符串、负数 和 0 正则校验
      let reg = /^[1-9]\d*$/
      if(!reg.test(num)){
        this.$forceUpdate()//强制刷新
        alert('输入的商品数量不符合要求,请重新输入')
        return
      }
      this.changeSkuNum(cart,num - cart.skuNum)
    },
    // 加减按钮修改商品数量
    async changeSkuNum(cart,num){
      if(cart.skuNum + num < 1){
        alert('商品数量不能小于1')
        return
      }
      try {
        await this.addCart({
          skuId:cart.skuId,
          skuNum:num
        })
        alert('修改数量成功')
        // 重新获取数据,渲染列表
        this.getCartList()
      } catch (error) {
        console.error(error);
        alert('修改商品数量失败')
      }
    },
    // 删除商品
    async deleteHandler(cart){
      try {
        await this.deleteCart(cart.skuId)
        this.getCartList()// 重新获取数据,渲染页面
      } catch (error) {
        alert('删除失败')
      }
    },

    // 商品的选中状态
    async changeSkuCheck(e, cartInfo) {
      try {
        await this.checkCart({
          skuId: cartInfo.skuId,
          // skuId: "qweer",
          isChecked: +e.target.checked // +的目的是为了把布尔值转成数值
        })
      } catch (error) {
        alert('选中失败,请重试')
        // 当没有网络的时候,选中失败
        // 选中失败在这里使用try...catch可以让页面不报错
        // 我们自己捕获到这个错误,进行处理,给用户提示
        // 然后需要把之前取消选中的操作复原,如何做?
        this.$forceUpdate()
      }
        
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>