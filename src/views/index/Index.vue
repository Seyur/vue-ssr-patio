/* @author: ly
* @date: 2018/03/29 17:20
* @desc: 首页
*/

<template>
  <div class="index-container">
    <div class="header index-header-wrap clearfix">
      <h1 class="textcen cwhite h1">vue-ssr-服务器端渲染</h1>
      <Navbar :navbarType="1"></Navbar>
      <!-- 1 -->
      <div class="banner-wrap clearfix">
        <div class="banner-list-wrap pstive">
          <ul class="banner-ul">
            <li class="banner-li" v-for="(one, index) in bannerList" :key="one.id" v-if="index < 4">
              <a class="banner-li-link" :href="one.url" target="_blank" :style="'background-image: url(' + one.image + ')'"></a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 2 -->
      <div class="notice-wrap" v-if="noticeList.length > 0">
        <div class="w1400 pstive">
          <ul class="notice-ul">
            <li class="notice-list" v-for="(one, index) in noticeList" :key="one.id" v-if="index < 3">
              <a class="notice-link fs14 cwhite" target="_blank" :href="one.url">{{one.title}}</a>
            </li>
          </ul>
          <a class="more-notice trade-opt-btn2" href="https://ssr.vuejs.org/" target="_blank"><span class="valign-middel">查看更多</span></a>
        </div>
      </div>
    </div>
    <!-- 3 -->
    <div class="trade-worth-wrap textcen" v-lazy:background-image="require('public/img/index/trade-worth-bg.png')">
      <div class="w1440">
        <p class="ptitle">渐进式</p>
        <p class="p2">JavaScript 框架</p>
        <ul class="vantage-ul">
          <li>
            <i class="v-icon js"></i>
            <p class="p3">易用</p>
            <p class="p4">已经会了 HTML、CSS、JavaScript？即刻阅读指南开始构建应用！</p>
          </li>
          <li class="mg280">
            <i class="v-icon aq"></i>
            <p class="p3">灵活</p>
            <p class="p4">不断繁荣的生态系统，可以在一个库和一套完整框架之间自如伸缩。</p>
          </li>
          <li>
            <i class="v-icon zy"></i>
            <p class="p3">高效</p>
            <p class="p4">20kB min+gzip 运行大小 超快虚拟 DOM 最省心的优化</p>
          </li>
        </ul>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from 'components/common/Navbar.vue'
import Footer from 'components/common/Footer.vue'
export default {
  name: 'index',
  data () {
    return {}
  },
  title () {
    return this.bannerList.length > 0 ? this.bannerList[0].title : '服务器端渲染'
  },
  asyncData ({store, route}) {
    return store.dispatch('FETCH_BANNER_LIST')
  },
  computed: {
    bannerList () {
      return this.$store.getters.getBannerList
    },
    noticeList () {
      return this.$store.getters.getNoticeList
    }
  },
  components: {
    Navbar,
    Footer
  },
  mounted () {
    this.getNoticeData()
  },
  methods: {
    getNoticeData (lang) {
      this.$store.dispatch('FETCH_NOTICE_LIST')
    }
  }
}
</script>

<style lang="sass">
@import '~public/css/index/index'
</style>
