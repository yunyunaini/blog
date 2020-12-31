const mysql = require('mysql')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const dbConfig = () => {
  if (process.env.NODE_ENV === 'dev') {
    return {
      host: 'localhost', // 数据库所在的服务器的域名或者IP地址
      port: '3306',
      user: 'root', // 用户名称 登录数据库的账号
      password: '123456', // 登录数据库的密码
      database: 'blog', // 数据库表的名称
    }
  } else {
    let bd_info = fs.readFileSync(path.resolve(__dirname, './important.properties'))
    let db_config = dotenv.parse(bd_info)
    console.log(db_config)
    return {
      host: db_config.datasource_url, // 数据库所在的服务器的域名或者IP地址
      user: db_config.datasource_username, // 用户名称 登录数据库的账号
      password: db_config.datasource_password, // 登录数据库的密码
      database: db_config.datasource_schema, // 数据库表的名称
      port: '3358',
    }
  }
}

// 数据库配置
const connect = () => {
  let connection = mysql.createPool(Object.assign({
    dateStrings: true, // 解决DateTime格式 问题
    charset: 'UTF8MB4_GENERAL_CI', // 解决表情 问题
    useConnectionPooling: true
  }, dbConfig()))
  return connection;
}

// 数据库链接
exports.exec = (sql, values) => {
  return new Promise((resolve, reject) => {
    connect().getConnection((err, connection) => {
      connection.query(sql, values, (err, result) => {
        if (err) {
          console.log('与mysql数据库建立连接 - 失败');
          reject(err)
        } else {
          console.log('与mysql数据库建立连接 - 成功');
          resolve(result)
        }
        connection.release()
      })
    })
  })
}
