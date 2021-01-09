const userModel = require('../lib/mysql')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { errorMonitor } = require('koa')

exports.addReview = async ctx => {
  const { article_id } = ctx.request.body
  await userModel.updateBlogPv(article_id)
    .then(() => ctx.body = new SuccessModel())
    .catch(ctx.body = new ErrorModel())
}

// 新增点赞
exports.addLike = async ctx => {
  const like_author = ctx.session.author
  const { article_id } = ctx.request.body
  await userModel.updateLikePv(article_id)
  await userModel.createLike([article_id, like_author])
  ctx.body = new SuccessModel('点赞成功')
}

// 取消点赞
exports.removeLike = async ctx => {
  const author = ctx.session.author
  const { article_id } = ctx.request.body
  await userModel.updateReducerLikePv(article_id)
  await userModel.deleteLike(article_id, author)
  ctx.body = new SuccessModel('取消点赞成功')
}

// 根据用户查询点赞列表
exports.getLikelist = async ctx => {
  const author = ctx.query.author || ctx.session.author
  const result = await userModel.getLikeByPage(author)
  for (let i = 0; i < result.length; i++) {
    result[i].islike = true
  }
  ctx.body = new SuccessModel(result)
}

// 新增关注
exports.getFollowing = async ctx => {
  const { author } = ctx.request.body
  const follow_author = ctx.session.author
  await userModel.following([author, follow_author])
    .then(() => ctx.body = new SuccessModel('关注成功'))
    .catch(ctx.body = new ErrorModel('关注失败'))
}

// 取消关注
exports.removeFollow = async ctx => {
  const { author } = ctx.request.body
  const followAuthor = ctx.session.author
  await userModel.removeFollow(followAuthor, author)
    .then(() => ctx.body = new SuccessModel('关注取消成功'))
    .catch(ctx.body = new ErrorModel('关注取消失败'))
}

// 关注列表
exports.getFollowList = async ctx => {
  const author = ctx.query.author || ctx.session.author
  const followList = await userModel.findFollowingList(author)
  const followingList = await userModel.findFollowList(author) // 用户被关注集合
  ctx.body = new SuccessModel([
    { title: "关注了", data: followList, count: followList.length }, 
    { title: "关注者", data: followingList, count: followingList.length }
  ])
}

// 模糊搜索
exports.getSearchResult = async ctx => {
  const keyword = ctx.query.keyword
  const articleList = await userModel.findBlogByTitle(keyword)
  const userLists = await userModel.findUser(keyword)
  ctx.body = new SuccessModel({ articles: articleList, users: userLists})
}

// 反馈信息
exports.addMessage = async ctx => {
  const { resource, content, phone } = ctx.request.body
  await userModel.createMessage([resource, content, phone, ''])
    .then(() => ctx.body = new SuccessModel('提交成功'))
    .catch(ctx.body = new ErrorModel('提交失败'))
}
