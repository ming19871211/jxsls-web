// 本地缓存
class Store {
  constructor () {
    this.store = window.localStorage
  }
  set (key, value, fn) {
    try {
      value = JSON.stringify(value)
    } catch (e) {
      this.value = value
    }

    this.store.setItem(key, value)

    fn && fn()
  }
  get (key, fn) {
    if (!key) {
      throw new Error('没有找到key。')
    }
    if (typeof key === 'object') {
      throw new Error('key不能是一个对象。')
    }
    var value = this.store.getItem(key)
    if (value !== null) {
      try {
        value = JSON.parse(value)
      } catch (e) {
        this.value = value
      }
    }

    return value
  }
  remove (key) {
    this.store.removeItem(key)
  }
}
export default new Store()
