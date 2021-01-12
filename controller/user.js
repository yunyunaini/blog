const { exec } = require('../lib/db')
const { genPassword } = require('../utils/cryp')
const userModel = require('../lib/mysql')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { secret, client, getOauthGithub } = require('../config')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const CODE = Math.random().toString().slice(-6)

// 登陆生成token
const generateActon = (username) => {
  let currentTime = new Date().getTime()
  let payload = { username: username, time: currentTime }
  let token = jwt.sign(payload, secret, { expiresIn: '1day' })
  return token
}

// 获取用户信息
exports.getUserByAuthor = async (author) => {
  const total = await userModel.findBlogbyUser(author)
  const userInfo = await userModel.findUser(author)
  const follow_author = await userModel.findCountFollowingList(author)
  const following_author = await userModel.findCountFollowList(author)
  return Object.assign(userInfo[0], total[0], follow_author[0], following_author[0])
}

// 登陆
exports.login = async ctx => {
  let { username, password } = ctx.request.body
  const data = await userModel.login(username, genPassword(password))
  if (data.length >= 1) {
    ctx.session.username = username
    ctx.session.author = data[0].author
    ctx.body = new SuccessModel({ accessToken: generateActon(username), message: '登录成功' })
  } else {
    ctx.body = new ErrorModel('用户名或密码错误!')
  }
}

// 获取用户信息
exports.getUserInfo = async ctx => {
  const author = ctx.query.author ? ctx.query.author : ctx.session.author
  const result = await this.getUserByAuthor(author)
  ctx.body = new SuccessModel(result)
}

// 获取用户列表
exports.getUserList = async ctx => {
  const top = ctx.query.top || 10
  const page = ctx.query.page || 1
  const users = await userModel.findUserByPage(top, page)
  ctx.body = new SuccessModel(users)
}

// 修改用户信息
exports.updateUser = async ctx => {
  const username = ctx.session.username
  const { avatar, autograph, company, job, author } = ctx.request.body
  await userModel.updateUser([avatar, autograph, company, job, author, username])
  ctx.body = new SuccessModel('信息修改成功')
}

// 发送短信
exports.sendSmsCodeToUser = async ctx => {
  const { username } = ctx.request.body
  let sendSms_params = {
    "RegionId": "cn-hangzhou",
    "PhoneNumbers": `${username}`,
    "SignName": "起航网",
    "TemplateCode": "SMS_180059442",
    "TemplateParam": `{code: ${CODE}}`
  }
  const result = await client.request('SendSms', sendSms_params, { method: 'POST'})
    .then(res => { return res }, (ex) => { return ex})
  if ('Code' in result) {
    ctx.body = new SuccessModel('验证码发送成功')
  } else {
    const limit = result.data.Message.split(':')[1]
    ctx.body = new ErrorModel(limit >= 10 ? '同一手机号每天只能发送 10 条验证码' : '同一手机号每小时只能发送 5 条验证码')
  }
}

// 注册用户
exports.register = async ctx => {
  const { username, password, author } = ctx.request.body
  const result = await userModel.findUser(author)
  const checkphone = await userModel.findDataCountByName(username)
  if (result.length >= 1) {
    ctx.body = new ErrorModel('用户名重复了，请换个名称在试试！')
  } else if (checkphone[0].count >= 1) {
    ctx.body = new ErrorModel('手机号已被注册！')
  } else {
    ctx.session.username = username
    ctx.session.author = author
    await userModel.addUser([genPassword(password), username, Date.now(), author, 'https://notion.cx/wp-content/themes/b2/Assets/fontend/images/default-avatar.png'])
      .then(() => ctx.body = new SuccessModel({ accessToken: generateActon(username), message: '注册成功，欢迎来到起航！' }))
      .catch(new ErrorModel('注册失败'))
  } 
}

// github授权登陆
exports.oauthLogin = async ctx => {
  const requestToken = ctx.request.query.code
  const accessToken = await fetchGitHubAccessToken(requestToken)
  console.log(accessToken)
  if (accessToken) {
    await fetchGitHubUser(accessToken).then(async result => {
      let username = result.login
      let avatar = result.avatar_url
      ctx.session.username = username
      ctx.session.author = username
      const findUserCount = await userModel.findDataCountByName(result.login)
      if (findUserCount[0].count >= 1) {
        ctx.body = new SuccessModel({ accessToken: generateActon(username), message: '注册成功，欢迎来到起航！' })
      } else {
        await userModel.addUser([genPassword(123456), username, Date.now(), username, avatar])
          .then(() => ctx.body = new SuccessModel({ accessToken: generateActon(username), message: '注册成功，欢迎来到起航！' }))
          .catch(new ErrorModel('注册失败'))
      }
    })
  } else {
    new ErrorModel('授权失败')
  }
}

// github授权登陆获取access_token
const fetchGitHubAccessToken = async (code) => {
  const result = await getOauthGithub()
  const tokenResponse = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${result.clientID}&` +
      `client_secret=${result.clientSecret}&` +
      `code=${code}`,
    headers: {
      accept: 'application/json'
    }
  })
  return tokenResponse.data.access_token
}

// 获取github用户信息
const fetchGitHubUser = async (accessToken) => {
  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user?access_token=${accessToken}`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  })
  return result.data
}

exports.logout = async ctx => {
  ctx.session = null
  ctx.body = new SuccessModel('退出登陆')
}

