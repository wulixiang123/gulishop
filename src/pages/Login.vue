<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="javascript:;" style="border-right: 0">扫描登录</a>
            </li>
            <li>
              <a href="javascript:;" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form action="javascript:;">
              <div class="input-text clearFix">
                <span></span>
                <input type="text" placeholder="邮箱/用户名/手机号" v-model="phone"/>
              </div>
              <div class="input-text clearFix">
                <span class="pwd"></span>
                <input type="text" placeholder="请输入密码" v-model="password"/>
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="" />
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click="loginHandler">登&nbsp;&nbsp;录</button>
              <div>测试登录成功-后续会删除这行{{ $store.state.user.token }}</div>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt="" /></li>
                <li><img src="./images/sina.png" alt="" /></li>
                <li><img src="./images/ali.png" alt="" /></li>
                <li><img src="./images/weixin.png" alt="" /></li>
              </ul>
              <router-link class="register" to="/register"
                >立即注册</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// 1. 静态搭建
// 2. 初始化数据展示(无)
// 3. 交互
//      收集表单数据,点击"登录"获取token
//      登录流程
//      一、 调用登录接口
//      用户输入账号和密码点击登录,调用登录接口,得到 token
//      只要能拿到token就代表登录成功
//      但是 目前没有获取到用户信息,需要我们拿着token调用获取用户信息的接口去拿用户信息
//          步骤:
//              1. api准备
//              2. 三连环
//              3. 点击"登录"按钮调用接口
//          结果:
//              需要把token存储起来
//      二、获取个人信息
//      拿着token(前提是有token),发请求获取个人信息
//          步骤:
//              1. api准备
//              2. 三连环
//              3. 获取到的个人信息存储起来(header组件要用 - 展示个人信息)
//          注意: 
//              获取个人信息的接口是没有参数的,但是需要在请求头中携带token
//          结果:
//              把个人信息存起来,在header中展示
//      ....
//      三、学习路由守卫
//      前提: 【只要路由的改变,就会重新去匹配路由,就会重新走路由守卫】
//      理解 to from next 三个参数
//      四、全局前置守卫
//          登录的时候,之前是在登录完成后,调用的获取个人信息的接口  -- 这个做法是错误的
//          在路由跳转的时候(路由前置守卫中),获取个人信息
//          先走正确的流程:
//          1. 书写路由守卫
//              1.1 判断token是否存在,不存在就放心,存在判断是否有个人信息
//              1.2 判断有没有个人信息,有个人信息就放行
//                  没有个人信息就获取个人信息(调用store中的actions)
//                  注意: store中获取个人信息的actions一定要reutrn失败的promise
//                        因为我们这里需要接收到
//          2. 当刷新页面时候,丢失了用户信息和token
//             期望: 当刷新页面的时候还是存在个人信息的
//              把token第一次获取到的时候存到loaclStorage中
//              当再次刷新页面的时候,state中的token直接去 localStorage中取token
//          注意:
//              路由走守卫的时候 from 是从哪里来
//              例如 from 从 /login 来 在经过一系列逻辑之后,调用 next('/login') 取login
//                  此时是不从新走路由守卫的,不会发生死循环
export default {
  name: "Login",
  data() {
    return {
      phone: '13700000000',
      password: '111111'
    }
  },
  methods: {
    ...mapActions('user', ['login','getUserInfo']),
    async loginHandler(){
      const {phone,password} = this
      if(!(phone && password)){
        alert('请输入完整信息')
        return
      }


      try {
        await this.login({
          phone,
          password
        })
        // // 获取个人信息
        // this.getUserInfo()
        let path = this.$route.query.redirect || '/home'
        this.$router.push(path)
  
        // 去首页,要展示个人信息 目前没有个人信息,在路由守卫中获取个人信息
        
      } catch (error) {
        alert('登陆失败')
        console.error(error);
      }

    },
  }
};
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    background-color: #e93854;

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
      background: url(./images/loginbg.png) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      background: #fff;
      float: right;
      top: 45px;
      position: relative;
      padding: 20px;

      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #e1251b;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-top: none;
        padding: 18px;

        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;

            span {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              background: url(../assets/images/icons.png) no-repeat -10px -201px;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #e1251b;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e1251b;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>