<!--
作者:周志明
logonService.js
账号注册
2023.2.10
-->
<script>
import logonModel from "../../assets/service/logonService.js";
import dialogErr from "../tool/dialogErr.vue";
import progressLinear from "../tool/progressLinear.vue";
import router from "../../router/router.js";
export default {
  components:{dialogErr,progressLinear},
  data(){
    //设置响应式数据
    return {
      linear:false,
      loading:false,
      accountDialong: false,
      siteFile:true,
      passWords:{
        passwordModel:'',
        passwordError:false,
        passwordHint:''
      },
      emails:{
        emailModel:'',
        emailError:false,
        emailHint:''
      },
      passwordAgains:{
        passwordAgainModel:'',
        passwordAgainError:false,
        passwordAgainHint:''
      },
      userNames:{
        userNameModel:'',
        userNameError:false,
        userNameHint:''
      },
      show:'显示',
      typePassword:'password',
      dialogErr:false,
      userNmae: [
        value=> {
          return logonModel.setUserNmae(value,this,0);
        },
        value=>{
          return logonModel.setUserNmae(value,this,1);
        }
      ],
      passWord: [
        value => {
         return logonModel.setPassWord(value,this,0)
        },
        value => {
          return logonModel.setPassWord(value,this,1)
        }
      ],
      passwordAgain:[
        value => {
          return logonModel.setPassWordA(value,this,0)
        }
      ],
      email:[
        value => {
          return logonModel.setEmail(value,this,0)
        },
        value => {
          return logonModel.setEmail(value,this,1)
        }
      ]
  }
  },
  // 注册函数事件
  methods: {
    onClickswitch (e) {
      if (this.show=='显示'){
        this.loading = false
        this.dialogErr=true
        this.typePassword='text'
        this.show='隐藏'
      }else{
        this.typePassword='password'
        this.show='显示'
      }
    }
    ,onAccountLogon(){
      logonModel.logon(this)
    },
    onClicksVerification(){

    },
    onLongin(){
      router.push({ path: 'accountLogin' })
    }
  }
}

</script>

    <template>
        <v-card id="account-text">
          <progressLinear  v-show="linear" @onAccountLongon="onLongin" ref="progressLinear"/>
          <v-container>
          <v-toolbar
              color="indigo"
              dark
          >
           <v-toolbar-title>立即注册</v-toolbar-title>

          </v-toolbar>
        <v-text-field  :rules="userNmae"
                      v-model="userNames.userNameModel" :validate-on="'blur'"
                      :error="userNames.userNameError" :messages="userNames.userNameHint" label="输入用户名"></v-text-field>
        <v-text-field :rules="passWord" :error="passWords.passwordError"
                      :messages="passWords.passwordHint" :type="typePassword"  v-model="passWords.passwordModel" label="输入密码"
                      :hide-details="'auto'"  :validate-on="'blur'">

        </v-text-field>
      <v-text-field :rules="passwordAgain" :error="passwordAgains.passwordAgainError"
                    :messages="passwordAgains.passwordAgainHint"
                    :type="typePassword"  v-model="passwordAgains.passwordAgainModel" :validate-on="'blur'"  :hide-details="'auto'" label="再次输入密码"></v-text-field>
          <div id="show-logon">
            <v-switch  :label="show"  color="primary" @click="onClickswitch"  :hide-details="'auto'" ></v-switch>
          </div>

      <v-text-field :rules="email"  :error="emails.emailError" :hint="emails.emailHint" :validate-on="'blur'" v-model="emails.emailModel" label="输入邮件"></v-text-field>
            <div>

<!--              <verificationCode ref="verificationCode" @click="onClicksVerification"/>-->
            </div>
            <div  id="account-logon">
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
              <div class="float-sm-right pa-sm-3">
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
    .custom-loader {
      animation: loader 1s infinite;
      display: flex;
    }
    @-moz-keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @-webkit-keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @-o-keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes loader {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
</style>

<!-- Vue Component -->

