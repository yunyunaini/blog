const userModel = require('../lib/mysql')
const { SuccessModel, ErrorModel } = require('../model/resModel')

exports.getShareList = async ctx => {
  const type = ctx.query.type
  const result = await userModel.findShareList(type)
  ctx.body = new SuccessModel(result)
}
