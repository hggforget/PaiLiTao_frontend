<template>
  <div class="test">
    <div class="image_list">
      <el-upload
        ref="upload"
        class="avatar-uploader"
        :action="resultACtion"
        multiple
        capture="camera"
        accept="image/*"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        list-type="picture-card"
        :show-file-list="false"
      >
        <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
  </div>
</template>


<script>

export default {
  name :'photo',
  data() {
    return {
      dialogImageUrl: '',
      // dialogVisible: false,
      resultACtion: '#', // 后台定义的接口路径
    }
  },
  methods: {
    // 上传文件成功
    handleAvatarSuccess(res, file) {
      this.mode = file.raw
      this.fileName = file.raw.name
      this.$refs.upload.clearFiles()
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    // 上传文件之前
    beforeAvatarUpload(file) {
      this.dialogImageUrl = URL.createObjectURL(file);
      this.$emit('getFile',file);
      // 在这里可以处理传递给后台的参数
      this.$message({
        message: '上传文件',
        type: 'success'
      })
    },
    // 上传错误
    uploadFail(err, file, fileList) {
      console.log(err, '上传错误')
      this.$refs.upload.abort()
      this.$refs.upload.clearFiles()
      this.$message({
        message: '上传错误!!',
        type: 'error'
      })
    }
  }
}
</script>
<style>
.avatar{
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>

