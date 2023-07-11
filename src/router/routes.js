import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Search from '@/pages/Search.vue'
import Detail from '@/pages/Detail.vue'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'

export default[
    {
        path:'/home',
        component:Home
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isHide:true// 这个数据用来控制Login组件的显示和隐藏,为true的时候代表隐藏
        }
    },
    {
        name:'/Detail',
        path:'/detail/:goodsId?',
        component:Detail
    },
    {
        path:'/addCartSuccess/:skuNum?',
        component:AddCartSuccess,
        // path区分大小写(默认false)
        caseSensitive: true
    },
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:'/trade',
        component:Trade
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isHide:true// 这个数据用来控制Footer组件的显示和隐藏,为true的时候代表隐藏
        }
    },
    {
        name:'Search',
        path:'/search/:keyword?',// 加问号的目的是能够匹配到路由,参数该丢还是会丢失
        component:Search
    },
    {
        path:'/',
        redirect:'/home'
    }
]