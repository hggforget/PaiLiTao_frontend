<template>
  <div>
    <input class="hide_file" ref ="leftFile" id="upload" type="file" @change="getFile($event)" accept="image/*">
    <div class="camera" @click="clickFile">
      <img v-if="img" class="bigImg" v-bind:src="img" alt="">
      <img v-if="!img" class="icon" src="" alt="">
      <span v-if="!img" class="text">上传照片</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      img: null
    }
  },
  methods:{
    // 获取选择的图片文件上传
    getFile(e) {
      let file = e.target.files[0];
      console.log(file);
      let param = new FormData(); //创建form对象
      param.append("file",file,file.name);//通过append向form对象添加数据
      param.append("id",1);
      let config = {
        headers:{
          'Content-Type':'multipart/form-data',
        }
      };  //添加请求头
      axios.post('http://192.168.15.107:8000/picupload/',param,config)
        .then(res=>{
          this.img = URL.createObjectURL(file)
          console.log(this.img)

        })
    },
    // 点击触发input的点击事件
    clickFile(){
      this.$refs.leftFile.click();
    },
  }

}
</script>

<style>
.hide_file{
  display:none;
}
.camera {
  position: relative;
  z-index: 2;
  margin: 0 auto;
  margin-bottom: 10px;
  width: 138px;
  height: 138px;
  background: #E7E7E7;
  border-radius: 6px;
  text-align: center;
}
.bigImg{
  width: 138px;
  height: 138px;
}
.icon{
  width: 40px;
  margin-top: 40px;
}
.text{
  display: block;
  line-height: 22px;
  font-size: 15px;
  color: #999;
  margin-top: 8px;
}


</style>
