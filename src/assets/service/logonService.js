//
// 作者:周志明
// logonService.vue
// 账号注册服务类
// 2023.2.10
//
import axios from '../axios/axiosInstance.js'
   // 设置用户名验证
   const setUserNmae=(value,userName,index)=>{
          if(index==0){
            if(!value){
              userName.userNames.userNameHint='';
              userName.userNames.userNameError=false;
              return true;
            }
            const  userVerify=/^[0-9A-Za-z\u4e00-\u9fa5]{3,15}$/
            if(userVerify.test(value)){
              userName.userNames.userNameError=false;
              userName.userNames.userNameHint="";
              return true;
            }else{
              console.log("来着");
              userName.userNames.userNameError=true;
              return '输入3-15位字符';
            }
          }else if(index==1){
            if(!value){
              userName.userNames.userNameHint='';
              userName.userNames.userNameError=false;
              return true;
            }
            fetchName("userName",value,userName);
            return true
          }


    }

   // 设置密码验证
   const setPassWord=(value,passWord,index)=>{
    if(index==0){
       if(!value){
         passWord.passWords.passwordError=false;
         passWord.passWords.passwordHint="";
         return true
       }
       if(value && value.length >= 8){
         passWord.passWords.passwordError=false;
         passWord.passWords.passwordHint="";
         return true
       }else{
         passWord.passWords.passwordError=true;
         return '不能小于8位数'
       }
     }else if(index==1){
           if(!value){
             passWord.passWords.passwordError=false;
             passWord.passWords.passwordHint="";
             return true
           }
           const  passVerify= /^(?![0-9]+$)(?![a-zA-Z]+$)(?![\u4e00-\u9fa5]+$)[0-9A-Za-z\\W]{8,18}$/
           if (passVerify.test(value)){
             let pwdA=passWord.passwordAgains.passwordAgainModel;

             if(pwdA==value){
               passWord.passWords.passwordError=false;
               passWord.passWords.passwordHint="";
               passWord.passwordAgains.passwordAgainHint="";
               passWord.passwordAgains.passwordAgainError=false
               console.log(pwdA);
               return true;
             }else if (!pwdA){
               passWord.passWords.passwordError=false;
               passWord.passWords.passwordHint="";
               return true;
             }else{
               passWord.passWords.passwordError=true;
               passWord.passWords.passwordHint='下面跟我不一样';
               passWord.passwordAgains.passwordAgainHint='我和上面不一样';
               passWord.passwordAgains.passwordAgainError=true
               return '下面跟我不一样'
             }
           }
           passWord.passWords.passwordError=true;
           return '输入8-18位数字和字母'
      }
   }


   // 设置再次密码验证
   const setPassWordA=(value,passwordA,index)=>{
     if(index==0){
       let pwd=passwordA.passWords.passwordModel
           if(!value){
             if(pwd){
               passwordA.passwordAgains.passwordAgainHint="再次输入密码啊~跑那里去？";
               passwordA.passwordAgains.passwordAgainError=true
               return '再次输入密码啊~跑那里去？'
             }
             passwordA.passwordAgains.passwordAgainHint="";
             passwordA.passwordAgains.passwordAgainError=false
             return true
           }
           if(pwd==value){
             passwordA.passWords.passwordError=false;
             passwordA.passWords.passwordHint="";
             passwordA.passwordAgains.passwordAgainHint="";
             passwordA.passwordAgains.passwordAgainError=false
             return true
           }else {
             passwordA.passWords.passwordError=true;
             passwordA.passWords.passwordHint='下面和我不一样';
             passwordA.passwordAgains.passwordAgainHint='我跟上面不一样';
             passwordA.passwordAgains.passwordAgainError=true
             return '我跟上面不一样'
           }
     }
   }
   // 设置邮件验证
   const setEmail=(value,email,index)=>{
     if(index==0){
       if (!value){
         email.emails.emailError=false;
         email.emails.emailHint='';
         return true
       }
       if((value || '').length <= 20){
         email.emails.emailError=false;
         email.emails.emailHint='';
         return true
       }else{
         email.emails.emailError=true;
         return '不能超出20字符大小'
       }
     }else if(index==1){
           if (!value){
             email.emails.emailError=false;
             email.emails.emailHint='';
             return true
           }
           const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
           if(pattern.test(value)){
             email.emails.emailError=false;
             email.emails.emailHint='';
             fetchEmail('email',value,email);
             return true
           }else{
             email.emails.emailError=true;
             return '输入正确的邮箱'
           }
         }
   }

   // 用户名get请求
   const fetchName=async (paramName, param,userName) => {
     await axios.get(axios.URL+'/account/queryUserName'+ '?' + paramName + '=' + param).then((resp) => {
       if (resp.data.length == 0) {
         userName.userNames.userNameHint = '';
         userName.userNames.userNameError = false;
       } else {
         userName.userNames.userNameHint = '哎哟~已经有这个了';
         userName.userNames.userNameError = true;
       }
     }).catch((err) => {
       userName.userNames.userNameHint = '连接失败了~';
       userName.userNames.userNameError = true;
     })
   }

  //邮箱get请求
   const fetchEmail=async (paramName, param,email) => {
     await axios.get(axios.URL+'/account/queryEmail'+ '?' + paramName + '=' + param).then((resp) => {
       if (resp.data.length == 0) {
         email.emails.emailHint= '';
         email.emails.emailError = false;
       } else {
         email.emails.emailHint = '哎哟~已经有这个了';
         email.emails.emailError = true;
       }
     }).catch((err) => {
       email.emails.emailHint = '连接失败了~';
       email.emails.emailError = true;
     })
   }
  //注册post请求
   const fetchLogon=async (logon) => {
     logon.loading = true
     setTimeout(() => (logon.loading = false), 20000)
     await axios.post(axios.URL+'/account/insertAccountNumber',{
       passWrod:logon.passWords.passwordModel,
       userName:logon.userNames.userNameModel,
       email:logon.emails.emailModel
     }).then((resp) => {
       console.log(resp);
       if(resp.data=="success"){
         logon.linear=true
         logon.$refs.progressLinear.progressLoading(10,20,10,0);
       }
     }).catch((err) => {
       console.log(err);
       if(err.response){
         if(err.response.status==500){
           logon.$refs.dialogErr.meDialogNumber(true,"服务端错误！","错误提示:500")
         }else if(err.response.status==405){
           logon.$refs.dialogErr.meDialogNumber(true,"注册失败！","错误提示:405")
         }
       }else {
         logon.$refs.dialogErr.meDialogNumber(true,"连接失败！","错误提示")
       }
       logon.loading = false
     })
   }

   //注册
   const logon=(logon)=>{
     if(logon.emails.emailError){
       logon.$refs.dialogErr.meDialogNumber(true,"输入正确的邮件！","错误提示")
     }else if(logon.userNames.userNameError){
       logon.$refs.dialogErr.meDialogNumber(true,"输入用户名！","错误提示")
     }else if(logon.passWords.passwordError){
       logon.$refs.dialogErr.meDialogNumber(true,"输入密码！","错误提示")
     }else if(logon.passwordAgains.passwordAgainError){
       logon.$refs.dialogErr.meDialogNumber(true,"输入密码！","错误提示")
     }else if(logon.emails.emailModel&&
         logon.userNames.userNameModel&&
         logon.passWords.passwordModel&&logon.passwordAgains.passwordAgainModel){
          fetchLogon(logon);
     }else{
       logon.$refs.dialogErr.meDialogNumber(true,"注册了一个空气！","成功提示")
     }
   }
    export  default {setUserNmae,setPassWord,setPassWordA,setEmail,fetchName,fetchEmail,logon}


