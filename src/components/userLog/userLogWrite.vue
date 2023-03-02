<!--
 写日记
 使用了editor富文本框
 -->
<template>
  <div id="editor"  style="border: 1px solid #ccc">
    <progressLinear  v-show="linear" @onUserLog="onLog" ref="progressLinear"/>
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="meChange"
    />
    <div  id="account-logon" >
      <v-btn
          rounded
          color="primary"
          dark
          @click="meDialogNumber"
      >
        <v-icon
            start
            icon="mdi-arrow-right"
        ></v-icon>
        发送
      </v-btn>
    </div>
  </div>
<dialog-err @onUserLog="userLogPing" ref="dialogErr"/>
</template>


<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import http from "../../assets/axios/axionsHttp.js";
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import dialogErr from "../tool/dialogErr.vue";
import router from "../../router/router.js";
import progressLinear from "../tool/progressLinear.vue";

//需注意此声明在全局，意味着vue在路由跳转的时候不会对其销毁
//记录标题是否被更新
const userLogx=ref("");
export default {
  name: "text3",
  components: { Editor, Toolbar,dialogErr,progressLinear },
  setup() {
    //图片名集合，用于删除等
    const fileNames=ref([]);
    //不显示进度条
    const linear=ref(false);
    // TS 语法
   const toolbarConfig = {                        // JS 语法
      /* 工具栏配置 */
    }
    //菜单栏
    toolbarConfig.toolbarKeys = ['bold', 'underline', 'italic', 'through', 'code', 'sub', 'sup', 'clearStyle',
      'color', 'bgColor', 'fontSize', 'fontFamily', 'indent', 'delIndent', 'justifyLeft', 'justifyRight', 'justifyCenter',
      'justifyJustify', 'lineHeight', 'deleteImage', 'editImage', 'viewImageLink', 'imageWidth30',
      'imageWidth50', 'imageWidth100', 'divider', 'emotion', 'insertLink', 'editLink', 'unLink', 'viewLink',
      'codeBlock', 'blockquote', 'headerSelect', 'header1', 'header2', 'header3', 'header4', 'header5', 'todo',
      'redo', 'undo',  'enter', 'bulletedList', 'numberedList', 'insertTable', 'deleteTable',
      'insertTableRow', 'deleteTableRow', 'insertTableCol', 'deleteTableCol', 'tableHeader', 'tableFullWidth',
      'uploadImage']//'uploadVideo'
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    //图片上传失败的信息
    const message=ref("");
    //图片上传失败的文件名
    const fileName=ref("");
    //编辑器的文章的html
    const valueHtml = ref('')
    const editorConfig = { placeholder: '请输入内容...' ,
      MENU_CONF:{uploadImage:{
        server: 'http://43.143.216.30:8080/userlog/image',
          // 单个文件的最大体积限制，默认为 2M
          maxFileSize: 3 * 1024 * 1024, // 3M
          // 最多可上传几个文件，默认为 100
          maxNumberOfFiles: 10,
          // 将 meta 拼接到 url 参数中，默认 false
          metaWithUrl: false,
          // 自定义增加 http  header
          headers: {
            //Accept: 'text/x-json',
            setToken: localStorage.getItem('token')
          },
          // 超时时间，默认为 10 秒
          timeout: 10 * 1000, // 10 秒
          // 单个文件上传成功之后
          onSuccess(file, res) {  // TS 语法
          //获取图片集合
            let index=fileNames.value.length;
            fileNames.value[index]=res.data.alt;
          },
          // 单个文件上传失败
          onFailed(file, res) {   // TS 语法
            message.value=res.message
            fileName.value=file.name
          }


      }}}
    editorConfig.scroll = true
    editorConfig.maxLength = 3000
    editorConfig.hoverbarKeys = {
      'link': {
        // 重写 link 元素的 hoverbar
       // menuKeys: ['editLink', 'unLink', 'viewLink'],
      },
      'image': {
        // 清空 image 元素的 hoverbar
        //menuKeys: [],
      }
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })
    const handleCreated = (editor) => {
      editorRef.value = editor // 更新 editor 实例，重要！
    }
    //editorRef.value.on('scroll', () => { console.log('scroll') })
    return {
      linear,
      userLogx,
      editorRef,
      valueHtml,
      fileNames,
      message,
      fileName,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };

  },methods:{
    //更新事件
    meChange(editor){   // TS 语法
      //图片大于5个无法主增加图片
      if(editor.getElemsByType('image').length>=5){
        //后退
        editor.undo()
      }
    },
    //标题被更新，用于axios请求
    userLogPing:(userLog)=>{
      userLogx.value=userLog;
    },
    //调用标题对话框
    meDialogNumber(){
      this.$refs.dialogErr.meDialogNumber(true,'-1','标题')
    },
    //发送增加日记请求之后，成功之后执行删除页面没有被引用的图片
    userlogMessage(resp){
      //删除的图片集合
      let delteImage=[];
      if(resp.data=="success"){
        //显示进度条
        this.linear=true
        for(let i in this.fileNames){
          let isFile=true;
          let images=this.editorRef.getElemsByType('image');
          for(let index in images){
            if(this.fileNames[i]==images[index].alt){
              isFile=false;
            }
         }
          if(isFile){
            delteImage[delteImage.length]=this.fileNames[i];
          }
        }
        //删除图片
        if(delteImage.length!=0){
          http.post("/userlog/deleteImage",delteImage,this,null)
        }
        //显示进度条
        this.$refs.progressLinear.progressLoading(10,20,10,1);
      }
    },onLog(){
      //跳转
      router.push({ path: 'home' })
    }
  },
  //监听
  watch:{
      message(newVal){
        if(newVal!=Object){
          this.$refs.dialogErr.meDialogNumber(true,"错误的格式:"+this.fileName,this.message)
          this.message=Object;
        }
      },userLogx(value){
        if(!value){
            this.$refs.dialogErr.meDialogNumber(true,'不能为空','错误提示:');
            this.userLogx=Object;
        }else if(value.length >24){
          this.$refs.dialogErr.meDialogNumber(true,'小于二十4个字符','错误提示');
          this.userLogx=Object;
        }else if(value!=Object){
          //发送用户日记数据
            let data={
              "userlogHtml":this.valueHtml,
              "userlogTitle":value
            }
            http.post("/userlog/insert",data,this,0)
            this.$refs.dialogErr.meDialogNumber(false,'-1','');
            this.userLogx=Object;
        }
    }
  }
}
</script>

<style scoped>
#editor{
  display: inline-block;
  width: 80%;
  background-color:#fff;
  margin-left:10%;

}
#account-logon{
  margin-right: -90px;
  float: right;
}
</style>