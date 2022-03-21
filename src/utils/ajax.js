// 导入axios请求，解决跨域
import axios from "axios";
import { Message } from "element-ui";
import { MessageBox } from "element-ui";

const request = axios.create({
  // 设置访问根路径
  // 后端接口
  baseURL: "http://localhost:9999",
});
request.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
request.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    // console.log("请求成功拦截器");
    // console.log(config.headers);
    // console.log("请求成功拦截器");
    return config;
  },
  (error) => {
    // console.log("请求失败拦截器");
    // console.log(error);
    // console.log("请求失败拦截器");
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // console.log("响应成功拦截器");
    // console.log(response);
    // console.log("响应成功拦截器");
    if (response.data.code === 401) {
      MessageBox.confirm(response.message, "Confirm logout", {
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning",
      });
      localStorage.clear()
      this.$router.push("/login");
    }
    // 这里如果打开的话，点击退出会有一个错误提示框
    if (response.data.code === 403) {
      Message({
        message: response.message || "此次请求失败：" + response.data.msg,
        type: "error",
        duration: 5 * 1000,
      });
      localStorage.clear()
      this.$router.push("/login");
    } else {
      return response;
    }
    return response;
  },
  (error) => {
    // console.log("响应失败拦截器");
    // console.log("err" + error);
    // console.log("响应失败拦截器");
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default request;
