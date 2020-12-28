const mysql = require('mysql')

// 数据库配置
const connect = () => {
  let connection = mysql.createPool({
    host: 'localhost', // 数据库所在的服务器的域名或者IP地址
    port: '3306',
    user: 'root', // 用户名称 登录数据库的账号
    password: '123456', // 登录数据库的密码
    database: 'test1', // 数据库表的名称
    dateStrings: true, // 解决DateTime格式 问题
    charset: 'UTF8MB4_GENERAL_CI', // 解决表情 问题
    useConnectionPooling: true
  })
  return connection;
}
// CREATE SCHEMA`blog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

// 数据库链接
exports.exec = (sql, values) => {
  return new Promise((resolve, reject) => {
    connect().getConnection((err, connection) => {
      connection.query(sql, values, (err, result) => {
        if (err) {
          // console.log('与mysql数据库建立连接 - 失败');
          reject(err)
        } else {
          // console.log('与mysql数据库建立连接 - 成功');
          resolve(result)
        }
        connection.release()
      })
    })
  })
}
