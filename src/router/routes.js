// import Home from '@/pages/Home.vue'
// import Login from '@/pages/Login.vue'
// import Register from '@/pages/Register.vue'
// import Search from '@/pages/Search.vue'
// import Detail from '@/pages/Detail.vue'

// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/components/MyOrder'
// import GroupOrder from '@/pages/Center/components/GroupOrder'

const Home = () => import( '@/pages/Home.vue')//懒加载
const Search = () => import( '@/pages/Search.vue')
const Login = () => import( '@/pages/Login.vue')
const Register = () => import( '@/pages/Register.vue')
const Detail = () => import( '@/pages/Detail.vue')
const AddCartSuccess = () => import( '@/pages/AddCartSuccess')
const ShopCart = () => import( '@/pages/ShopCart')
const Trade = () => import( '@/pages/Trade')
const Pay = () => import( '@/pages/Pay')
const PaySuccess = () => import( '@/pages/PaySuccess')
const Center = () => import( '@/pages/Center')
const MyOrder = () => import( '@/pages/Center/components/MyOrder')
const GroupOrder = () => import( '@/pages/Center/components/GroupOrder')
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
        caseSensitive: true,
        // 独享守卫 - 只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面
        beforeEnter:(to,from,next) => {
            if(to.params.skuNum && sessionStorage.getItem('GOODSINFO')){
                next()
            }else{
                alert('必须携带商品数量和商品信息才可以访问该页面')
                next(false)
            }
        }
    },
    {
        path:'/shopcart',
        component:ShopCart
    },
    {
        path:'/trade',
        component:Trade,
        // 只有从购物车界面才能跳转到交易页面(/trade) (兼容一下login)
        beforeEnter:(to,from,next) => {
            if(from.path.includes('/shopcart') || from.path.includes('/login')){
                next()
            }else{
                alert('只能从购物车页面跳转交易页面')
                next(false)
            }
        }
    },
    {
        path:'/pay',    
        component:Pay,
        // 只有从交易页面（创建订单）页面才能跳转到支付页面
        beforeEnter: (to, from, next) => {
        if ( from.path.includes('/trade') ) {
                next()
            } else {
              alert('只能从交易页面页面跳转支付页面')
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:PaySuccess
    },
    {
        path:'/center',
        component:Center,
        children:[
            {
                 // path: '/center/myorder',
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'',// 和上一层级拼接  /center
                redirect:'myorder',// 和上一层级拼接 /center/myorder
            }
        ]
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