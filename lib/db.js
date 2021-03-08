const mysql = require('mysql')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const dbConfig = () => {
  if (process.env.NODE_ENV === 'dev') {
    return {
      host: 'localhost',
      port: '3306',
      user: 'root', 
      password: '',
      database: 'myblog',
    }
  }else{
    return {
      host: 'localhost',
      port: '3306',
      user: 'root', 
      password: '123456',
      database: 'blog',
    }
  }
}

// 数据库配置
const connect = mysql.createPool(Object.assign({
  dateStrings: true, // 解决DateTime格式 问题
  charset: 'UTF8MB4_GENERAL_CI', // 解决表情 问题
  multipleStatements: true, // 否许一个query中有多个MySQL语句
}, dbConfig()))

// 数据库链接
exports.exec = (sql, values) => {
  return new Promise((resolve, reject) => {
    connect.getConnection((err, connection) => {
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
