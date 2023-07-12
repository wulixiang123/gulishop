<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">

        
        <div class="loginList" v-if="$store.state.user.userInfo.name">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>欢迎&nbsp;&nbsp;</span>
            <a href="javascript:;">{{ $store.state.user.userInfo.name }}</a>
            <a href="javascript:;" 
            class="register"
            @click="logoutHandler"
            >退出登录</a>
          </p>
        </div>



        <div class="loginList" v-else>
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>





        <div class="typeList">
          <a href="javascript:;">我的订单</a>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="javascript:;">我的尚品汇</a>
          <a href="javascript:;">尚品汇会员</a>
          <a href="javascript:;">企业采购</a>
          <a href="javascript:;">关注尚品汇</a>
          <a href="javascript:;">合作招商</a>
          <a href="javascript:;">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="./images/logo.png"/>
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="javascript:;" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click.prevent="toSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    // 退出登录
    logoutHandler(){
      this.$store.dispatch('user/logout')
    },
    // 去搜索页
    toSearch() {

      // 测试带参 - params和query都测试, 把keyword传递过去
      // this.$router.push(`/search/${ this.keyword }?text=${ this.keyword }`)

      
      let location = {
        name: "Search",
        params: {
          keyword: this.keyword || undefined
        }
      }
      // 如果路由中带有query参数,我们不丢失掉
      if (this.$route.query) {
        location.query = this.$route.query
      }


      if (this.$route.path == '/home') {
        this.$router.push(location)
      } else {
        this.$router.replace(location)
      }

    }
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>