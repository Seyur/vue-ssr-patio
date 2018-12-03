import http from 'public/js/http'
// dispatch, commit, state
export default {
  FETCH_BANNER_LIST: ({commit}) => {
    return http.get('/api/base/banner', {
      lang: 'zh-hk'
    }, 'https://a.yunex.io').then((res) => {
      if (res.ok) {
        commit('SET_BANNER_LIST', {bannerList: res.data})
      } else {
        console.error(res.reason)
      }
    }, (err) => {
      console.error(err)
    })
  },
  FETCH_NOTICE_LIST: ({commit}) => {
    return http.get('/api/base/notice', {
      lang: 'zh-hk'
    }, 'https://a.yunex.io').then((res) => {
      if (res.ok) {
        commit('SET_NOTICE_LIST', {noticeList: res.data})
      } else {
        console.error(res.reason)
      }
    }, (err) => {
      console.error(err)
    })
  }
}
