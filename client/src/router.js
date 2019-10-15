import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/HelloWorld.vue'
import Register from './components/Register.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
