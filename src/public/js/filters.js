import utils from './utils'
let baseFilters = {
  dateFilter (data, fmt) {
    return utils.dateFormat(data, fmt)
  },
  toUpperCase (s) {
    s = s || ''
    return s.toUpperCase()
  }
}

export default baseFilters
