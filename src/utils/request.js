import axios from "axios";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'


// 1. 配置基础路径和超时限制
// 2. 添加进度条信息  nprogress
//    npm install --save nprogress
//    引入css和js
// 3. 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
// 4. 统一处理请求错误, 具体请求也可以选择处理或不处理


const request = axios.create({
    baseURL:'/api',// 这个是有跨域问题的,需要自己解决
    timeout:20000
})
// 请求拦截器
request.interceptors.request.use((config)=>{
    nProgress.start()
    return config
},(e)=>{
    nProgress.done();
    console.log(e);
    return Promise.reject(e)// 为什么要return一个失败的promise -- 请求失败的时候需要return一个失败的promise
})
// 响应拦截器
request.interceptors.response.use((response)=>{
    nProgress.done()
    console.log(response);// 拿到所有的响应的相关信息
    return response.data// 数据都在响应体中,把响应体return出去,我们只拿数据
},(e)=>{
    console.log(e);// 处理错误
    return Promise.reject(e)
})

export default request