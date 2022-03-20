<template>
	<div class="wrapper">
		<div class="main">
			<!-- 整个注册盒子 -->
			<div class="loginbox">
				<!-- 左侧的注册盒子 -->
				<div class="loginbox-in">
					<div class="xblo">小白后台管理系统</div>
					<el-form :model="registerParam" :rules="rules" ref="registerForm" label-width="0px">
						<div class="userbox">
							<span class="iconfont icon-200yonghu_yonghu" style="margin-right: 6px;"></span>
							<el-form-item prop="userName">
								<el-input v-model="registerParam.userName" placeholder="用户名"></el-input>
							</el-form-item>
						</div>
						<br />
						<div class="pwdbox">
							<span class="iconfont icon-key1"></span>
							<el-form-item prop="password">
								<el-input type="password" v-model="registerParam.password" placeholder="密码"></el-input>
							</el-form-item>
						</div>
						<br />
						<div class="pwdbox">
							<span class="iconfont icon-youxiang"></span>
							<el-form-item prop="email">
								<el-input v-model="registerParam.email" placeholder="邮箱"></el-input>
							</el-form-item>
						</div>
						<br />
						<div class="pwdbox">
							<span class="iconfont icon-shoujihaoma"></span>
							<el-form-item prop="phone">
								<el-input v-model="registerParam.phone" placeholder="手机号码"></el-input>
							</el-form-item>
						</div>
						<br />
						<div class="pwdbox">
							<span class="iconfont icon-tongxingbie"></span>
							<el-form-item prop="sex" style="margin-left: 40px;">
								<el-radio v-model="registerParam.radio" label="0">男</el-radio>
								<el-radio v-model="registerParam.radio" label="1">女</el-radio>
							</el-form-item>
						</div>
						<br />
					</el-form>
					<button type="primary" class="register_btn" @click="register('registerForm')">注册</button>
				</div>
				<!-- 右侧的注册盒子 -->
				<div class="background">
					<div class="title">
						Welcome to XB System Management Center
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<!--
https://www.cnblogs.com/debugf/p/13395349.html
-->
<script>
export default {
	name: 'register',
	components: {},
	props: {},
	data () {
		// 自定义手机号码验证
		var checkPhone = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('手机号不能为空'));
			} else {
				const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
				// console.log(reg.test(value));
				if (reg.test(value)) {
					callback();
				} else {
					return callback(new Error('请输入正确的手机号'));
				}
			}
		};
		return {
			radio: '0',
			registerParam: {
				// email: '111@qq.com',
				// password: '1111111',
				// phone: '15917539607',
				// radio: '0',
				// userName: "22"
			},
			rules: {
				userName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 2, max: 32, message: '请输入2-20位字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 32, message: '请输入6-32位字符', trigger: 'blur' }
				],
				email: [
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
				],
				phone: [{ validator: checkPhone, trigger: 'blur' }]
			}
		}
	},
	watch: {},
	computed: {},
	methods: {
		register (formName) {
			this.$refs[formName].validate(async valid => {
				if (valid) {
					console.log(this.registerParam)
					const { data: res } = await this.http.post(
						"/user/registry",
						this.registerParam
					);
					// console.log(res);
					if (res.code !== 200) {
						this.$message.error("注册失败！", res.msg)
					} else {
						this.$message.success("注册成功！！！");
						setTimeout(() => {
							this.$router.push({ path: "/login" });
						}, 100);
						setTimeout(() => {
							this.registerParam = {}
						}, 400);
					}
				} else {
					this.$message.error('请输入注册信息')
					this.registerParam = {}
					return false
				}
			})
		},
	},
	created () { },
	mounted () { }
}
</script>
<style lang="less" scoped>
.wrapper {
	height: 100%;
	width: 100%;
	background-color: #becfca !important;
}
.el-input /deep/ .el-input__inner {
	width: 95%;
	background-color: #fff0 !important;
	border-radius: 50px;
	height: 30px;
}
/deep/ .el-form-item__content {
	line-height: 30px;
}
.loginbox {
	display: flex;
	position: absolute;
	width: 800px;
	height: 400px;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 #4e655d;
}
.loginbox-in {
	background-color: #89ab9e;
	width: 240px;
}
.userbox {
	margin-top: 85px;
	height: 30px;
	width: 228px;
	display: flex;
	margin-left: 18px;
}
.pwdbox {
	height: 30px;
	width: 228px;
	display: flex;
	margin-left: 18px;
}

.background {
	width: 570px;
	background-image: url("../../assets/image/bg.png");
	background-size: cover;
	font-family: sans-serif;
}
.title {
	margin-top: 320px;
	margin-left: 20px;
	font-weight: bold;
	font-size: 20px;
	color: #4e655d;
}
.title:hover {
	font-size: 21px;
	transition: all 0.4s ease-in-out;
	cursor: pointer;
}
.uesr-text {
	position: left;
}
input {
	outline-style: none;
	border: 0;
	border-bottom: 1px solid #e9e9e9;
	background-color: transparent;
	height: 20px;
	font-family: sans-serif;
	font-size: 15px;
	color: #445b53;
	font-weight: bold;
}
/* input::-webkit-input-placeholder{
    color:#E9E9E9;
 } */
input:focus {
	border-bottom: 2px solid #445b53;
	background-color: transparent;
	transition: all 0.2s ease-in;
	font-family: sans-serif;
	font-size: 15px;
	color: #445b53;
	font-weight: bold;
}
input:hover {
	border-bottom: 2px solid #445b53;
	background-color: transparent;
	transition: all 0.2s ease-in;
	font-family: sans-serif;
	font-size: 15px;
	color: #445b53;
	font-weight: bold;
}

input:-webkit-autofill {
	box-shadow: 0 0 0px 1000px #89ab9e inset !important;
	-webkit-text-fill-color: #445b53;
}

input:-webkit-autofill::first-line {
	font-size: 15px;
	font-weight: bold;
}
.log-box {
	font-size: 12px;
	display: flex;
	justify-content: space-between;
	width: 174px;
	margin-left: 30px;
	color: #4e655d;
	margin-top: -5px;
	align-items: center;
}
.log-box-text {
	color: #4e655d;
	font-size: 12px;
	text-decoration: underline;
}
.register_btn {
	background-color: #5f8276; /* Green */
	border: none;
	color: #fafafa;
	padding: 5px 22px;
	margin-left: 130px;
	text-align: center;
	text-decoration: none;
	// font-size: 13px;
	border-radius: 20px;
	outline: none;
}
.register_btn:hover {
	box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
		0 17px 50px 0 rgba(0, 0, 0, 0.19);
	cursor: pointer;
	background-color: #0b5137;
	transition: all 0.2s ease-in;
}

.warn {
	margin-top: 60px;
	margin-right: 110px;
	margin-bottom: 5px;
	font-weight: bold;
	font-size: 17px;
}

.register_btn:hover {
	font-weight: bold;
	cursor: pointer;
}

.iconfont {
	font-family: "iconfont" !important;
	font-size: 20px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 22px;
	color: #4e655d;
	margin-right: 5px;
	margin-top: 5px;
}

.icon-key:before {
	content: "\e775";
}

.icon-account:before {
	content: "\e817";
}
</style>
