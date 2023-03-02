// 设置用户名验证
import API from "../axios/axiosInstance.js";

const fetchLogin=async (login) => {
  login.loading = true
  setTimeout(() => (login.loading = false), 20000)
  await API.post(API.URL+'/account/verifyLogin',{
    passWrod:login.passWords.passwordModel,
    userName:login.userNames.userNameModel,
    randomNum:login.$refs.verificationCode.randomNum
  },{headers:{
    randomNum:login.$refs.verificationCode.randomJwt
    }}).then((resp) => {
    if(resp.data.no=="no"){
      login.$refs.dialogErr.meDialogNumber(true,"用户名或密码输入错误！","错误提示")
    }else if(resp.data.randomNo=="randomNo"){
      login.$refs.dialogErr.meDialogNumber(true,"验证码错误！","错误提示")
    }else if(resp.data.tokenNo=="tokenNo"){
      login.$refs.dialogErr.meDialogNumber(true,"登入失败！","错误提示")
    }else if(resp.data.success=="success"){
      login.linear=true
      login.$refs.progressLinear.progressLoading(10,20,10,0);
    }
    login.loading = false;
  }).catch((err) => {
    console.log(err);
    if(err.response){
      if(err.response.status==500){
        login.$refs.dialogErr.meDialogNumber(true,"服务端错误！","错误提示:500")
      }else if(err.response.status==405){
        login.$refs.dialogErr.meDialogNumber(true,"登录失败！","错误提示:405")
      }
    }else {
      login.$refs.dialogErr.meDialogNumber(true,"连接失败！","错误提示")
    }
    login.loading = false
  })
}

//注册
const login=(login)=>{
 if(login.userNames.userNameModel&&
      login.passWords.passwordModel){
   fetchLogin(login);
  }else{
    login.$refs.dialogErr.meDialogNumber(true,"登录了一个空气！","成功提示")
  }
}
export default {
  name: "loginService",
  login

}