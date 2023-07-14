<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span>{{ categoryView.category1Name }}</span>
        <span>{{ categoryView.category2Name }}</span>
        <span>{{ categoryView.category3Name }}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuImageList="skuImageList"/>
          <!-- 小图列表 -->
          <ImageList :skuImageList="skuImageList"/>
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
             {{ skuInfo.skuName }}
            </h3>
            <p class="news">
              推荐选择下方[移动优惠购],手机套餐齐搞定,不用换号,每月还有花费返
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price?.toFixed(2) }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray"
                    >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
                  >
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>

              <dl v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
                <dt class="title">{{ saleAttr.saleAttrName }}</dt>
                <dd
                  changepirce="0"
                  :class="{
                    active: saleAttrVal.isChecked == '1'
                  }"
                  v-for="saleAttrVal in saleAttr.spuSaleAttrValueList"
                  :key="saleAttrVal.id"
                  @click="saleAttrValSel(saleAttrVal, saleAttr.spuSaleAttrValueList)"
                >{{ saleAttrVal.saleAttrValueName }}</dd>
              </dl>


            </div>
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="goodsNum" @change="checkGoodsNum"/>
                <a href="javascript:" class="plus" @click="goodsNumBtn(1)">+</a>
                <a href="javascript:" class="mins" @click="goodsNumBtn(-1)">-</a>
              </div>
              <div class="add">
                <a href="javascript:" @click="addCartHandler">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容详情页 -->
    <section class="product-detail">
      <aside class="aside">
        <div class="tabWraped">
          <h4 class="active">相关分类</h4>
          <h4>推荐品牌</h4>
        </div>
        <div class="tabContent">
          <div class="tab-pane active">
            <ul class="partList">
              <li>手机</li>
              <li>手机壳</li>
              <li>内存卡</li>
              <li>Iphone配件</li>
              <li>贴膜</li>
              <li>手机耳机</li>
              <li>移动电源</li>
              <li>平板电脑</li>
            </ul>
            <ul class="goodsList">
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part01.png" />
                  </div>
                  <div class="attr">Apple苹果iPhone 6s (A1699)</div>
                  <div class="price">
                    <em>¥</em>
                    <i>6088.00</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-pane">
            <p>推荐品牌</p>
          </div>
        </div>
      </aside>
      <div class="detail">
        <div class="fitting">
          <h4 class="kt">选择搭配</h4>
          <div class="good-suits">
            <div class="master">
              <img src="./images/l-m01.png" />
              <p>￥5299</p>
              <i>+</i>
            </div>
            <ul class="suits">
              <li class="suitsItem">
                <img src="./images/dp01.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="39" />
                  <span>39</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp02.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="50" />
                  <span>50</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp03.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="59" />
                  <span>59</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp04.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="99" />
                  <span>99</span>
                </label>
              </li>
            </ul>
            <div class="result">
              <div class="num">已选购0件商品</div>
              <div class="price-tit">套餐价</div>
              <div class="price">￥5299</div>
              <button class="addshopcar">加入购物车</button>
            </div>
          </div>
        </div>
        <div class="intro">
          <ul class="tab-wraped">
            <li class="active">
              <a href="###"> 商品介绍 </a>
            </li>
            <li>
              <a href="###"> 规格与包装 </a>
            </li>
            <li>
              <a href="###"> 售后保障 </a>
            </li>
            <li>
              <a href="###"> 商品评价 </a>
            </li>
            <li>
              <a href="###"> 手机社区 </a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <ul class="goods-intro">
                <li>分辨率：1920*1080(FHD)</li>
                <li>后置摄像头：1200万像素</li>
                <li>前置摄像头：500万像素</li>
                <li>核 数：其他</li>
                <li>频 率：以官网信息为准</li>
                <li>品牌： Apple</li>
                <li>商品名称：APPLEiPhone 6s Plus</li>
                <li>商品编号：1861098</li>
                <li>商品毛重：0.51kg</li>
                <li>商品产地：中国大陆</li>
                <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
                <li>系统：苹果（IOS）</li>
                <li>像素：1000-1600万</li>
                <li>机身内存：64GB</li>
              </ul>
              <div class="intro-detail">
                <img src="./images/intro01.png" />
                <img src="./images/intro02.png" />
                <img src="./images/intro03.png" />
              </div>
            </div>
            <div id="two" class="tab-pane">
              <p>规格与包装</p>
            </div>
            <div id="three" class="tab-pane">
              <p>售后保障</p>
            </div>
            <div id="four" class="tab-pane">
              <p>商品评价</p>
            </div>
            <div id="five" class="tab-pane">
              <p>手机社区</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// 1. 静态搭建
