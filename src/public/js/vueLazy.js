import Vue from 'vue'
import vueLazy from 'vue-lazyload'

var userAgent = window.navigator.userAgent
if (userAgent.indexOf('NET') !== -1) {
    // ie浏览器不兼容懒加载组件处理
  Vue.directive('lazy', function (el, binding) {
    if (binding.arg === 'background-image') {
      el.style.backgroundImage = 'url(' + binding.value + ')'
    } else {
      el.src = binding.value
    }
  })
} else {
  // 实现图片懒加载
  Vue.use(vueLazy, {
    preLoad: 1.3,
    attempt: 3,
    // error:'./static/error.png',
    // loading: require('public/img/index/grey.gif'),
    listenEvents: ['scroll'],
    lazyComponent: true
  })
}
