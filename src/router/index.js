import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import UserList from '@/components/users/UserList'
import Right from '@/components/rights/Rights'
import RightsUser from '@/components/rights/RightsUser'
import GoodsList from '@/components/goods/GoodsList'
import Goods from '@/components/goods/Goods'


Vue.use(Router)

const router = new Router({
  mode: 'history', // 解决 请求地址自动的添加 # 的问题  --  vue 路由默认是 hash，改成 history 模式
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    // 当访问 /home 的时候 将路由重定向到 Welcome 组件
    redirect: '/users',
    children: [{
      path: '/users',
      name: 'UserList',
      component: UserList
    }, {
      path: '/rights',
      name: 'Right',
      component: Right
    }, {
      path: '/rights_user',
      name: 'RightsUser',
      component: RightsUser
    },{
      path: '/goods_list',
      name: 'GoodsList',
      component: GoodsList
      // component: () => import( /* webpackChunkName: 'goods_list' */ '../components/goods/goodsList.vue'),
    },{
      path: '/goods',
      // name: 'GoodsParameter',
      component: Goods
    }]
  }]
})

// 路由导航守卫来进行控制访问权限
// 如果用户没有登录，但是直接通过 URL 访问特定的页面，需要重新导航到登录页面

// 为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // form 代表从哪个路径跳转来的
  // next 是一个函数  表示放行
  // 如果用户访问的是登录页 直接放行
  if (to.path === '/login') return next();
  //从 sessionStorage 中获取 保存的 token 值
  const tokenStr = window.sessionStorage.getItem('token');
  // 没有 token 强制调到 登录页
  if (!tokenStr) return next('/login');
  next();
})

export default router
