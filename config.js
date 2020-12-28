
const RPCClient = require('@alicloud/pop-core').RPCClient
const env = process.env.NODE_ENV  // 环境参数

/**
 * redis配置
 */
exports.REDIS_CONF = {
  host: 'localhost',
  port: 6379,
}

/**
 * github授权登陆
 */
exports.OAUTH_GITHUB = {
  clientID: '648d810630237ddc91d2',
  clientSecret: '4e399b01a0bc041c188dcc5ce95e9c5c3ab1382c'
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