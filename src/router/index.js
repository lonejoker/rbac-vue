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
		name: "index",
		component: () => import('@/views/home/Home.vue'),
		redirect: "/index",
		meta: {
			title: "首页",
		},
		children: [
			{
				path: "index",
				component: () => import('@/views/index/Index.vue'),
			},
			{
        path: "files",
        component: ()=>import('@/views/files/Files.vue'),
        meta: {
          title: "文件管理",
        },
      },
		],
	},
	{
		path: "/system",
		name: "system",
		component: () => import('@/views/home/Home.vue'),
		redirect: "/system/user",
		meta: {
			title: "系统管理",
		},
		children: [
			{
				path: "user",
				component: () => import('@/views/system/user/User.vue'),
				meta: {
					title: "用户管理",
				}
			},
			{
				path: "role",
				component: () => import('@/views/system/role/Role.vue'),
				meta: {
					title: "角色管理",
				}
			},
			{
				path: "menu",
				component: () => import('@/views/system/menu/Menu.vue'),
				meta: {
					title: "权限管理",
				}
			},
			{
				path: "setting",
				component: () => import('@/views/system/setting/Setting.vue'),
				meta: {
					title: "权限管理",
				},
			}
		],
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
			if (!token || token == '') {
				 next("/login");
			}else{
				next();
			}
		}
	}, 100);
});

export default router
