const RPCClient = require('@alicloud/pop-core').RPCClient

/**
 * jd-jimdb配置
 */
exports.getRedisConfig = () => {
  if (process.env.NODE_ENV === 'dev') {
    return {
      name: 'RedisTest',
      host: "127.0.0.1",
      port: "6379",
    }
  } else {
    return {
      name: 'node-jimdb',
      host: "ap2.jd.local",
      port: " 5360",
      password: 'jim://2909971244262251579/11689'
    }
  }
}

/**
 * github授权登陆
 */
exports.getOauthGithub = () => {
  if (process.env.NODE_ENV === 'dev') {
    return {
      clientID: '648d810630237ddc91d2',
      clientSecret: '613e195b9403a7be2055158ad0438898faf2b685'
    }
  } else {
    return {
      clientID: '55e4c0ed566c7683c287',
      clientSecret: '63bf8f9e71f1dae121b4a76282729380814f7316'
    }
  }
}

/**
 * 短信配置
 */
exports.client = new RPCClient({
  accessKeyId: 'LTAI4FcGip5kqy1LB4ru2GYh',
  accessKeySecret: 'BvmhpNobez41GIas1vA5z1QSbhTGIm',
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})

// 加密密钥
exports.secret = 'WJiol#23123_'