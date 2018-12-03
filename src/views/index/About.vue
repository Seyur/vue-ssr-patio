/* @author: ly
* @date: 2018/05/15 19:43
* @desc: 关于我们
*/

<template>
  <div class="index-container">
    <Navbar></Navbar>
    <div class="aboutus-container">
      <header></header>
      <section class="aboutus-content clearfix">
        <div class="w1040">
          <p class="ptitle textcen">关于我们</p>
          <p class="pinfo cgray">通过配套的图形化界面创建、开发和管理你的项目。用单个 Vue 文件即刻实践新的灵感。为现代浏览器轻松产出原生的 ES2015 代码，或将你的 Vue 组件构建为原生的 Web Components 组件。</p>
        </div>
      </section>
      <section class="footer-content clearfix">
        <div class="w1040">
          <p class="ptitle">我们的优势</p>
          <ul class="core-ul">
            <li class="core-li">
              <div class="core-icon"></div>
              <p class="p1">功能丰富</p>
            </li>
            <li class="core-li">
              <div class="core-icon"></div>
              <p class="p1">易于扩展</p>
            </li>
            <li class="core-li">
              <div class="core-icon"></div>
              <p class="p1">无需 Eject</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from 'components/common/Navbar'
import Footer from 'components/common/Footer'
export default {
  components: {
    Navbar,
    Footer
  },
  title () {
    return '关于我们'
  }
}
</script>

<style lang="sass" scoped>
$path: '~public/img/index/aboutus/'
header
  width: 100%
  min-width: 1440px
  height: 500px
  background: url($path + 'headbg.jpg') no-repeat top center
.aboutus-content
  width: 100%
  min-width: 1440px
  height: 320px
  background: #fff
  .ptitle
    font-size: 54px
    line-height: 75px
    margin: 68px 0 30px
  .pinfo
    font-size: 14px
    line-height: 36px
.footer-content
  width: 100%
  min-width: 1440px
  height: 600px
  color: #fff
  text-align: center
  background: url($path + 'footer-bg.jpg') no-repeat top center
  .ptitle
    font-size: 48px
    line-height: 66px
    margin-top: 85px
  .core-ul
    margin-top: 100px
  .core-li
    width: 200px
    display: inline-block
    vertical-align: top
    &:nth-child(1) .core-icon
      background-image: url($path + 'core1.png')
    &:nth-child(2)
      margin: 0 210px
      .core-icon
        background-image: url($path + 'core2.png')
    &:nth-child(3) .core-icon
      background-image: url($path + 'core3.png')
  .core-icon
    position: relative
    width: 100px
    height: 100px
    margin: 0 auto 97px
    background: no-repeat top center
    &::after
      content: ''
      position: absolute
      left: 50%
      margin-left: -40px
      top: 163px
      width: 80px
      height: 6px
      background: #fff
  .p1
    font-size: 36px
    line-height: 50px
    font-weight: lighter
</style>
