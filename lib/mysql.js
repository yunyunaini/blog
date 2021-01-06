const { exec } = require('./db')

// 标签查询分页文章
exports.findBlogByTag = (articleTag, page) => {
  let _sql = `select article_id, title, ellipsis, createtime, comments, reviews, articleTag, articleImg, blogs.author, likeCount, users.avatar from blogs inner join users on blogs.author = users.author and blogs.articleTag like "%${articleTag}%" order by createtime desc limit ${(page - 1) * 10}, 10;`
  return exec(_sql)
}

// 根据title模糊查询文章
exports.findBlogByTitle = (keyworld) => {
  let _sql = `select * from blogs where title like '%${keyworld}%';`
  return exec(_sql)
}

// 查询用户点赞文章id
exports.getLikeByAuthor = (author) => {
  let _sql = `select article_id from likes where like_author = "${author}";` 
  return exec(_sql)
}

// 根据点赞查询分页文章
exports.getLikeByPage = (author) => {
  let _sql = `select blogs.article_id, createtime, articleTag, author, title,likeCount, articleImg, comments, reviews FROM blogs, likes where likes.like_author = '${author}' and likes.article_id = blogs.article_id order by likes.id desc `
  return exec(_sql)
}

// 新建文章
exports.createBlog = (values) => {
  let _sql = `insert into blogs set article_id=?, title=?, ellipsis=?, content=?, markdown=?, articleImg=?, articleType=?, articleTag=?, createtime=?, author=?`
  return exec(_sql, values)
}

// 修改文章
exports.updateBlog = (values) => {
  let _sql = `update blogs set title=?, ellipsis=?, content=?, markdown=?, articleImg=?, articleType=?, articleTag=? where article_id=?;`
  return exec(_sql, values)
}

// 设置轮轮播文章
exports.selectBlog = (id, articleType) => {
  let _sql = `update blogs set articleType='${articleType}' where article_id='${id}';`
  return exec(_sql)
}

// 获取轮轮播文章
exports.getCarousel = () => {
  let _sql = `select * from blogs where articleType = 'carousel';`
  return exec(_sql)

}
// 删除文章
exports.deleteBlog = (id) => {
  let _sql = `delete from blogs where article_id='${id}';`
  return exec(_sql)
}

// 通过文章id查找
exports.findBlogById = (id) => {
  let _sql = `select article_id, markdown, title, createtime, content, author, articleImg, comments, reviews, likeCount from blogs where article_id = "${id}" `
  return exec(_sql)
}

// 查询个人分页文章
exports.findBlogByAuthor = (author, page) => {
  let _sql = `select article_id, title, ellipsis, createtime, comments, reviews, articleTag, articleImg, author, likeCount from blogs where author = "${author}" order by createtime desc limit ${(page - 1) * 10}, 10;`
  return exec(_sql)
}

// 查询所有文章数量
exports.findAllBlogCount = () => {
  let _sql = `select count(*) as count from blogs;`
  return exec(_sql)
}

// 用户登陆
exports.login = (username) => {
  let _sql = `select * from users where username = "${username}";`
  return exec(_sql)
}

// 通过名字查找用户
exports.findUser = (author) => {
  let _sql = `select avatar, autograph, date, company, job, author from users where author like '%${author}%';`
  return exec(_sql)
}

// 通过手机号查找用户数量判断是否已经存在
exports.findDataCountByName = (username) => {
  let _sql = `select count(*) as count from users where username="${username}";`
  return exec(_sql)
}

// 新增用户
exports.addUser = (values) => {
  let _sql = `insert into users set password=?, username=?, date=?, author=?, avatar=?;`
  return exec(_sql, values)
}

// 修改用户信息
exports.updateUser = (values) => {
  let _sql = `update users set avatar=?, autograph=?, company=?, job=?, author=? where username=?;`
  return exec(_sql, values)
}

// 分页查询用户
exports.findUserByPage = (page) => {
  let _sql = `select avatar, autograph, date, company, job, author from users limit ${(page - 1) * 10}, 10;`
  return exec(_sql)
}

// 查询用户点赞数、评论、阅读总数
exports.findBlogbyUser = (author) => {
  let _sql = `select comments, reviews, likeCount from blogs where author="${author}";`
  return exec(_sql)
}

// 更新浏览数
exports.updateBlogPv = (id) => {
  let _sql = `update blogs set reviews = reviews + 1 where article_id="${id}";`
  return exec(_sql)
}

// 更新点赞数
exports.updateLikePv = (id) => {
  let _sql = `update blogs set likeCount = likeCount + 1 where article_id="${id}";`
  return exec(_sql)
}

// 更新评论数
exports.updateCommentPv = (id) => {
  let _sql = `update blogs set comments = comments + 1 where article_id="${id}";`
  return exec(_sql)
}

// 减少点赞数
exports.updateReducerLikePv = (id) => {
  let _sql = `update blogs set likeCount = likeCount - 1 where article_id="${id}";`
  return exec(_sql)
}

// 新增点赞
exports.createLike = (values) => {
  let _sql = `insert into likes set article_id=?, like_author=?;`
  return exec(_sql, values)
}

// 取消点赞
exports.deleteLike = (id, author) => {
  let _sql = `delete from likes where article_id='${id}' and like_author='${author}';`
  return exec(_sql)
}

// 新增关注
exports.following = (values) => {
  let _sql = `insert into follows set follow_author=?, following_author=?;`
  return exec(_sql, values)
}

// 取消关注
exports.removeFollow = (followingAuthor, followAuthor) => {
  let _sql = `delete from follows where following_author='${followingAuthor}' and follow_author='${followAuthor}';`
  return exec(_sql)
}

// 查询用户关注集合
exports.findFollowingList = (author) => {
  let _sql = `select follow_author as author from follows where following_author = '${author}';`
  return exec(_sql)
}

// 查询用户被关注集合
exports.findFollowList = (author) => {
  let _sql = `select following_author as author from follows where follow_author = '${author}';`
  return exec(_sql)
}

// 根据文章id查询评论
exports.findCommonListById = (id) => {
  let _sql = `select * FROM comment where article_id = '${id}' order by comment_time desc;`
  return exec(_sql)
}

// 新增评论
exports.addCommon = (values) => {
  let _sql = `insert into comment set article_id=?, comment_conent=?, comment_author=?, comment_time=?, comment_id=?;`
  return exec(_sql, values)
}

// 新增回复
exports.addReply = (values) => {
  let _sql = `insert into reply set comment_id=?, reply_conent=?, reply_author=?, reply_time=?, comment_author=?, reply_id=?, article_id=?;`
  return exec(_sql, values)
}

// 根据评论id查询回复
exports.findReplyListById = (id) => {
  let _sql = `select * FROM reply where comment_id = '${id}' order by reply_time desc;`
  return exec(_sql)
}

// 查找分享推荐
exports.findShareList = (type) => {
  let _sql = `select * from video where type = "${type}";`
  return exec(_sql)
}

// 新增分享
exports.addShareList = (values) => {
  let _sql = `insert into video set title=?, content=?, origin=?, location=?, imgUrl=?, type=?;`
  return exec(_sql, values)
}

exports.delShareList = (id) => {
  let _sql = `delete from video where id='${id}';`
  return exec(_sql)
}

