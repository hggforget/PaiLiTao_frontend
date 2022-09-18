<template>
<p>{{test}}</p>
</template>

<script>
import axios from 'axios'
// get 请求
export default {
  name: 'test',
  data () {
    return {
      test: null
    }
  },
  mounted () {
    // 第二种写法
    axios({
      method: 'get',
      url: 'http://192.168.15.107:8000/',
      params: {

      }
    }).then((res) => {
      this.test = res.data.test
      console.log('数据：', res)
    })
  }
}
</script>

<style>

</style>
