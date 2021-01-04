const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const morgan = require('koa-morgan') 
const cors = require('koa2-cors')
const compress = require('koa-compress')
const path = require('path')
const KoaStatic = require('koa-static');
const fs = require('fs')
const app = new Koa()
const router = require('./router')
const { REDIS_CONF } = require('./config')
const Jimdb = require('@jd/jmfe-node-jimdb')

// 京东链接jimdb,参考文档http://npm.m.jd.com/package/@jd/jmfe-node-jimdb#new_JimClient_new
var jimClient = new Jimdb(REDIS_CONF).getClient().on('error', function (err) {
  console.log(err)
})
jimClient.keys('*').then(function (res) {
  // console.log(res)
}).catch(function (err) {
  console.log(err)
})

const env = process.env.NODE_ENV  // 环境参数
if (env === 'dev') {
  app.use(morgan('dev'))  // 测试环境，打印在控制台
} else {  // 线上环境，写入文件
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const logStream = fs.createWriteStream(logFileName, { flags: 'a' })
  app.use(morgan('combined', { stream: logStream }))
}
app.use(KoaStatic(
  path.join(__dirname, './dist')
))
// app.use(require('koa-static')(path.join(__dirname) + '/dist/static'))

onerror(app,{json: '服务器出现异常'}) 

// 请求压缩
app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type);
  },
  threshold: 1024, // 阀值，当数据超过1kb的时候，可以压缩
}))

app.use(cors({credentials: true})) // 跨域
app.use(bodyparser({ enableTypes:['json', 'form', 'text'] })) // 将post请求的参数转为json格式
app.use(json())

// session配置
app.keys = ['WJiol#23123_'] // 用来加密字符串
const CONFIG = {
  name: 'koa',   //cookie key (default is koa:sess)
  saveUninitialized: true, // 无论有无cookie 默认给个标示为 connect.sid
  signed: true,   // 签名默认true
  rolling: true,  // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  resave: false, // 在每次请求时强行设置cookie，这将重置cookie过期时间
  renew: false,
  cookie: {
    path: '/',
    httpOnly: true, // cookie是否只有服务器端可以访问
    maxAge: 24 * 60 * 60 * 1000 // cookie的过期时间 maxAge in ms (default is 1 days) 24 * 60 * 60 * 1000
  },
  store: redisStore(REDIS_CONF),
}
app.use(session(CONFIG))

app.use(router.routes(), router.allowedMethods()) // 路由配置

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
