import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "paper" */ './views/home/index.vue'),
    meta: { title: "起航-前端技术社区" },
  },
  {
    path: "/author",
    name: "author",
    component: () => import(/* webpackChunkName: "paper" */ './views/author/index.vue'),
    meta: { title: "个人主页 - 起航" },
  },
  {
    path: "/article",
    name: "article",
    component: () => import(/* webpackChunkName: "paper" */ './views/article/index.vue'),
  },
  {
    path: "/questions",
    name: "questions",
    component: () => import(/* webpackChunkName: "paper" */ './views/questions/index.vue'),
    meta: { title: "等你来答 - 起航" },
  },
  {
    path: "/checkAsk",
    name: "checkAsk",
    component: () => import(/* webpackChunkName: "paper" */ './views/checkAsk/index.vue'),
    meta: { title: "问答 - 起航" },
  },
  {
    path: "/ask",
    name: "ask",
    component: () => import(/* webpackChunkName: "paper" */ './views/ask/index.vue'),
    meta: { title: "提问 - 起航" },
  },
  {
    path: "/users",
    name: "users",
    component: () => import(/* webpackChunkName: "paper" */ './views/users/index.vue'),
    meta: { title: "用户 - 起航" },
  },
  {
    path: "/hot",
    name: "hot",
    component: () => import(/* webpackChunkName: "paper" */ './views/hot/index.vue'),
    meta: { title: "视频 - 起航" },
  },
  {
    path: "/share",
    name: "share",
    component: () => import(/* webpackChunkName: "paper" */ './views/share/index.vue'),
    meta: { title: "发现 - 起航" },
  },
  {
    path: "/search",
    name: "search",
    component: () => import(/* webpackChunkName: "paper" */ './views/search/index.vue'),
    meta: { title: "搜索 - 起航" },
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import(/* webpackChunkName: "paper" */ './views/settings/index.vue'),
    meta: { title: "个人资料 - 起航" },
  },
  {
    path: "/markdown",
    name: "markdown",
    component: () => import(/* webpackChunkName: "paper" */ './views/markdown/index.vue'),
    meta: { title: "写文章" },
  },
  {
    path: "/oauth",
    name: "oauth",
    component: () => import(/* webpackChunkName: "paper" */ './views/oauth/index.vue'),
  },
  {
    path: "/redirect",
    name: "redirect",
    component: () => import(/* webpackChunkName: "paper" */ './views/redirect/index.vue'),
  },
  {
    path: "/excellent",
    name: "excellent",
    component: () => import(/* webpackChunkName: "paper" */ './views/excellent/index.vue'),
  },
   {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "paper" */ './views/about/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
