

CREATE TABLE`blogs`(
  `article_id` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '文章id',
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `content` longtext CHARACTER SET utf8mb4 NOT NULL COMMENT '内容',
  `createtime` bigint(20) NOT NULL COMMENT '创建时间',
  `author` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '作者',
  `likeCount` int(11) DEFAULT '0' COMMENT '点赞数',
  `markdown` longtext CHARACTER SET utf8mb4 NOT NULL COMMENT '语法',
  `comments` int(11) DEFAULT '0' COMMENT '评论数',
  `reviews` int(11) DEFAULT '0' COMMENT '预览数',
  `articleImg` longtext CHARACTER SET utf8 COMMENT '封面',
  `articleTag` varchar(45) CHARACTER SET utf8 DEFAULT '其他' COMMENT '标签',
  `articleType` varchar(45) CHARACTER SET utf8 NOT NULL COMMENT '类型',
  `ellipsis` longtext CHARACTER SET utf8mb4 COMMENT '简述',
  PRIMARY KEY(`article_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '文章表';


CREATE TABLE`comment`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `article_id` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '文章ID',
  `comment_conent` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `comment_author` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '作者',
  `comment_status` varchar(45) CHARACTER SET latin1 DEFAULT '0' COMMENT '状态',
  `comment_time` bigint(20) NOT NULL COMMENT '时间',
  `comment_id` varchar(45) CHARACTER SET latin1 NOT NULL COMMENT '评论id',
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '评论表';


CREATE TABLE`follows`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `follow_author` varchar(20) NOT NULL COMMENT '跟随者',
  `following_author` varchar(20) NOT NULL COMMENT '被跟随者',
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8 COMMENT = '关注表';

CREATE TABLE`likes`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `article_id` varchar(20) NOT NULL COMMENT '文章id',
  `like_author` varchar(20) NOT NULL COMMENT '点赞用户',
  `type` int(11) DEFAULT '0' COMMENT '类型',
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 20 DEFAULT CHARSET = utf8 COMMENT = '点赞表';


CREATE TABLE`reply`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `comment_id` varchar(45) CHARACTER SET utf8 NOT NULL COMMENT '评论ID',
  `reply_conent` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '回复内容',
  `reply_author` varchar(45) CHARACTER SET utf8 NOT NULL COMMENT '回复作者',
  `reply_time` bigint(20) NOT NULL COMMENT '时间',
  `comment_author` varchar(45) CHARACTER SET utf8 NOT NULL COMMENT '评论作者',
  `reply_id` varchar(45) CHARACTER SET utf8 NOT NULL COMMENT '回复ID',
  `article_id` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '文章id',
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '回复表';


CREATE TABLE`users`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `author` varchar(20) NOT NULL COMMENT '作者',
  `password` varchar(32) CHARACTER SET latin1 NOT NULL COMMENT '密码',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `avatar` longtext CHARACTER SET latin1 COMMENT '头像',
  `autograph` varchar(45) DEFAULT NULL COMMENT '爱好',
  `job` varchar(45) DEFAULT NULL COMMENT '工作',
  `company` varchar(45) DEFAULT NULL COMMENT '公司',
  `date` bigint(20) NOT NULL COMMENT '注册时间',
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8 COMMENT = '用户表';


CREATE TABLE`video`(
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `title` varchar(45) CHARACTER SET utf8 NOT NULL COMMENT '标题',
  `describe` longtext CHARACTER SET utf8 NOT NULL COMMENT '描述',
  `origin` varchar(45) CHARACTER SET utf8 NOT NULL COMMENT '来源',
  `location` longtext CHARACTER SET utf8 NOT NULL COMMENT '链接',
  `imgUrl` longtext CHARACTER SET utf8 NOT NULL COMMENT '图片',
  `type` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '类型',
  PRIMARY KEY(`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '分享表';


CREATE TABLE `message`(
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `resource` VARCHAR(45) NOT NULL COMMENT '反馈渠道',
  `content` LONGTEXT NOT NULL COMMENT '反馈内容',
  `phone` VARCHAR(45) NULL COMMENT '联系方式',
  `other` VARCHAR(45) NULL COMMENT '其他',
  PRIMARY KEY(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '反馈表';