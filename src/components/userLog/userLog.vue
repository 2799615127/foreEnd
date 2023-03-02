<!--
用户日记
2023/2/25
-->
<template>
  <v-card id="account-text">
    <v-container
        >
      <v-btn class="float-sm-right" @click="mebowOut" variant="text" icon="mdi-account-remove-outline">
      </v-btn>
      <v-toolbar
          class="bg-white"
          dark
      > <v-avatar size="x-large">
          <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          ></v-img>
        </v-avatar><h2>{{ userLogName }}</h2>
      </v-toolbar>
      <v-list density="compact">
        <v-list-subheader>个人日记</v-list-subheader>
        <v-list-item
            v-for="(item, i) in userLog"
            :key="i"
            :value="item"
            active-color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>
            <router-link style="text-decoration-line: none;color: #1a1a1a" :to="{path:'/userlogDiary',query:{id:item.id}}"><strong  style="font-size: 14px;">
              <span   v-text="item.text"></span>
            </strong></router-link>
            <text class="float-sm-right" style="font-size: 10px;" v-text="item.time"></text>

          </v-list-item-title>
        </v-list-item>
      </v-list>
      <dialog-err @onOutAccount="meOutAccount" ref="dialogErr"/>
    </v-container>
  </v-card>
</template>

<script>


import http from "../../assets/axios/axionsHttp.js";
import userName from "../tool/user.js";
import dialogErr from "../tool/dialogErr.vue";
import router from "../../router/router.js";
export default {
  name:'home',
  components:{dialogErr},
  data:()=>{
    return{
      userLog:[],
      userLogName:''
    }
  },
  //页面刷新执行http请求 根据用户id获取用户日志
  mounted() {
    http.get("/userlog",'',this,1)
    this.userLogName=userName();
  },
  methods:{
    //请求之后resp传参到melog
    meLog(resp){
      for(let log in resp.data){
          this.userLog[this.userLog.length]={text:resp.data[log].userlogTitle,time:resp.data[log].userlogUpTime,
            id:resp.data[log].userlogId}
      }

    },mebowOut(){
      this.$refs.dialogErr.meDialogNumber(true,-4,"登出提示！");

    },
    //删除前端用户令牌，重新登录
    meOutAccount(){
      window.localStorage.removeItem('token')
      this.$refs.dialogErr.meDialogNumber(false,"","");
      //router.push({ path: 'home' })
      window.location.href="http://43.143.216.30:3000/#/accountLogin"
    }
  }
}
</script>

<style scoped>
#account-text{
  width: 80%;
  padding: 10px;
  margin-left: 10%;
  margin-top:10%;
;
}
</style>