<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>

      <div
        class="address clearFix"
        v-for="item in addressList"
        :key="item.id"
        @click="changeDefaultAddress(item, addressList)"
      >
        <span
          class="username"
          :class="{
            selected: item.isDefault == '1'
          }"
        >{{ item.consignee }}</span>
        <p>
          <span class="s1">{{ item.fullAddress }}</span>
          <span class="s2">{{ item.phoneNum }}</span>
          <span class="s3" v-if="item.isDefault == '1' ">默认地址</span>
        </p>
      </div>

      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">顺丰快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
          <!-- <p>配送时间：预计{{date}}送达</p> -->
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="item in detailArrayList"
          :key="item.skuId"
        >
          <li>
            <img :src="item.imgUrl" style="width: 60px;height: 60px;">
          </li>
          <li>
            <p>{{ item.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ item.orderPrice?.toFixed(2) }}</h3>
          </li>
          <li>X{{ item.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="remark"></textarea>

      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{ tradeInfo.totalNum }}</i>件商品，总商品金额</b>
          <span>¥{{ tradeInfo.totalAmount?.toFixed(2) }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>¥{{ tradeInfo.totalAmount?.toFixed(2) }}</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ defaultAddress.fullAddress }}</span>
        收货人：<span>{{ defaultAddress.consignee }}</span>
        <span>{{ defaultAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a href="javascript:;" class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
// 1. 静态页面搭建
//    定义、注册、使用(从"结算"跳转过来)
// 2. 初始化数据展示
//    api封装
//        获取交易信息
//        获取地址列表(写成mock,让我们可以用自己的账号有地址)
//    三连环
//    页面初始化mounted调用actions拿 tradeInfo 和 addressList 数据
//    展示数据:
//        地址列表(默认地址和高亮)
//        商品列表
//        总价和商品个数
//        配置地址(默认地址)
// 3. 交互
//    3.1 地址列表点击切换默认
//    3.2 收集备注
//    3.3 提交订单
//        api准备
//        点击"提交订单"调用api,api调用成功之后,代表创建订单成功
//        创建订单成功之后,跳转支付页面
import { mapActions, mapGetters, mapState } from 'vuex'
// import { reqSubmitOrder } from '@/api'
export default {
  name: 'Trade',
  data(){
    return{
      remark:'',//买家备注
    }
  },
  computed: {
    ...mapState('trade', ['addressList', 'tradeInfo']),
    ...mapGetters('trade', ['detailArrayList']),
    // 计算默认地址(默认地址就是配送地址)
    defaultAddress() {
      let ads = this.addressList.find(item => item.isDefault == '1')
      return ads || {}
    }
  },
  mounted() {
    this.getTradeInfo()
    this.getAddressList()
  },
  methods: {
    ...mapActions('trade', ['getTradeInfo', 'getAddressList']),
    // 修改默认地址 - 排他思想
    changeDefaultAddress(address, addressList) {
      addressList.forEach(item => item.isDefault = '0')
      address.isDefault = '1'
    },
    // 提交订单
    async submitOrder(){
      let data = {
        consignee: this.defaultAddress.consignee, // 默认地址(计算出来的)得到
        consigneeTel: this.defaultAddress.phoneNum, // 默认地址(计算出来的)得到
        deliveryAddress:  this.defaultAddress.fullAddress, // 默认地址(计算出来的)得到
        orderComment: this.remark, // 买家备注 - 数据是直接v-model收集
        orderDetailList: this.detailArrayList, // 商品列表
        paymentWay: "ONLINE" // 写死,在线支付
      }
      try {
        // let result = await reqSubmitOrder() // 这么做是没有问题的,但是我们不这么做,这么做每次用api的时候都需要引入
        let result = await this.$api.reqSubmitOrder(this.tradeInfo.tradeNo, data)
        if(result && result.code == 200){
          alert('提交订单成功,即将跳转支付页面')
          // 跳转页面 - 注意: result.data 是生成的订单号,需要携带到下一个支付页面,通过路由的query带参
          this.$router.push(`/pay?orderId=${result.data}`)
        }else{
          alert(`提交订单失败:${result.message}`);
          console.error(result);
        }
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>

<style lang="less" scoped>
  .trade-container {
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 21px;
    }

    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;

      .receive,
      .pay {
        line-height: 36px;
        margin: 18px 0;
      }

      .address {
        padding-left: 20px;
        margin-bottom: 15px;

        .username {
          float: left;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ddd;
          position: relative;
        }

        .username::after {
          content: "";
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(./images/choosed.png) no-repeat;
        }

        .username.selected {
          border-color: #e1251b;
        }

        .username.selected::after {
          display: block;
        }

        p {
          width: 610px;
          float: left;
          line-height: 30px;
          margin-left: 10px;
          padding-left: 5px;
          cursor: pointer;

          .s1 {
            float: left;

          }

          .s2 {
            float: left;
            margin: 0 5px;
          }

          .s3 {
            float: left;
            width: 56px;
            height: 24px;
            line-height: 24px;
            margin-left: 10px;
            background-color: #878787;
            color: #fff;
            margin-top: 3px;
            text-align: center;
          }
        }

        p:hover {
          background-color: #ddd;
        }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;

        h5 {
          line-height: 50px;
        }

        .info {
          margin-top: 20px;

          .s1 {
            float: left;
            border: 1px solid #ddd;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }

          p {
            line-height: 30px;
          }
        }
      }

      .detail {
        width: 1080px;

        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;

        h5 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: space-between;

          li {
            line-height: 30px;

            p {

              margin-bottom: 20px;
            }

            h4 {
              color: #c81623;
              font-weight: 400;
            }

            h3 {

              color: #e12228;
            }
          }
        }
      }

      .bbs {
        margin-bottom: 15px;

        h5 {
          line-height: 50px;
        }

        textarea {
          width: 100%;
          border-color: #e4e2e2;
          line-height: 1.8;
          outline: none;
          resize: none;
        }
      }

      .bill {
        h5 {
          line-height: 50px;
        }

        div {
          padding-left: 15px;
        }
      }
    }

    .money {
      width: 1200px;
      margin: 20px auto;

      ul {
        width: 220px;
        float: right;

        li {
          line-height: 30px;
          display: flex;
          justify-content: space-between;

          i {
            color: red;
          }
        }
      }
    }

    .trade {
      box-sizing: border-box;
      width: 1200px;
      padding: 10px;
      margin: 10px auto;
      text-align: right;
      background-color: #f4f4f4;
      border: 1px solid #ddd;

      div {
        line-height: 30px;
      }

      .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
      }

      .receiveInfo {
        color: #999;
      }
    }

    .sub {
      width: 1200px;
      margin: 0 auto 10px;

      .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;

      }
    }

  }
</style>