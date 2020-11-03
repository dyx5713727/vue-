import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

function checkedRoute(path, next) {
  //如果该用户 menus_url 中有 "/menu"就next();没有，next("/")
  let userInfo = store.state.userInfo;
  if (userInfo.menus_url.includes(path)) {
    next()
  } else {
    next("/")
  }
}

const home = () => import('../pages/home/home')

const role = () => import('../pages/role/role')
const manger = () => import('../pages/manger/manger')
const menu = () => import('../pages/menu/menu')
const spces = () => import('../pages/spces/spces')
const loop = () => import('../pages/loop/loop')
const seckill = () => import('../pages/seckill/seckill')
const classify = () => import('../pages/classify/classify')
const goods = () => import('../pages/goods/goods')
const member = () => import('../pages/member/member')


export const indexRoutes = [
  {
    path: 'role',
    component: role,
    name: '角色列表',
    beforeEnter: (to, from, next) => {
      checkedRoute("/role", next)
    }
  },

  {
    path: 'manage',
    component: manger,
    name: '管理员列表',
    beforeEnter(to, from, next) {
      checkedRoute("/manage", next)
    }
  },
  {
    path: 'menu',
    component: menu,
    name: '菜单列表',
    beforeEnter(to, from, next) {
      checkedRoute("/menu", next)
    }
  },
  {
    path: 'spec',
    component: spces,
    name: '商品规格',
    beforeEnter(to, from, next) {
      checkedRoute("/spec", next)
    }
  },
  {
    path: 'banner',
    component: loop,
    name: '轮播图',
    beforeEnter(to, from, next) {
      checkedRoute("/banner", next)
    }
  },
  {
    path: 'seckill',
    component: seckill,
    name: '秒杀活动',
    beforeEnter(to, from, next) {
      checkedRoute("/seckill", next)
    }
  },
  {
    path: 'cate',
    component: classify,
    name: '商品分类',
    beforeEnter(to, from, next) {
      checkedRoute("/cate", next)
    }
  },
  {
    path: 'goods',
    component: goods,
    name: '商品列表',
    beforeEnter(to, from, next) {
      checkedRoute("/goods", next)
    }
  },
  {
    path: 'member',
    component: member,
    name: '会员管理'
  },
]



let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login')
    },
    {
      path: '/',
      component: () => import('../pages/index/index'),
      children: [
        {
          path: "",
          component: () => import("../pages/home/home")
        }
        // ...indexRouters
      ].concat(indexRoutes)
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  //  如果前往的不是登录，判断是否登陆 ,从vuex|sessionStorage 取值
  let userInfo = store.state.userInfo
  if (userInfo.username) {
    next()
    return
  }
  //如果没有登录 ，next("/login")
  next("/login")
})
export default router