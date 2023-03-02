<template>
  <button @click="handleClick">点击emit-click事件</button>
  <button @click="handleOpen">点击emit-open事件{{title}}</button>
</template>
<script lang="ts">
import { toRef } from 'vue'
import {defineComponent} from "vue";
import base64 from "../../components/tool/base64.js";
import jwtDecode from 'jwt-decode'

export default defineComponent({
  emits: {
    click: null,//click事件没有检验
    open: (value) => {
      if (typeof value === "string") {
        console.log(1);
        return true;
      } else {
        console.log(2);
        return false;
      }
    },
  },
  setup(props, {emit}) {
    const handleClick = function() {
      console.log(3);
      emit("click");
    };
    const handleOpen = function() {
      console.log(4);
      emit("open", 1);
    };
    const handleOpens = function() {
      //let  jwt = require('jsonwebtoken');
      let str =   jwtDecode("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJJZCI6ImMxYmNjNDE0LTdjYWUtNDBmMy1iYzE3LTBjMjBmNjBkODYyNyIsImV4cCI6MTY3NjY5Mzk3MiwiY29udGVudCI6IkFwWjFRUz09In0.3LlsYieZIptEYv5Wk2YDVOVV6PldMOUWkMWgzUMf6HI") ;
      console.log(str);
      console.log(base64.base64Decrypt(str.content));
      // let base= base64.base64Encrypt("往我这边走123zxc，。。【】；；21||” ss~`*&^% '' ‘’''");
      // console.log(base);//加密
      // console.log(base64.base64Decrypt(base))
      //console.log(Base64.decode("5b6A5oiR6L+Z6L656LWwMTIzenhj77yM44CC44CC44CQ44CR77yb77ybMjF8fOKAnSBzc35gKiZeJSAnJyDigJjigJknJw==")) ;//解密
      const title = toRef(props, 'title')
      console.log(title.value);
      console.log("被执行");
    };
    return {
      handleClick,
      handleOpen,
      handleOpens
    };
  },
  data() {
    return {sas:"aaaa"};
  },
  props: {
    title: String
  },
  methods: {},
  sss:'ss'
});
</script>
<style scoped></style>