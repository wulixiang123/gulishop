<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <!--
        <input v-model="mobile" name="phone" v-validate="{required: true,regex: /^1\d{10}$/}" 
          :class="{invalid: errors.has('phone')}">
        <span class="error-msg">{{ errors.first('phone') }}</span>

        name="qwer" 设置当前这个input框校验的字段是哪个名称(规定校验哪个字段)
        v-validate="{required: true,regex: /^1\d{10}$/}"
                    使用指令添加规则 required 必填  regex正则
        :class="{ invalid: errors.has('qwer') }"
                  动态绑定类名 invalid
                  errors.has('qwer')
                  errors 是一个错误对象,这个对象上可以调用has这个方法,判断错误对象中有没有关于 qwer的校验
        
        errors.first('qwer')
                  去error这个对象中找 qwer 这个字段的第一个错误信息进行展示
        -->

        <!-- <div>{{ errors }}</div> -->
        <input type="text" placeholder="请输入你的手机号" v-model="userinfo.phone"
          name="phone"
          v-validate="{required: true,regex: /^1\d{10}$/}"
          :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first('phone') }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="userinfo.code"
          name="code"
          v-validate="{ required: true }"
          :class="{ invalid: errors.has('code') }"
        />
        <button 
        style="height: 38px;padding: 0 10px;" 
        @click="getCodeHandler"
        :disabled="!!count"
        >
        {{ count ? `${count}秒之后可重新发送` :`获取验证码`}}
      </button>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码" v-model="userinfo.password"
          name="password"
          v-validate="{ required: true }"
          :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码" v-model="userinfo.repassword"
          name="repassword"
          v-validate="{ required: true, is: userinfo.password }"
          :class="{ invalid: errors.has('repassword') }"
        />
        <span class="error-msg">{{ errors.first('repassword') }}</span>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="userinfo.isAgree"
          name="isAgree"
          v-validate="{ required: true }"
          :class="{ invalid: errors.has('isAgree') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('isAgree') }}</span>
      </div>
      <div class="btn">
        <button @click="registerHandler">完成注册</button>
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
// 静态搭建
//    定义(粘贴过来)、注册(之前注册过)、使用(之前写好了,在header组件中点击注册按钮会跳转注册页面)
// 初始化数据展示
//    没有
// 交互
//    首先需要收集到表单数据,声明对象收集表单数据
//    1. 点击"获取验证码"按钮,填写验证码
//    2. 点击"完成注册"按钮,进行注册
import { mapActions } from 'vuex';
export default {
  name: "Register",
  data() {
    return {
      userinfo: {
        phone: '', // 手机号
        code: '', // 验证码
        password: '', // 密码
        repassword: '', // 重复密码
        isAgree: true // 默认同意协议
      },
      count:0,
      timer:null
    }
  },
  methods: {
    ...mapActions('user', ['getCode', 'register']),
    // 获取验证码
    async getCodeHandler() {
      if (!this.userinfo.phone) {
        alert('请输入手机号')
        return
      }

      this.count = 10
      this.timer = setInterval(()=>{
        this.count--
        if(this.count == 0){
          clearInterval(this.timer)
        }
    },1000)

      try {
        this.userinfo.code = await this.getCode(this.userinfo.phone)
      } catch (error) {
        console.error(error)
        alert('获取code失败')
      }
    },
    // 注册
    async registerHandler() {
      //后续我们会专门回来做字段的校验,目前简单校验即可
      
      let { phone, code, password, repassword, isAgree } = this.userinfo
      
      if (!(phone && code && password && password === repassword && isAgree)) {
        alert('请输入完整信息')
        return
      }

      // 调用接口
      try {
        await this.register({
          phone,
          code,
          password
        })
        alert('注册成功,即将跳转到登录页进行登录')

        this.$router.push(`/login`)

      } catch (error) {
        console.error(error)
        alert('注册失败')
      }

    }
  }
};
</script>

<style lang="less" scoped>
.register-container {
  
  .invalid {
    border: 1px solid #e1251b!important;
  }

  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
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