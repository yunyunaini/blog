const Promise = require("bluebird")
const jwt = require('jsonwebtoken')
const { ErrorModel } = require('../model/resModel')
const Cookie = require('../utils/tools')

const verify = Promise.promisify(jwt.verify) // 认证和解析 token
let secret = 'WJiol#23123_'
 
async function check(ctx, next) {
  let url = ctx.request.url;
  console.log(url)
  // if (url == '/api/user/login'|| url === '/api/blog/list' || '/api/blog/detail') {
  //   await next();
  // } else {
      // 规定token写在header 的 'autohrization' 
    let token = ctx.request.headers["token"]
   
    let payload = await verify(token, secret)
    let timeout = 24 * 60 * 60 * 1000
    let { time } = payload
    console.log('------', time)
    let data = new Date().getTime()
    if (!token) {
      await next()
      ctx.body = (new ErrorModel({code: 50013, message:'token无效'}))
    }
    if (data - time <= timeout) {
        // 未过期
      await next()
    } else {
        //过期
        ctx.body = (new ErrorModel({code: 50014, message:'token 已过期'}))
    }
  }

 
module.exports = check