<template>
  <emiter title="你好" ref="Emiter" @click="onClick" @open="onOpen"></emiter>
  <button @click="sshandleClick">点击emit-click事件</button>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import Emiter from "./text.vue";
export default defineComponent({
  components: {
    Emiter,
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      console.log("click me!");
    },
    onOpen() {
      console.log("open me!");
    },
    sshandleClick(){
      this.$refs.Emiter.handleOpens();
    }
  },
});
</script>
<style scoped></style>