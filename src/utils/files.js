import {message} from 'element-ui'
export function checkFile(file, maxSize,fileType) {
  if (maxSize && file.size / 1024 / 1024 > maxSize) {
    message({
      type: 'warning',
      message: `文件大小不超过${maxSize}M`
    })
    return false
  }
  if (fileType.indexOf(file.type) < 0) {
    message({
      type: 'warning',
      message: `文件类型不是${fileType}`
    })
    return false
  }
   return  true
}


export function checkZip(fileName,regExp) {
  let name = fileName.split('.');
  if (regExp.test(name[0]) && name[1].indexOf('zip') >= 0) {
    return true
  }
  message({
    type: 'warning',
    message: `文件类型不是zip类型或者文件名格式不正确`
  })
  return false
}