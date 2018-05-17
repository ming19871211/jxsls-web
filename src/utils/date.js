class DateUtils {
  constructor () {
    this.patterns = {
      PATTERN_ERA: 'G', //Era 标志符 Era strings. For example: "AD" and "BC"
      PATTERN_YEAR: 'y', //年
      PATTERN_MONTH: 'M', //月份
      PATTERN_DAY_OF_MONTH: 'd', //月份的天数
      PATTERN_HOUR_OF_DAY1: 'k', //一天中的小时数（1-24）
      PATTERN_HOUR_OF_DAY0: 'H', //24小时制，一天中的小时数（0-23）
      PATTERN_MINUTE: 'm', //小时中的分钟数
      PATTERN_SECOND: 's', //秒
      PATTERN_MILLISECOND: 'S', //毫秒
      PATTERN_DAY_OF_WEEK: 'E', //一周中对应的星期，如星期一，周一
      PATTERN_DAY_OF_YEAR: 'D', //一年中的第几天
      PATTERN_DAY_OF_WEEK_IN_MONTH: 'F', //一月中的第几个星期(会把这个月总共过的天数除以7,不够准确，推荐用W)
      PATTERN_WEEK_OF_YEAR: 'w', //一年中的第几个星期
      PATTERN_WEEK_OF_MONTH: 'W', //一月中的第几星期(会根据实际情况来算)
      PATTERN_AM_PM: 'a', //上下午标识
      PATTERN_HOUR1: 'h', //12小时制 ，am/pm 中的小时数（1-12）
      PATTERN_HOUR0: 'K', //和h类型
      PATTERN_ZONE_NAME: 'z', //时区名
      PATTERN_ZONE_VALUE: 'Z', //时区值
      PATTERN_WEEK_YEAR: 'Y', //和y类型
      PATTERN_ISO_DAY_OF_WEEK: 'u',
      PATTERN_ISO_ZONE: 'X'
    }
    this.week = {
      'ch': {
        "0": "\u65e5",
          "1": "\u4e00",
          "2": "\u4e8c",
          "3": "\u4e09",
          "4": "\u56db",
          "5": "\u4e94",
          "6": "\u516d"
      },
      'en': {
        "0": "Sunday",
          "1": "Monday",
          "2": "Tuesday",
          "3": "Wednesday",
          "4": "Thursday",
          "5": "Friday",
          "6": "Saturday"
      }
    }
  }

  //获取当前时间
  getCurrentTime () {
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    let day = today.getDate()
    let hours = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()
    let timeString = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
    return timeString
  }

  /*
   * 比较时间大小
   * time1>time2 return 1
   * time1<time2 return -1
   * time1==time2 return 0
   */
  compareTime (time1, time2) {
    if(Date.parse(time1.replace(/-/g, "/")) > Date.parse(time2.replace(/-/g, "/"))) {
      return 1
    } else if(Date.parse(time1.replace(/-/g, "/")) < Date.parse(time2.replace(/-/g, "/"))) {
      return -1
    } else if(Date.parse(time1.replace(/-/g, "/")) == Date.parse(time2.replace(/-/g, "/"))) {
      return 0
    }
  }

  //是否闰年
  isLeapYear (year) {
    return((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
  }

  //获取某个月的天数，从0开始
  getDaysOfMonth (year, month) {
    return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
  }

  getDaysOfMonth2 (year, month) {
    // 将天置为0，会获取其上个月的最后一天
    month = parseInt(month) + 1
    let date = new Date(year, month, 0)
    return date.getDate()
  }

  /*距离现在几天的日期：负数表示今天之前的日期，0表示今天，整数表示未来的日期
   * 如-1表示昨天的日期，0表示今天，2表示后天
   */
  fromToday (days) {
    let today = new Date()
    today.setDate(today.getDate() + days)
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    return date
  }

  formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  }

  padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }

  /**
   * 计算一个日期是当年的第几天
   * @param {Object} date
   */
  dayOfTheYear (date) {
    let obj = new Date(date)
    let year = obj.getFullYear()
    let month = obj.getMonth() //从0开始
    let days = obj.getDate()
    let daysArr = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    for(let i = 0; i < month; i++) {
      days += daysArr[i]
    }
    return days
  }

  //获得时区名和值
  getZoneNameValue (dateObj) {
    let date = new Date(dateObj)
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    let arr = date.toString().match(/([A-Z]+)([-+]\d+:?\d+)/)
    var obj = {
      'name': arr[1],
      'value': arr[2]
    }
    return obj
  }
  
  formatDateTime(value) {
    if (!value) { return '' }
    var timestamps = Date.parse(new Date(value)) / 1000
    var date = new Date(timestamps * 1000)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() < 10 ? `0${date.getDate()} ` : `${date.getDate()} `
    let h = date.getHours() < 10 ? `0${date.getHours()}:` : `${date.getHours()}:`
    let m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`
    return Y + M + D + h + m
  }
}

export default new DateUtils()
