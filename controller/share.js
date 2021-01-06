const userModel = require('../lib/mysql')
const { SuccessModel, ErrorModel } = require('../model/resModel')

exports.getShareList = async ctx => {
  const type = ctx.query.type
  const result = await userModel.findShareList(type)
  ctx.body = new SuccessModel(result)
}

exports.addShareList = async ctx => {
  const { title, describe, origin, location, imgUrl, type } = ctx.request.body
  await userModel.addShareList([title, describe, origin, location, imgUrl, type])
    .then(() => ctx.body = new SuccessModel())
    .catch(ctx.body = new ErrorModel())
}
