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

// const getLikelists = async (author, page) => {
//   const tagPage = Number(page) * 10
//   let sql = `SELECT blogs.article_id, createtime, articleTag, author, title,likeCount, articleImg, comments, reviews FROM blogs, likes where likes.like_author = '${author}' and likes.article_id = blogs.article_id order by likes.id desc `
//   if (tagPage >= 0) {
//     sql += ` limit ${tagPage} , 10;`
//   }
//   return exec(sql)
// }
// const getReviews = async (actionsdData = {}) => {
//   const article_id = actionsdData.article_id
//   const type = actionsdData.type
//   let sql = ''
//   if (type == 'ask') {
//     sql = `update questions set reviews = reviews + 1 where question_id='${article_id}';`
//   } else {
//     sql = `update blogs set reviews = reviews + 1 where article_id='${article_id}';`
//   }
//   const updataData = await exec(sql)
//   if (updataData.affectedRows > 0) {
//     return true
//   } else {
//     return false
//   }
// }

// const adoptComment = async (actionsdData = {}) => {
//   const comment_id = actionsdData.comment_id
//   const comment_status = actionsdData.comment_status
//   const sqlArticle = `update comment set comment_status = '${comment_status}' where comment_id='${comment_id}';`
//   const updataData = await exec(sqlArticle)

//   const article_id = actionsdData.askId
//   const sqlAsk = `select comment_status from comment where article_id = '${article_id}' `
//   const AskData = await exec(sqlAsk)

//   var result = AskData.some(item => {
//     if (item.comment_status == '1') {
//       return true
//     }
//   })
//   if (result) {
//     const sqlQuestion = `update questions set status = 2 where question_id='${article_id}';`
//     await exec(sqlQuestion)
//   } else{
//     const sqlQuestion = `update questions set status = 1 where question_id='${article_id}';`
//     await exec(sqlQuestion)
//   }

//   if (updataData.affectedRows > 0) {
//     return true
//   } else {
//     return false
//   }
// }


// module.exports = {
//   getLike,
//   removeLike,
//   getLikelists,
//   getReviews,
//   adoptComment
// }