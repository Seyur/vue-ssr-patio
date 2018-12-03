<template>
  <div class="trade-footer-wrap">
    <div class="help-wrap">
      <ul class="w1440 clearfix textcen">
        <li class="help-li">
          <router-link :to="{ name: 'about', params: {} }">关于我们</router-link>
        </li>
        <li class="help-li">
          <router-link :to="{ name: 'about', params: {} }">用户协议</router-link>
        </li>
        <li class="help-li">
          <router-link :to="{ name: 'about', params: {} }">隐私保障</router-link>
        </li>
      </ul>
    </div>
    <div class="copyright">
      &copy;Copyright 2014-2018；
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="sass">
  .trade-footer-wrap
    font-size: 0
    width: 100%
    min-width: 1440px
    background: white
    .help-wrap
      border: solid #f2f5f8
      border-width: 1px 0
    .help-li
      display: inline-block
      width: 240px
      height: 60px
      line-height: 60px
      font-size: 18px
      &:nth-child(n+2)
        width: 239px
        border-left: 1px solid #f2f5f8
      &>a
        color: #171717
  .copyright
    text-align: center
    color: #666
    font-size: 12px
    line-height: 60px
</style>
