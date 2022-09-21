<template>
  <div>
    <el-container style=" border: 1px solid #eee;display: flex;flex-direction: column">
<!--      <el-aside style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>-->
      <div>
        <input class="hide_file" ref ="leftFile" id="upload" type="file" @change="getFile($event)" accept="image/*">
        <div class="camera" @click="clickFile">
          <img v-if="img" class="bigImg" v-bind:src="img" alt="">
          <img v-if="!img" class="icon" src="" alt="">
          <span v-if="!img" class="text">上传照片</span>
        </div>
        <div class="block">
          <el-slider
            v-model="value"
            show-input>
          </el-slider>
        </div>
      </div>
      <el-container>
        <el-header style="text-align: right; font-size: 12px;">
          <el-input
            placeholder="输入关键字"
            v-model="search"
            class="searchClass"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchimg"></el-button>
          </el-input>
        </el-header>
          <el-table
            :data="img_list"
            border
            style="width: 100%"
          >
            <el-table-column prop="img_index"  label="序号"></el-table-column>
            <el-table-column prop="img_name" label="图片名"></el-table-column>
            <el-table-column prop="similar_rate" label="相似度"></el-table-column>
            <el-table-column label="图片">
              <template slot-scope="scope">
                <img :src="scope.row.img_url" style="height: 100px"/>
              </template>
            </el-table-column>
          </el-table>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

//将base64转换为blob
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
//将blob转换为file
function blobToFile(theBlob, fileName){
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
}
//调用


export default {
  data () {
    return {
      img: null,
      img_list: new Array(),
      value: 85,
      file :null,
      search:"",
    }
  },
  methods:{

    formatTooltip(val) {
      return val / 100;
    },

    // 获取选择的图片文件上传
    getFile(e) {
      let file = e.target.files[0];
      console.log(file);
      this.file=file;
      this.img = URL.createObjectURL(file);
      console.log(this.img);
    },
    // 点击触发input的点击事件
    clickFile(){
      this.$refs.leftFile.click();
    },
    // 点击触发搜索事件

    searchimg(){
      let param = new FormData(); //创建form对象
      param.append("file",this.file,this.file.name);//通过append向form对象添加数据
      param.append("id",1);
      param.append("rate",this.value);
      let config = {
        headers:{
          'Content-Type':'multipart/form-data',
        }
      };  //添加请求头
      axios.post('http://192.168.15.107:8000/picupload/',param,config)
        .then(res=>{
          let imgs=res.data.imgs;
          console.log(imgs);
          this.img_list=new Array();
          for(var i=0;i<imgs.length;i++)
          {
            var blob=dataURLtoBlob('data:image/png;base64,'+imgs[i].imgdata)
            var img_file=blobToFile(blob,i)
            var img_url=URL.createObjectURL(img_file)
            this.img_list.push(
              {
                "img_url":img_url,
                "img_index":i+1,
                "img_name":imgs[i].imgname,
                "similar_rate":imgs[i].similar_rate
              }
            )

          }

        })
    }
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
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}


.searchClass {
  border: 1px solid #c5c5c5;
  border-radius: 20px;
  background: #f4f4f4;
  margin: 10px 0;
}

.searchClass .el-input-group__prepend {
  border: none;
  background-color: transparent;
  padding: 0 10px 0 30px;
}

.searchClass .el-input-group__append {
  border: none;
  background-color: transparent;
}

.searchClass .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: none;
  background-color: transparent;
}

.searchClass .el-icon-search {
  font-size: 16px;
}

.searchClass .centerClass {
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: right;
}

.searchClass .line {
  width: 1px;
  height: 26px;
  background-color: #c5c5c5;
  margin-left: 14px;
}

.searchClass:hover {
  border: 1px solid #d5e3e8;
  background: #fff;
}

.searchClass:hover .line {
  background-color: #d5e3e8;
}

.searchClass:hover .el-icon-search {
  color: #409eff;
  font-size: 16px;
}
</style>
