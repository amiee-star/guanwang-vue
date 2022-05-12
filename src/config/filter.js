// 全局过滤
export function formatnum(val) {
    if (!val) {
        return 0
    } else if (val < 1000) {
        return val
    } else if (val < 10000) {
        return parseInt(val / 1000).toFixed(1) + 'k'
    } else if (val < 100000) {
        return parseInt(val / 10000).toFixed(1) + 'w'
    } else if (val < 10000000) {
        return parseInt(val / 10000).toFixed(0) + 'w'
    } else if (val < 100000000) {
        return parseInt(val / 10000000).toFixed(0) + 'kw'
    } else {
        return '9kw+'
    }
}

export function objStatus(status) {

  switch (status.publish) {
    case 0:
      return "未发布";
    case 1:
      return "发布中";
    case 2:
      if (status.publishAfterStatus == 1) {
        return "有修改"
      } else {
        return "已发布";
      }
    case 3:
      return "发布失败"

  }
}
export function getYear(times) {
  let time = new Date(times);
  let year = time.getFullYear();
  let month = time.getMonth()+1;
  let day = time.getDate();
  return `${year}-${month}-${day}`

}


export function formatTime(times) {
  let time = new Date(times);
  let year = time.getFullYear();
  let month = time.getMonth()+1;
  let day = time.getDate();
  let hour = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  month = resetTime(month)
  day = resetTime(day)
  hour = resetTime(hour)
  minutes = resetTime(minutes)
  seconds = resetTime(seconds)
  return `${year}-${month}-${day}  ${hour} : ${minutes} : ${seconds}`

}
export function resetTime(val) {
  val = val <=9 ? `0${val}` : val
  return val
}
//四舍五入
export function format45(val) {
    if (val) {
        return Math.round(val)
    } else {
        return ""
    }
}