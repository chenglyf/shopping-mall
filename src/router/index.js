import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Category = () => import('../views/category/Category')


//安装插件
Vue.use(VueRouter)

//创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/Profile',
    component: Profile
  },
  {
    path: '/Cart',
    component: Cart
  },
  {
    path: '/Category',
    component: Category
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})


//导出router
export default router