//    1. 定义 - 复制粘贴(去静态组件中找)
//    2. 注册 - 路由中注册
//    3. 使用 - 商品列表页面(搜索页),点击商品跳转详情页
//    注意1: params传参 - 传商品id  - 传参步骤:   1. 传  2. 占位 3. 接(打印)
//    注意2: 滚动行为 - 需要跳转到详情页让页面滚动到顶部
//    routes: [],
//    ......
//    scrollBehavior (to, from, savedPosition) {
//      return { y: 0 }
//    }
// 2. 初始化数据展示
//    1. 准备api
//    2. 三连环
//    3. mounted中调用actions,拿数据
//    4. 渲染数据
// 3. 交互
//    3.1 放大镜(完成) - 详情见 Zoom组件
//    3.2 小图列表点击(完成) - 详情见 ImagesList组件
//    3.3 销售属性点击(排他思想做)
//        点击的销售属性值中的isChecked变为1
//        其他的变为0
//    3.4 添加购物车
//        首先需要一个商品数量的数据 - goodsNum
//        3.4.1 加减按钮,修改当前商品数量
//        3.4.2 input框输入内容,修改商品数量
//              直接用正则,限制输入的内容为正整数即可
//        3.4.3 点击"添加购物车",调用接口
//            api准备
//            三连环
//            点击"添加购物车"调用actions
import ImageList from "./ImageList/ImageList";
import Zoom from "./Zoom/Zoom";
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "Detail",
  components: {
    ImageList,
    Zoom,
  },
  data() {
    return {
      goodsId: null,
      goodsNum: 1
    }
  },
  computed: {
    ...mapGetters('detail', ['categoryView', 'skuInfo', 'spuSaleAttrList', 'skuImageList'])
  },
  mounted() {
    // goodsId 先存一下
    this.goodsId = this.$route.params.goodsId
    if (this.goodsId) {
      this.getGoodsInfo(this.goodsId)
    }
  },
  methods: {
    ...mapActions('detail', ['getGoodsInfo']),
    // 销售属性点击
    saleAttrValSel(saleAttrVal, spuSaleAttrValueList) {
      spuSaleAttrValueList.forEach(item => item.isChecked = '0')
      saleAttrVal.isChecked = '1'
    },
    // 商品数量修改(不能减成负数)
    goodsNumBtn(num) {
      this.goodsNum = +this.goodsNum + num
      if (this.goodsNum < 1) {
        this.goodsNum = 1
      }
    },
    // 校验input输入的内容
    checkGoodsNum() {
      console.log(this.goodsNum)
      // 字符串、小数、负数 和 非空 校验
      // ^ 以...开头
      // $ 以...结尾
      // [1-9]是数字1到9算便出现一个
      // \d 是数字0到9
      // *代表前一个数字出现0次或多次

      // 理解: 必须以数字1-9开头  \d*出现0-9任意数字,任意次数  
      let reg = /^[1-9]\d*$/
      if (!reg.test(this.goodsNum)) {
        this.goodsNum = 1
      }
    },
    // 添加购物车
    async addCartHandler() {

      // 发现调用添加购物车调用接口之后,返回的是一个null
      // 所以不需要把数据存储到store中的state
      // 按理来说,调用接口成功之后,应该跳转到添加购物车成功页面
      // 但是,我这里调用的是actions,我怎么接口调用成功了???
      // 
      try {
        await this.$store.dispatch('cart/addCart', {
          skuId: this.goodsId,
          skuNum: this.goodsNum
        })

        // 跳转到添加购物车成功页面
        // 路由 默认path不区分大小写
        // 在路由中配置
        //  caseSensitive: true
        // 让路由匹配大小写
        // this.$router.push(`/addcartsuccess`)
        
        // 跳转添加购物车页面要显示商品的信息和商品数量
        // 但是没有发请求,数据都是从 当前detail页面携带过去
        // 数量通过 路由的 params 参数携带
        // 商品信息通过 sessionStorage 携带
        sessionStorage.setItem('GOODSINFO', JSON.stringify(this.skuInfo))
        this.$router.push(`/addCartSuccess/${ this.goodsNum }`)


        // localStorage 和 sessionStorage
        // localStorage 本地存储
        // sessionStorage 会话存储
        // 相同点:
        //    能存5M数据
        //    只能存储字符串,想存对象存JSON字符串
        // 不同点:
        //    sessionStorage 关闭浏览器,就没有了
        //    localStorage 只要不删,一直在


        // 本地存储还有哪些方式?(拓展)
        // cookie
        //    最早用于做状态保持,因为 http 请求是无状态请求,后端分不清谁发的请求
        //    cookie是浏览器的一种技术
        //      当我们登陆的时候,发请求给后端携带用户名和密码
        //      后端接到用户名和密码去数据库中做对比,看看你输入的内容对不对
        //      对的话返回一个标识,下次发请求的时候,携带上这个标识,后端就知道你是谁
        //    后来人们发现cookie也可以用来存数据
        //      可以存4K多小的数据
        //      一个域名下最多能存50个cookie
        // 由于只有cookie不安全,后来产生了 session
        // session
        //    是服务端的一种技术
        //      当我们登陆的时候,发请求给后端携带用户名和密码
        //      后端接到用户名和密码去数据库中做对比,看看你输入的内容对不对
        //      如果正确的话,会生成一个 session ID(加密字符串), 会放在服务端的 【session容器】 中
        //      同时返回给前端
        //      下次发请求的时候,浏览器cookie中会携带sessionID到后端
        //      后端接到这个sessionID之后去 【session容器】  中对比,得到当前用户是谁
        // token
        //    token是令牌
        //      当我们登陆的时候,发请求给后端携带用户名和密码
        //      后端接到用户名和密码去数据库中做对比,看看你输入的内容对不对
        //      对比成功之后生成一个 加密字符串(加密方式有 SHA256、base64、MD5),这个加密字符串就是 token令牌
        //      把这个 加密字符串返回给前端
        //      当下一次发送请求的时候,携带这个 加密字符串
        //      此时后端接到这个加密字符串,进行解密,就知道当前用户是谁
        //    为什么后面token用的变多,不用session + cookie
        //    1. cookie不能跨域、token能跨域
        //    2. token不用建立 容器 去存储加密字符串
        // JWT Token
        // JSON WEB TOKEN
        //    用来做多点登录,例如 微信 PC、手机、pad同时登录
        //    JWT TOKEN由 头部、载荷、签名组成


      } catch (error) {
        alert('添加购物车失败')
      }

    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: "/\00a0";
        padding: 0 5px;
        color: #ccc;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: green;
                  border: 1px solid green;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .product-detail {
    width: 1200px;
    margin: 30px auto 0;
    overflow: hidden;

    .aside {
      width: 210px;
      float: left;
      border: 1px solid #ccc;

      .tabWraped {
        height: 40px;

        h4 {
          border-top: 3px solid #fff;
          float: left;
          line-height: 37px;
          width: 105px;
          text-align: center;
          border-bottom: 1px solid #ccc;

          &.active {
            border-top: 3px solid #e1251b;
            border-bottom: 0;
            font-weight: normal;
          }
        }
      }

      .tabContent {
        padding: 10px;

        .tab-pane {
          display: none;

          &.active {
            display: block;
          }

          &:nth-child(1) {
            .partList {
              overflow: hidden;

              li {
                width: 50%;
                float: left;
                border-bottom: 1px dashed #ededed;
                line-height: 28px;
              }
            }

            .goodsList {
              & > li {
                margin: 5px 0 15px;
                border-bottom: 1px solid #ededed;
                padding-bottom: 5px;

                .list-wrap {
                  .p-img {
                    text-align: center;

                    img {
                      width: 152px;
                    }
                  }

                  .price {
                    font-size: 16px;
                    color: #c81623;
                  }

                  .operate {
                    text-align: center;
                    margin: 5px 0;

                    a {
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;
                      display: inline-block;
                      padding: 2px 14px;
                      line-height: 18px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail {
      width: 980px;
      float: right;

      .fitting {
        border: 1px solid #ddd;
        margin-bottom: 15px;

        .kt {
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          padding: 5px 0 5px 15px;
        }

        .good-suits {
          height: 170px;
          padding-top: 10px;

          .master {
            width: 127px;
            height: 165px;
            text-align: center;
            position: relative;
            float: left;

            img {
              width: 87px;
            }

            p {
              color: #c81623;
              font-size: 16px;
              font-weight: 700;
            }

            i {
              position: absolute;
              top: 48px;
              right: -25px;
              font-size: 16px;
            }
          }

          .suits {
            width: 668px;
            height: 165px;
            float: left;

            .suitsItem {
              float: left;
              width: 127px;
              padding: 0 20px;
              text-align: center;

              img {
                width: 120px;
                height: 130px;
              }

              p {
                font-size: 12px;
              }

              label {
                display: block;
                position: relative;

                input {
                  vertical-align: middle;
                }

                span {
                  vertical-align: middle;
                }
              }
            }
          }

          .result {
            border-left: 1px solid #ddd;
            width: 153px;
            height: 165px;
            padding-left: 20px;
            float: left;

            .num {
              font-size: 14px;
              margin-bottom: 10px;
              margin-top: 10px;
            }

            .price-tit {
              font-weight: bold;
              margin-bottom: 10px;
            }

            .price {
              color: #b1191a;
              font-size: 16px;
              margin-bottom: 10px;
            }

            .addshopcar {
              background-color: #e1251b;
              border: 1px solid #e1251b;
              padding: 10px 25px;
              font-size: 16px;
              color: #fff;
              display: inline-block;
              box-sizing: border-box;
            }
          }
        }
      }

      .intro {
        .tab-wraped {
          background: #ededed;
          // border: 1px solid #ddd;
          overflow: hidden;

          li {
            float: left;

            & + li > a {
              border-left: 1px solid #ddd;
            }

            &.active {
              a {
                // border: 0;
                background: #e1251b;
                color: #fff;
              }
            }

            a {
              display: block;
              height: 40px;
              line-height: 40px;
              padding: 0 11px;
              text-align: center;
              color: #666;
              background: #fcfcfc;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
            }
          }
        }

        .tab-content {
          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .goods-intro {
                padding-left: 10px;

                li {
                  margin: 10px 0;
                }
              }

              .intro-detail {
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>