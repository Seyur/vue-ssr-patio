<template>
  <div class="trade-navbar-wrap" :class="{'float-wrap': navbarType === 1}">
    <div class="navbar-wrap">
      <router-link class="logo-wrap" :to="{ name: 'index', params: {} }">
        <img class="logo" src="~public/img/common/logo.png" alt="logo">
      </router-link>
      <ul class="nav-wrap">
        <li class="nav-li">
          <router-link class="nav-item" :class="{'on': $route.name === 'index'}" :to="{ name: 'index', params: {} }">首页</router-link>
        </li>
        <li class="nav-li">
          <router-link class="nav-item" :class="{'on': $route.name === 'about'}" :to="{ name: 'about', params: {} }">关于我们</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import http from 'public/js/http.js'
export default {
  data () {
    return {
      // 价格转换
      usdt2cny: '-',
      btc: '-',
      hadOver: false,
      isShowLang: false
    }
  },
  props: ['navbarType'],
  computed: {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="sass">
.trade-navbar-wrap
  min-width: 1440px
  font-size: 0
  background: #202d25
  .mgl8
    margin-left: 8px
  &.float-wrap
    position: absolute
    width: 100%
    left: 0
    top: 0
    z-index: 100
    background: transparent
  .navbar-wrap
    position: relative
    height: 60px
    min-width: 1440px
  .logo-wrap
    margin-left: 30px
    display: inline-block
    width: 32px
    height: 60px
    vertical-align: top
    .logo
      border: none
      padding: 14px 0
      width: 32px
      height: 32px
      box-sizing: content-box
  .nav-wrap
    display: inline-block
    margin-left: 30px
    height: 60px
    vertical-align: top
    .nav-li
      display: inline-block
      .nav-item
        padding: 0 20px
        display: block
        text-align: center
        font-size: 14px
        height: 60px
        line-height: 62px
        color: #fff
        &.on, &:hover
          color: #09bb07
</style>
