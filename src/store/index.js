// 1. 下载安装
//    npm i vuex@3
// 2. 引入使用
import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

import home from './modules/home'
import search from "./modules/search";
import detail from "./modules/detail";
// 3. 创建并暴露
export default new Vuex.Store({
    // 模块化
    modules:{
        home,
        search,
        detail
    }
})
// 4. 在创建vm实例的时候,进行关联(main.js)