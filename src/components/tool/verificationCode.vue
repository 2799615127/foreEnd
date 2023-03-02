<!--图片验证码-->
<template>
  <div>
    <div>
      <v-text-field v-model="randomNum" label="输入验证码"
                    :validate-on="'blur'">
      </v-text-field>

      <s-identify @click="refreshCode()" class="code d-md-inline-block"  style="cursor:pointer;"
                                 :identifyCode="identifyCode"></s-identify>
      <a href="javascript:;" style="position:absolute; margin-left:30px; margin-top:10px;color: #2C7C91" @click="refreshCode()">换一个</a>

      </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import sIdentify from "./sIdentify.vue";
import jwtDecode from 'jwt-decode'
import API from "../../assets/axios/axiosInstance.js";
import base64 from "./base64.js";
import http from "../../assets/axios/axionsHttp.js";
// import axios from 'axios'
export default defineComponent({
  name: 'WatermarkTest',
  components: { sIdentify },
  randomJwt:"",
  ruin:'',
  data() {
    return {
      overlay:true,
      randomNum:'',
      identifyCode: "",
      identifyCodes: ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','z','c','b'],
    }
  },
  mounted() {
    this.refreshCode()
  },beforeUnmount(){
    this.destroyed ();
  } ,
  methods: {
    getIdentifyCode(){
      return this.identifyCode;
    },
    // 更新验证码
    refreshCode() {
      http.get('/account/randomNum','',this,0);
    },code(resp){
      this.destroyed ();
      this.identifyCode = "";
      this.randomJwt= resp.data;
      let jwt=jwtDecode(this.randomJwt);
      let random=base64.base64Decrypt(jwt.content).split(',');
      this.makeCode(this.identifyCodes,random);
      this.ruin= setTimeout(() => (this.refreshCode()), 30000)
    },
    // 随机生成验证码字符串
    makeCode(data, random) {
      for (let i = 0; i < random.length; i++) {
        this.identifyCode += this.identifyCodes[random[i]]
      }
    },
    destroyed () {
      clearTimeout(this.ruin) // 清除
    }
  },
});
</script>
<style scoped>

</style>