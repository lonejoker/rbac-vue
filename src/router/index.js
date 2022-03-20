import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: "/login",
		name: "login",
		component: () => import('@/views/login/Login.vue'),
	},
	{
		path: "/register",
		name: "register",
		component: () => import('@/views/register/Register.vue'),
	},
	{
		path: "/",
		name: "home",
		component: () => import('@/views/index/Index.vue'),
	},
]

const router = new VueRouter({
	routes
})

// 设置路由拦截
router.beforeEach((to, from, next) => {
	setTimeout(() => {
		const token = localStorage.getItem("token");
		if (to.path == "/login" || to.path == "/register") {
			return next();
		}else{
			if (!token || token == "") {
				return next("/login");
			}
			next()
		}
		next();
	}, 100);
});

export default router
