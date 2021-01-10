const userModel = require('../lib/mysql')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getUserByAuthor } = require('./user')

// 校验用户点赞文章
const checkArticleisLike = async (author, articles) => {
  let likes = await userModel.getLikeByAuthor(author)
  articles.forEach(article => {
    const likeList = likes.filter(item => item.article_id === article.article_id)
    article.islike = likeList.length >= 1 ? true : false
  })
  return articles
}

// 查询文章列表
exports.getBlogList = async ctx => {
  const { page, articleTag } = ctx.query
  let author = ctx.session ? ctx.session.author  : ''
  const articles = await userModel.findBlogByTag(articleTag, page)
  const result = await checkArticleisLike(author, articles)
  ctx.body = new SuccessModel(result)
}

// 查询用户文章列表
exports.getBlogListByAuthor = async ctx => {
  const { page, author } = ctx.query
  const author_check = ctx.session.author
  const articles = await userModel.findBlogByAuthor(author, page)
  const result = await checkArticleisLike(author_check, articles)
  ctx.body = new SuccessModel(result)
}

// 文章详情
exports.getBlogDetail = async ctx => {
  let id = ctx.query.id
  let author = ctx.session ? ctx.session.author  : ''
  const articles = await userModel.findBlogById(id)
  const article = await checkArticleisLike(author, articles)
  const userInfo = await getUserByAuthor(article[0].author)
  ctx.body = new SuccessModel({
    article: article[0],
    userInfo
  })
}

// 新建文章
exports.createBlog = async ctx => {
  const author = ctx.session.author
  const { article_id, title, ellipsis, content, markdown, articleImg, articleType, articleTag } = ctx.request.body
  await userModel.createBlog([article_id, title, ellipsis, content, markdown, articleImg, articleType, articleTag.toString(), Date.now(), author])
    .then(() => {ctx.body = new SuccessModel('文章发表成功')})
    .catch(ctx.body = new ErrorModel('文章发表失败'))
}

// 修改文章
exports.updateBlog = async ctx => {
  const { title, ellipsis, content, markdown, articleImg, articleType, articleTag, article_id} = ctx.request.body
  await userModel.updateBlog([title, ellipsis, content, markdown, articleImg, articleType, articleTag.toString(), article_id])
    .then(() => {
      ctx.body = new SuccessModel('文章修改成功')
    })
    .catch(
      ctx.body = new ErrorModel('文章修改失败')
    )
}

// 删除文章
exports.deleteBlog = async ctx => {
  let { id } = ctx.request.body
  await userModel.deleteBlog(id)
    .then(() => {ctx.body = new SuccessModel('文章删除成功')})
    .catch(ctx.body = new ErrorModel('文章删除失败'))
}

// 文章设置为首页轮播
exports.selectBlog = async ctx => {
  let { id } = ctx.request.body
  await userModel.selectBlog(id, 'carousel')
    .then(() => { ctx.body = new SuccessModel() })
    .catch(ctx.body = new ErrorModel())
}

exports.getCarousel = async ctx => {
  try {
    const result = await userModel.getCarousel()
    ctx.body = new SuccessModel(result)
  } catch (error) {
    ctx.body = new ErrorModel('获取轮播图失败')
  }
}

exports.getAbout = async ctx => {
  try {
    const result = await userModel.getAbout()
    ctx.body = new SuccessModel(result)
  } catch (error) {
    ctx.body = new ErrorModel('获取轮播图失败')
  }
}

