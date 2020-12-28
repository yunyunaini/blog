const userModel = require('../lib/mysql')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 通过评论id查询回复
const getReplyList = async (id) => {
  let replys = await userModel.findReplyListById(id)
  for (var i = 0; i < replys.length; i++) {
    const replyAuthor = await userModel.findUser(replys[i].reply_author)
    replys[i].avatar = replyAuthor[0].avatar
    replys[i].author = replyAuthor[0].author
  }
  return replys
} 

// 通过文章id查询评论
exports.getCommentList = async ctx => {
  const id = ctx.query.article_id
  let result = await userModel.findCommonListById(id)
  for (var i = 0; i < result.length; i++) {
    result[i].replys = await getReplyList(result[i].comment_id)
    const commentAuthor = await userModel.findUser(result[i].comment_author)
    result[i].userInfo = commentAuthor[0]
  }
  ctx.body = await new SuccessModel(result)
}

// 新建评论
exports.createComment = async ctx => {
  const author = ctx.session.author
  const { article_id, comment_conent, comment_id } = ctx.request.body
  await userModel.updateCommentPv(article_id)
  await userModel.addCommon([article_id, comment_conent, author, Date.now(), comment_id])
    .then(() => ctx.body = new SuccessModel())
    .catch(ctx.body = new ErrorModel())
}

// 新建回复
exports.createReply = async ctx => {
  const author = ctx.session.author
  const { article_id, comment_id, reply_conent, reply_author, reply_id } = ctx.request.body
  await userModel.updateCommentPv(article_id)
  await userModel.addReply([comment_id, reply_conent, author, Date.now(), reply_author, reply_id, article_id])
    .then(() => ctx.body = new SuccessModel())
    .catch(ctx.body = new ErrorModel())
}
