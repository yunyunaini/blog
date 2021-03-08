
const router = require('koa-router')()
const userControl = require('../controller/user')
const commentControl = require('../controller/comment')
const blogControl = require('../controller/blog')
const actionsControl = require('../controller/actions')
const shareControl = require('../controller/share')

router.prefix('/api')

router.post('/user/login', userControl.login)
router.post('/user/managelogin', userControl.managelogin)
router.post('/user/logout', userControl.logout)
router.get('/user/getInfo', userControl.getUserInfo)
router.get('/user/getManInfo',userControl.getManageInfo)
router.get('/user/getuserList', userControl.getUserList)
router.post('/user/updateUser', userControl.updateUser)
router.post('/user/sendSmsCodeToUser', userControl.sendSmsCodeToUser)
router.post('/user/register', userControl.register)
router.post('/user/oauth', userControl.oauthLogin)
router.post('/user/findManage',userControl.findManage)
router.post('/user/addManage',userControl.addManage)
router.post('/user/deleteManage',userControl.deleteManage)



router.get('/comment/getComment', commentControl.getCommentList)
router.post('/comment/new', commentControl.createComment)
router.post('/comment/newReply', commentControl.createReply)

router.get('/blog/list', blogControl.getBlogList)
router.get('/blog/query_list', blogControl.getBlogListByAuthor)
router.get('/blog/detail', blogControl.getBlogDetail)
router.post('/blog/new', blogControl.createBlog)
router.post('/blog/update', blogControl.updateBlog)
router.post('/blog/delete', blogControl.deleteBlog)
router.post('/blog/select', blogControl.selectBlog)
router.get('/blog/getCarousel', blogControl.getCarousel)
router.get('/blog/getAbout', blogControl.getAbout)

router.post('/actions/like', actionsControl.addLike)
router.post('/actions/removelike', actionsControl.removeLike)
router.post('/actions/review', actionsControl.addReview)
router.get('/actions/getLikelists', actionsControl.getLikelist)
router.post('/actions/following', actionsControl.getFollowing)
router.post('/actions/unfollow', actionsControl.removeFollow)
router.get('/actions/followList', actionsControl.getFollowList)
router.get('/actions/search', actionsControl.getSearchResult)
router.post('/actions/message', actionsControl.addMessage)

router.get('/share/list', shareControl.getShareList)
router.post('/share/addList', shareControl.addShareList)
router.post('/share/delList', shareControl.delShareList)

module.exports = router