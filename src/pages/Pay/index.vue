<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>145687</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥17,654</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:;" class="btn" @click="toPay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <img :src="imgUrl" alt=""> -->
  </div>
</template>

<script>
// #region
// 1. 静态页面搭建
//    定义、注册(路由注册)、使用(从交易页面提交订单成功之后使用 编程式 导航跳转到当前页)
//    注意: 跳转过来携带了query orderId参数(订单id),先拿到存起来,不确定后续有没有用
// 2. 初始化数据展示
//    api准备
//    初始化页面的时候调用api
//        展示的有 订单id 和 应付金额
//        点击"立即支付"是交互弹框
// 3. 交互
//    点击"立即支付"
//        1. 展示二维码
//            步骤:
//                1. 下载安装
//                    npm i qrcode
//                2. 引入使用
//                    import QRcode from 'qrcode'
//                    QRcode.toDataURL(要转成二维码的字符串).then().catch()
//                    同时支持async和await
//        2. 弹框
//                1. 下载安装
//                    npm i element-ui
//                2. 引入使用
//                      全部引入
//                          import ElementUI from 'element-ui';
//                          import 'element-ui/lib/theme-chalk/index.css';
//                          Vue.use(ElementUI);
//                      按需引入
//                          按需引入的组件分为两种情况
//                          import 'element-ui/lib/theme-chalk/index.css';
//                          import { Button, MessageBox, Message } from 'element-ui';
//                          // 大多数组件通过 Vue.component 或 Vue.use 可以使用
//                          Vue.component(Button.name, Button); // --> Vue.use(Button)
//                          // 只有少部分组件需要挂载Vue的原型上
//                          Vue.prototype.$msgbox = MessageBox;
//                          Vue.prototype.$alert = MessageBox.alert;
//                          Vue.prototype.$confirm = MessageBox.confirm;
//                          Vue.prototype.$prompt = MessageBox.prompt;
//                          Vue.prototype.$message = Message;
//                3. 在回调中使用
//                    this.$confirm({ 配置项 })
//    两个内容分别去做,做完之后再把立即支付的逻辑写一写
// #endregion
import QRcode from 'qrcode'
  export default {
    name: 'Pay',
    data(){
      return{
        orderId:'',// 订单ID
        payInfo:{},// 支付信息
        imgUrl:'',// 存二维码图片
      }
    },
    mounted(){
      this.orderId = this.$route.query.orderId

      if(this.orderId){
        this.initData()
      }
    },
    methods:{
      async toPay(){
        // 二维码
      // QRcode.toDataURL('我爱你,高圆圆!')
      // QRcode.toDataURL(this.payInfo.codeUrl)
      // .then(res => {
      //   this.imgUrl = res
      // })
      // .catch(err => {
      //   console.log('err -> ', err)
      // })

      this.imgUrl = await QRcode.toDataURL(this.payInfo.codeUrl)
      // -----------------------
      // 弹框
      this.$confirm(`<img src="${ this.imgUrl }"/>`, '使用微信支付', {
        closeOnPressEscape: false, // 是否允许点击ESC关闭弹框
        closeOnClickModal: false, // 是否允许点击遮罩关闭弹框
        showClose: false, // 隐藏右上角x按钮
        dangerouslyUseHTMLString: true, // 解析HTML
        confirmButtonText: '我已支付成功',
        cancelButtonText: '支付遇到问题',
        center: true // 居中
      })
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('err', err)
      })
    },
      async initData(){
        try {
          let result = await this.$api.reqPayInfo(this.orderId)
          if(result && result.code == 200){
            this.payInfo = result.data
          }else{
            alert(result.message || '获取支付信息失败')
            console.error(result);
          }
        } catch (error) {
          alert('获取支付信息失败')
          console.error(error);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>