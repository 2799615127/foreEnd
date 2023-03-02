<!--弹话框-->
<template>
  <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialogNumber"
      width="auto"
  >

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar
            color="primary"
            :title="dialogTitle"
        ></v-toolbar>
        <v-card-text>
          <div v-if="dialogText=='-1'" class="dialog-w">
            <v-text-field v-model="userLog" label="输入标题"></v-text-field>
          </div>
          <div v-else-if="dialogText=='-2'" class="dialog-w">
             <div class="text-h2 pa-12">不能输入</div>
        </div>
          <div v-else-if="dialogText=='-3'" class="dialog-w">
            <div class="text-h2 pa-12">确认删除！</div>
          </div>
          <div v-else-if="dialogText=='-4'" class="dialog-w">
            <div class="text-h2 pa-12">确认登出！</div>
          </div>
          <div v-else class="text-h2 pa-12">{{dialogText}}</div>

        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn  v-if="dialogText=='-1'"
                  variant="text"
                  @click="meUserLog(userLog)"
          >发送</v-btn>
          <v-btn  v-else-if="dialogText=='-3'"
                  variant="text"
                  @click="meDeleteLog"
          >删除</v-btn>
          <v-btn  v-else-if="dialogText=='-4'"
                  variant="text"
                  @click="meOutAccount"
          >登出</v-btn>
          <v-btn
              variant="text"
              @click="isActive.value = false"
          >关闭</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>

export default {
  emits: {
    onUserLog:function (userLog){
    },
    onDeleteLog:function (){
    },
    onOutAccount:function (){

    }
  }, data(){
    return {
      userLog:"",
      userLogUpade:"",
      dialogNumber: false,
      dialogText:"",
      dialogTitle:""
    }
  },methods:{
      meDialogNumber(number,text,title){
        this.dialogNumber=number
        this.dialogText=text
        this.dialogTitle=title
    },meUserLog(userLog){
        this.$emit('onUserLog',userLog);
    },meDeleteLog(){
      this.$emit('onDeleteLog');
    },meOutAccount(){
      this.$emit('onOutAccount');
    }
  }
}

</script>

<style scoped>
.dialog-w{
  width: 500px;
}
</style>