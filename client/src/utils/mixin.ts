// 防抖函数
export function debounce(this: any, fnc: Function, debTime: number) {
  let timer: any = null;
  return (...args: any[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fnc.apply(this, args);
      }, debTime);
    }
  }
}

// 图片转base64
export function uploadImgToBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() {
      resolve(reader)
    }
    reader.onerror = reject;
  })
}

// 随机生成一个不重复的id
export function genNonDuplicateID(): string {
  return Number(
    Math.random()
      .toString()
      .substr(3, 8) + Date.now()
  ).toString(36);
}