import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import photo from '@/components/photo'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'photo',
      component: photo
    }
  ]
})
