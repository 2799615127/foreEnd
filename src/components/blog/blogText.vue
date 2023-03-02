<template>
  <div ref="test">
  <QuillEditor  v-model:content="content" style="height: 300px"  :options="options" />
  </div>
  <div  id="account-logon" >
  <v-btn
      rounded
      color="primary"
      dark
      @click="meBlogText"
  >
    <v-icon
        start
        icon="mdi-arrow-right"
    ></v-icon>
    提交

  </v-btn>
  </div>
    <div class="ql-editor" data-gramm="false" contenteditable="true" data-placeholder="请输入正文" v-html="blogText">
    </div>

  <!--   <template v-for="ops in blogText.ops">-->
  <!--&lt;!&ndash;     <p>{{!ops.attributes||ops.attributes}}</p>&ndash;&gt;-->
  <!--&lt;!&ndash;     <p v-if="ops.attributes"><slot v-html="ops.insert"></slot></p>&ndash;&gt;-->

  <!--&lt;!&ndash;      <p v-else>{{ops.insert}}</p>&ndash;&gt;-->

  <!--&lt;!&ndash;     <slot v-if="ops.insert=='\n'"><br/></slot>&ndash;&gt;-->
  <!--&lt;!&ndash;     <slot v-else-if="ops.insert.includes('\n')">&ndash;&gt;-->
  <!--&lt;!&ndash;       <slot v-for="i in ops.insert.split('\n')">&ndash;&gt;-->
  <!--         <slot v-if="ops.attributes">-->
  <!--           <text v-html="meblogTexts(ops.attributes,ops.insert)"></text>-->
  <!--         </slot>-->
  <!--         <slot v-else>-->
  <!--           <text v-html="ops.insert"></text>-->
  <!--         </slot>-->
  <!--&lt;!&ndash;       </slot>&ndash;&gt;-->
  <!--&lt;!&ndash;     </slot>&ndash;&gt;-->
  <!--&lt;!&ndash;     <slot v-else>&ndash;&gt;-->
  <!--&lt;!&ndash;       <slot v-if="ops.attributes">&ndash;&gt;-->
  <!--&lt;!&ndash;         <text v-html="meblogTexts(ops.attributes,ops.insert)"></text>&ndash;&gt;-->
  <!--&lt;!&ndash;       </slot>&ndash;&gt;-->
  <!--&lt;!&ndash;       <slot v-else>&ndash;&gt;-->
  <!--&lt;!&ndash;         {{ops.insert}}&ndash;&gt;-->
  <!--&lt;!&ndash;       </slot>&ndash;&gt;-->
  <!--&lt;!&ndash;     </slot>&ndash;&gt;-->
  <!--   </template>-->
</template>



<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      blogText:'<text></text>',
      content: '',
      options: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', 'xxx', '16', '18', '20', '22', '24', '28', '32', '36'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            // [{ font: ['songti'] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['image', 'video'] // 链接、图片、视频
          ]
        },
        placeholder: '请输入正文',
        contentType:"html"
      }
    }
  },
  methods:{
    meBlogText(){

      this.blogText=document.querySelector(".ql-editor").innerHTML;
      console.log(document.querySelector(".ql-editor"));
    //   this.blogText=this.content;
    //  console.log(this.blogText.ops[0].insert)
    //   for (let i in this.blogText.ops){
    //     let text= this.blogText.ops[i].insert.replace(/\n/g,'<br/>');
    //     if(text=='<br/>'&&this.blogText.ops[i].attributes){
    //       // this.blogText.ops[i-1].attributes=this.blogText.ops[i].attributes
    //       // this.blogText.ops[i].insert=this.blogText.ops[i].insert+'<br/>'
    //       // this.blogText.ops.splice(i,1);
    //       //   let index=this.blogText.ops[i-1].insert.split('<br/>');
    //       // //
    //       //   this.blogText.ops[i-1].insert=this.blogText.ops[i].insert;
    //     }else {
    //       this.blogText.ops[i].insert=text;
    //       console.log(text);
    //     }
    //   }
    //   console.log(this.blogText);
    }

    ,
    meblogTexts(ops,text) {
        if(ops.bold){
          text='<strong>'+text+'</strong>';
        }if(ops.italic){
          text='<em>'+text+'</em>';
        }if(ops.strike){
          text='<s>'+text+'</s>';
        }if(ops.underline){
          text='<u>'+text+'</u>';
        }
      return text;
    }
  }
}

</script>

<style scoped>
#account-logon{
  margin-top: 30px;
  text-align: center;
}
</style>