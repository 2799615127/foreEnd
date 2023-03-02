<!--
作者:周志明
accountLogin.vue
账号登入
2023.2.10
-->
<script>
import loginService from "../../assets/service/loginService.js";
import verificationCode from "../tool/verificationCode.vue";
import dialogErr from "../tool/dialogErr.vue";
import progressLinear from "../tool/progressLinear.vue";
import router from "../../router/router.js";
export default {
  components:{verificationCode,dialogErr,progressLinear},
  data(){
    return {
      loading:false,
      verificationCodes:verificationCode,
      accountDialong: false,
      siteFile:true,
      linear:false,
      passWords:{
        passwordModel:''
      },
      userNames:{
        userNameModel:''
      }
  }
  },

  // 注册函数事件
  methods: {
    onAccountLogon(){
      loginService.login(this);
    },
    async fetchData() {

    }
    ,onClicksVerification(){
    }
    ,onLongon(){
      router.push({ path: 'home' })
      //window.location.href='http://localhost:5173/index2.html';
    }
  }
}

</script>

    <template>

        <v-card id="account-text">
          <progressLinear  v-show="linear" @onAccountLongon="onLongon" ref="progressLinear"/>
          <v-container>
          <v-toolbar
              color="indigo"
              dark
          >
           <v-toolbar-title>立即登入</v-toolbar-title>
          </v-toolbar>
        <v-text-field v-model="userNames.userNameModel" :validate-on="'blur'"
                      :hide-details="'auto'" label="输入用户名"></v-text-field>
        <v-text-field v-model="passWords.passwordModel" label="输入密码"
                       :validate-on="'blur'">
        </v-text-field>
            <div>

            <verificationCode  ref="verificationCode" @click="onClicksVerification"/>
            </div>
            <p class="text-sm-right "><a href="#/accountLogon" class="mr-lg-4">立即注册</a><a>找回密码</a></p>
        <div  id="account-logon" >
          <v-btn
              rounded
              color="primary"
              dark
              :loading="loading"
              :disabled="loading"
              @click="onAccountLogon"
          >
            <v-icon
                start
                icon="mdi-arrow-right"
            ></v-icon>
            提交
            <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>mdi-cached</v-icon>
        </span>
            </template>
          </v-btn>
          <v-dialog v-model="accountDialong" width="500">
            <template v-slot:activator="{props}">
              <div class="float-sm-right pt-sm-3">

                <input :checked="siteFile" type="checkbox">
                <label> 同意<button style="color:#0277BD;" v-bind="props"
                                >网站服务条款</button> </label>
              </div>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                网站服务条款
              </v-card-title>

              <v-card-text>
                  相信我，真的不敢相信你的会点这玩意，简直就是大傻子！！
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="accountDialong = false;siteFile=true"
                >
                  同意
                </v-btn>
                <v-btn
                    color="green darken-1"
                    text
                    @click="accountDialong = false;siteFile=false"
                >
                  不同意
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <dialog-err ref="dialogErr"/>
        </div>
          </v-container>
        </v-card>
</template>

<style scoped>
    #account-logon{
      height: 30px;
      margin-bottom: 10px;
    }
    #account-text{
      width: 70%;
      padding: 10px;
      margin-left: 15%;
      margin-top:10%;
      ;
    }
    #show-logon{
      padding-left:90% !important;
    }
    .accountBox{
      width:200px !important;
      height: 36px !important;
      padding-top: 30px;
    }
</style>

<!-- Vue Component -->

