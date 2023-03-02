<!--用户日记页面 -->
<template>
  <v-card id="account-text">
    <progressLinear  v-show="linear" @onUserLogDe="meUserlogDe" ref="progressLinear"/>
    <v-container
        >
      <v-btn class="float-sm-right" @click="meDeLog" variant="text" icon="mdi-close-network">

      </v-btn>
      <v-toolbar
          class="bg-white"
          dark
      > <v-avatar size="x-large">
          <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          ></v-img>
        </v-avatar><h2>{{userLogName}}</h2>
      </v-toolbar>
      <div id="log" v-html="userLogHtml"></div>
      <dialog-err @onDeleteLog="meDelete" ref="dialogErr"/>
    </v-container>
  </v-card>
</template>

<script>


import http from "../../assets/axios/axionsHttp.js";
import userName from "../tool/user.js";
import dialogErr from "../tool/dialogErr.vue";
import router from "../../router/router.js";
import progressLinear from "../tool/progressLinear.vue";
export default {
  name:'home',
  components: {dialogErr,progressLinear},
  data:()=>{
    return{
      userLogHtml:"",
      userLogName:'',
      id:"",
      linear:false
    }
  },
  //页面刷新根据用户日记id获取用户日记
  mounted() {
    let data="?userlogId="+this.$route.query.id
    http.get("/userlog/diary",data,this,1)
    this.userLogName=userName();
    this.id=this.$route.query.id
  },
  methods:{
    meLog(resp){
      this.userLogHtml=resp.data.userlogHtml
    },
    meDeLog(){
      this.$refs.dialogErr.meDialogNumber(true,-3,"删除提示！")
    },
    //删除日记
    meDelete(){
      let data={userlogId:this.id};
      http.delete("/userlog/delete",data,this,0);
    },
    userlogDe(){
      this.$refs.dialogErr.meDialogNumber(false,"","")
      this.linear=true
      this.$refs.progressLinear.progressLoading(15,30,15,2);
    },
    //删除被删除页面的图片
    meUserlogDe(){
      let images=[]
      //js语法
      let log= document.getElementById("log").getElementsByTagName("img")
      for (let i=0;i<log.length;i++){
        images[images.length]=log[i].alt
      }
      http.post("/userlog/deleteImage",images,this,null)
      router.push({ path: 'home' })
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
}.avatar{
  width: 200px;
 }
</style>