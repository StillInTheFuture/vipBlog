<template>

  <div class="write-blog">

    <!-- 二级标题开始 -->
    <div class="title_bg">
      <div class="title_box">
        <p class="p_left">写博客</p>
        <div class="title_arrow"></div>
      </div>
    </div>
    <!-- 二级标题结束 -->


    <div class="blogging_page" v-if="isShow">
      <div class="center">

        <!-- 标题 -->
        <div class="blogging_header">
          <input type="text" class="blogging_title" placeholder="请输入该文章的标题" id="blogging_title" v-model="title">
        </div>

        <!-- 文本框 -->
        <quill-editor class="quill" v-model="content" ref="myQuillEditor" :options="editorOption" 
        @blur="onEditorBlur($event)" 
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
        </quill-editor>



        <!-- 博客分类 -->
        <div class="blogging_release">
          <span>博客分类：</span>
          <el-select v-model="classValue" placeholder="请选择" @change="change" :data-key="classId">
            <el-option v-for="item in options" :key="item.id"  :value="item.name">
            </el-option>
          </el-select>
        </div>

        <!-- 博客封面 -->
        <div class="blogging_release">
          <span>博客封面：</span>
          <el-upload
            class="avatar-uploader"
            :action="services+coverImgUrl"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <input type="button" value="发布文章" class="blogging_publish" id="btn" @click="submitBlog">
        </div>

      </div>
    </div>

    <div class="blog_succ" v-else>发布博客成功！</div>


  </div>




</template>


<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import {quillRedefine} from 'vue-quill-editor-upload'//引入图片上传
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Global from '../Global'
export default {
    name: 'write-blog',
    data() {
      return {
        services:Global.services,
        content: ``,
        editorOption: {},
        uploadUrl:  Global.services + "/util/uploadImg/",//文件上传接口
        options: [],
        classValue: '',
        classId:'',
        imageUrl: '',
        imgCover:'',
        coverImgUrl:'/util/uploadImg/',
        title:'',
        token:'',
        isShow:true
      }
    },
    components: {
      quillRedefine
    },
    created(){
       this.token = this.$cookies.get('token');
       this.$http.get('/api/blog/type/').then(function(response){
        if(response.status==200){
          this.options = response.body.data;
        }
      });
      //富文本上传图片
      this.editorOption = quillRedefine({
        uploadConfig: {
          action:  this.uploadUrl,
          res: (respnse) => {
            if(respnse.status=="200"){
              return this.services + respnse.data.path
            }
          },
          name: 'img'  // 图片上传参数名
        },
        theme:'snow'//组题
      })
    },
    methods: {
      onEditorReady(editor) {},  //准备编辑器
      onEditorBlur(){}, // 失去焦点事件
      onEditorFocus(){}, // 获得焦点事件
      onEditorChange(){}, // 内容改变事件
      //分类
      change(){
        for(let i=0;i<this.options.length;i++){
            if(this.classValue == this.options[i].name){
              this.classId = this.options[i].id
            }
        }
        
      },
      //上传封面
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }  
        //上传
        let formData = new FormData();
        formData.append("img", file);
        this.$http.post(this.services+this.coverImgUrl,formData,
        ).then(function(response){
          // console.log(response)
          if(response.status==200){
            this.$message.success(response.body.msg);
            this.imageUrl = this.services+response.body.data.path;
            this.imgCover = response.body.data.img;
          }else{
            this.$message.error(response.body.msg);
          }
        })      
      },
      //提交博客
      submitBlog(){
        console.log(this.imgCover)
        // console.log(this.content)
        
        this.$http.post(
          this.services+'/api/blog/put/',
          {
            'title':this.title,
            'type_id':this.classId,
            'cover':this.imgCover,
            'content':this.content,
          },
          {
            'emulateJSON':true,
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization':this.token
            },
          }
        ).then(function(response){
          //  console.log(response)
          if(response.status==200){
            this.$message.success(response.body.msg)
            let that = this;
            setTimeout(function(){
              that.isShow = false
            },3000)
          }else if(response.body.status=="110"){
              this.$message.error(response.body.msg);
              let that = this;
              setTimeout(function () {
                that.$router.push('/login')
              },3000);
          }
        })
      }
    },
}
</script>

<style scoped>
.quill-editor{
  background: #ffffff;
  width:80%;
  margin:30px auto;
}
.ql-video{
  display: none;
}

/* 博客封面 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  background:#fff;
  margin-bottom: 20px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.blogging_release{
  padding:0!important;
  width: 80%!important;
}
.blogging_release input {
  margin-left: 88px;
  margin-bottom: 20px;
}
/* .avatar-uploader .el-upload{
  background: #fff!important;
  width: 217px!important;
  margin-bottom: 20px!important;
} */
.blog_succ{
  background: #fff;
  font-size: 18px;
  padding:20px 0;
}
</style>
