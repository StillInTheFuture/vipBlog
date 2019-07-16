// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import Routes from './routes'

// require styles
import 'swiper/dist/css/swiper.css'

//富文本框
import VueQuillEditor from 'vue-quill-editor'
// require styles这里是富文本编辑器的样式引用
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor, /* { default global options } */)



Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)
Vue.use(VueCookies)

const router = new VueRouter({
  routes:Routes,
  mode:'history'
});

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>',
  render: h => h(App)
});



