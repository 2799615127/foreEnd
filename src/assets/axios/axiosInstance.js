//axiosInstance.js
//导入axios
import axios from 'axios'
import router from "../../router/router.js";

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const API = axios.create({
    baseUrl:'http://localhost:8080', //请求后端数据的基本地址，自定义
    timeout: 20000,       //请求超时设置，单位ms
    // validateStatus(status) {
    //     return status >= 200 && status < 504 // 设置默认的合法的状态
    // }
})
//API.defaults.withCredentials = true
API.defaults.retry = 3 // 请求重试次数
API.defaults.retryDelay = 1000 // 请求重试时间间隔
API.defaults.shouldRetry = true // 是否重试

//添加请求拦截器
API.interceptors.request.use(
    config => {
        //添加header
        config.headers['Content-Type'] = 'application/json'
       config.headers['Accept-Language'] = 'zh-CN'
        config.headers['setToken'] = localStorage.getItem('token') // 可以全局设置接口请求header中带token
        if (config.method === 'post') {
            if (!config.data) { // 没有参数时，config.data为null，需要转下类型
                config.data = {}
            }
             //config.data = JSON.stringify(config.data) // qs序列化参数
        }
        return config
    },
    err => {
        //Promise.reject()方法返回一个带有拒绝原因的Promise对象，在F12的console中显示报错
        Promise.reject(err)
    }
);

API.URL="http://43.143.216.30:8080/";
API.interceptors.response.use(response => {
    // 调用Loading实例的close方法即可关闭Loading效果
    if(response.headers['NOToken']){
        router.push('accountLogin');
    }
    if(response.headers['settoken']){
        localStorage.setItem('token',response.headers['settoken'])
    }
    return response
})

// // 配置请求的根路径
// axios.defaults.baseURL = '/api/'
// // 挂载到原型对象之前 先设置拦截器 通过axios请求拦截器添加token，保证拥有获取数据的权限
// axios.interceptors.request.use(config => {
//     //在 request 拦截器中， 展示进度条 NProgress.start()
//    // NProgress.start()
//     // 为请求头对象添加Token验证的Authorization字段
//     config.headers.Authorization = window.sessionStorage.getItem('token')
//     // 最后都必须 return config
//     return config
// })
// // 在 response 拦截器中， 隐藏进度条 NProgress.done()
// axios.interceptors.response.use(config => {
//    // NProgress.done()
//     return config
// });
export default API
