<!--进度条-->
<template>
  <v-progress-linear
      v-model="loading"
    height="10"
      striped
      color="deep-orange"
  ></v-progress-linear>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "progressLinear",
  emits: {
    onAccountLongon:null,
    onUserLog:null,
    onUserLogDe:null
  },
  data: () => ({
    loading: 10,
  })
  ,methods: {
    progressLoading(start,i,x,key){
      this.loading=20
      this.progressTimeout(i,x,key)
    },
    progressTimeout(i,x,key){
      setTimeout(() => {
        if(i<100){
          this.loading=i
          i+=x;
          this.progressTimeout(i,x,key)
        }else{
          if(key==0){
            this.$emit('onAccountLongon')
          }else if(key==1){
            this.$emit('onUserLog')
          }else if(key==2){
            this.$emit('onUserLogDe')
          }
        }
      }, 100)
    },
    onLoading() {
      // v-on 处理函数会接收原生 DOM 事件
      // 作为其参数。
      this.$emit('onAccountLongon')
    }
  }
}
</script>

<style scoped>

</style>