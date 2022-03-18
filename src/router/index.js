import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import('@/views/login/Login.vue'),
  },
  {
		path: "/register",
		name: "register",
		component: () => import('@/views/register/Register.vue'),
	},
]

const router = new VueRouter({
  routes
})

export default router
