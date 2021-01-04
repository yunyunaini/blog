const RPCClient = require('@alicloud/pop-core').RPCClient
/**
 * redis配置-jimdb配置
 */
exports.REDIS_CONF = {
  name: 'node-jimdb',
  host: "ap2.jd.local",
  port: " 5360",
  password: 'jim://2909971244262251579/11689'
}

/**
 * github授权登陆
 */
exports.OAUTH_GITHUB = {
  clientID: '55e4c0ed566c7683c287',
  clientSecret: '63bf8f9e71f1dae121b4a76282729380814f7316'
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

exports.secret = 'WJiol#23123_'