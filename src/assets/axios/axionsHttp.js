/****   http.js   ****/
// 导入封装好的axios实例
import API from "./axiosInstance.js";
import axios from "./axiosInstance.js";
const dialogHtppErr=(err,overThis)=>{

    if(err.response){
        if(err.response.status==500){
            overThis.$refs.dialogErr.meDialogNumber(true,"服务端错误！","错误提示:500")
        }else if(err.response.status==405){
            overThis.$refs.dialogErr.meDialogNumber(true,"页面不存在！","错误提示:405")
        }
    }else {
        overThis.$refs.dialogErr.meDialogNumber(true,"连接失败！","错误提示")
    }
}
const http ={
    /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
    async get(url,params,overThis,index){
        await API.get(API.URL+url+params).then((resp) => {
            if(index==0){
                overThis.code(resp)
            }else if(index==1){
                overThis.meLog(resp)
            }
        }).catch((err) => {
            dialogHtppErr(err,overThis)
        })
    },
    async post(url,params,overThis,index){
        await API.post(API.URL+url,params).then((resp) => {
            if(index==0){
                overThis.userlogMessage(resp)
            }
        }).catch((err) => {
            dialogHtppErr(err,overThis)
        })
    },
    put(url,params){
        const config = {
            method: 'put',
            url:url
        }
        if(params) config.params = params
        return API.request(config)
    },
    async delete(url,params,overThis,index){
        await API.delete(API.URL+url,{data:params}).then((resp) => {
            if(index==0){
                overThis.userlogDe(resp)
            }
        }).catch((err) => {
            console.log(err)
            dialogHtppErr(err,overThis)
        })
    }
}
//导出
export default http