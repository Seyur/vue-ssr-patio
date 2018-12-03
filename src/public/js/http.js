/**
 * @author: ly
 * @date: 2018/03/24 20:54
 * @desc: common http request
 */

require('es6-promise').polyfill()
import axios from 'axios'
let LRU
let microCache
let md5
if (process.env.VUE_ENV === 'server') {
  LRU = require('lru-cache')
  md5 = require('md5')
  // 配置缓存
  microCache = LRU({
    max: 1000,
    maxAge: 1000 * 5
  })
}
// 添加请求拦截器
axios.interceptors.request.use(function (request) {
  request.withCredentials = true
  return request
})

let APIHOST = ''
switch (process.env.NODE_ENV) {
  case 'production':
    APIHOST = 'https://vuejs.org/'
    break
  case 'development':
    // vue_env example
    APIHOST = process.env.VUE_ENV === 'server' ? 'https://vuejs.org/' : 'http://vuejs.org/'
    break
}

let http = {
  apiHost: APIHOST,
  get: (url, params, host) => {
    return http.getHeaders(url, params, {}, host)
  },
  getHeaders: (url, params, headers, host) => {
    !params && (params = {})
    let key
    if (microCache) {
      key = md5(url + JSON.stringify(params) + JSON.stringify(headers))
      if (microCache.has(key)) {
        let res = microCache.get(key)
        return Promise.resolve(res)
      }
    }
    let source = axios.CancelToken.source()
    let pending = axios.get(url, {
      params,
      headers,
      baseURL: host || APIHOST,
      cancelToken: source.token
    }).then((response) => {
      let res = response.data
      microCache && params.cache && microCache.set(key, res)
      return res
    }, (thrown) => {
      return Promise.reject(thrown)
    })
    pending.cancel = source.cancel
    return pending
  },
  post: (url, params, host) => {
    return http.postHeaders(url, params, {}, host)
  },
  postHeaders: (url, params, headers, host) => {
    !params && (params = {})
    let key
    if (microCache) {
      key = md5(url + JSON.stringify(params) + JSON.stringify(headers))
      if (microCache.has(key)) {
        let res = microCache.get(key)
        return Promise.resolve(res)
      }
    }
    let source = axios.CancelToken.source()
    let pending = axios.post(url, params, {
      headers,
      baseURL: host || APIHOST,
      cancelToken: source.token
    }).then((response) => {
      let res = response.data
      microCache && params.cache && microCache.set(key, res)
      return res
    }, (thrown) => {
      return Promise.reject(thrown)
    })
    pending.cancel = source.cancel
    return pending
  }
}

export default http
