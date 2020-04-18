import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)
const requireUnauth = (to, from, next) => {
  if (sessionStorage.getItem('session_id')) {
    next({ name: 'chat' })
    return
  }

  next()
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    alias: '/login',
    beforeEnter: requireUnauth
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
