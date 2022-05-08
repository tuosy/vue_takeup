import Vue from 'vue'
//引入vue-router
import vueRouter from 'vue-router'

// import Login from '../pages/Login'
// import Home from '../pages/Home/Home'
// import Order from '../pages/Order/Order'
// import Profile from "../pages/Profile/Profile"
// import Search from "../pages/Search/Search"
const Login = () => import('../pages/Login')
const Home = () => import('../pages/Home/Home')
const Order = () => import('../pages/Order/Order')
const Profile = () => import("../pages/Profile/Profile")
const Search = () => import("../pages/Search/Search")
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRating from '../pages/Shop/ShopRating/ShopRating'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

//使用vue-router插件
Vue.use(vueRouter)
//配置路由
export default new vueRouter({
    routes: [
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/home",
            component: Home,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "",
            redirect: "/home",
        },
        {
            path: "/order",
            component: Order,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/profile",
            component: Profile,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/search",
            component: Search,
            meta: {
                showFooter: true,
            },
        },
        {
            path: "/shop",
            component: Shop,
            children: [
                {
                    path: "",
                    redirect: "goods"
                },
                {
                    path: "goods",
                    component: ShopGoods
                },
                {
                    path: "rating",
                    component: ShopRating
                },
                {
                    path: "info",
                    component: ShopInfo
                },
            ]
        }
    ]
})

