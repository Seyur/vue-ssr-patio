let utils = {
  get (name, str) {
    let re = new RegExp('[&,?]' + name + '=([^\\&]*)', 'i')
    typeof str === 'undefined' && (str = document.location.search)
    let r = re.exec(str)
    return r !== null ? decodeURI(r[1]) : null
  },
  dateFormat (data, fmt) {
    !fmt && (fmt = 'yyyy/MM/dd hh:mm:ss')
    if (typeof data === 'number') {
      data = data.toString().substr(0, 13)
    }
    if (typeof data === 'string') {
      data = new Date(parseInt(data))
    }
    // typeof data === 'string' ? (data = new Date(parseInt(data))) : typeof data === 'number' && (data = new Date(data))
    let o = {
      'M+': data.getMonth() + 1, // 月份
      'd+': data.getDate(), // 日
      'h+': data.getHours(), // 小时
      'm+': data.getMinutes(), // 分
      's+': data.getSeconds(), // 秒
      'q+': Math.floor((data.getMonth() + 3) / 3), // 季度
      'S': data.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  setCookie (key, value, expire) {
    let date = new Date()
    expire = parseInt(expire) || 30 * 24 * 60 * 60 * 1000
    date.setTime(date.getTime() + expire)
    document.cookie = key + '=' + escape(value) + ';expires=' + date.toGMTString() + ';path=/;domain=' + location.hostname.replace(/.*\.([^.]+\.[^.]+)$/, '$1')
  },
  getCookie (key) {
    let arr
    let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
    return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null
  },
  clearCookie (key) {
    this.setCookie(key, '', -1)
  },
  preventDefault (e) {
    if (document.all) {
      e.returnValue = false
    } else {
      e.preventDefault()
    }
  }
}
export default utils
