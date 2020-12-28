<template>
  <div class="container">
    <Header :visible= visible />
    <sticky @scroll="handleScroll" :fixed-top= -306 :z-index= 9 :sticky-top="60">
      <div class="navigation" :class="{'navigation-fixed': !visible}" >
        <tabs :tabs = actions @click="selectNav" />
      </div>
    </sticky>
    <div class="main mg-top-126">
      <div class="section">
        <div class="section-carousel">
          <carousel />
        </div>
        <div class="section-wrapper mg-top-20">
          <div v-if="isEmpty">
            <empty description="该类目下还没有文章" />
          </div>
          <van-list v-model="loading" :finished="noMore" :finished-text="isEmpty ? '' : '没有更多内容了'" @load="onLoad" >
            <div class="section-list" v-for="(article, index) in articles" :key="index">
              <articleCard :article= article />
            </div>
          </van-list>
        </div>
      </div>
      <div class="asside">
        <!-- <information /> -->
        <sticky :z-index= 8 :sticky-top="70">
          <rewardCard />
          <rankingCard />
          <website />
        </sticky>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import carousel from './components/carousel.vue'
import information from './components/information.vue'
import articleCard from './components/articleCard.vue'
import rewardCard from './components/reward.vue'
import website from './components/website.vue'
import Header from '@/components/header/index.vue'
import rankingCard from '@/components/card/rankingCard/index.vue'
import tabs from '@/components/tabs/index.vue'
import empty from '@/components/emptyBox/index.vue'
import Sticky from '@/components/Sticky/index.vue'
import { getArticles, getArticleTags, getSignature } from '../../api/blog'
import { IArticleData } from '../../api/types'
import { fommentArticle } from '../../utils/formateArticle'
import { TAG_LIST, Qtag } from '../../global'
export interface Ifilters {
  page: number
  activeIndex: string
  articleTag: string
}
@Component({
  name:'home',
  components: {
    Header,
    carousel,
    articleCard,
    rankingCard,
    rewardCard,
    website,
    information,
    Sticky,
    tabs,
    empty
  }
})
export default class extends Vue {
  private articles: IArticleData[] = []
  private filters: Ifilters = { page: 1, activeIndex: '0', articleTag: '' }
  private visible: boolean = true
  private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false
  private disabled: boolean = false
  private actions: Qtag[] = TAG_LIST
  private handleScroll(event: boolean) {
    this.visible = event
  }
  private onLoad() {
    this.filters.page = this.filters.page + 1
    this.fetchData()
  }
  private async selectNav(tab: Qtag) {
    this.articles = []
    this.noMore = false
    this.isEmpty = false
    this.filters.page = 1
    this.filters.articleTag = tab.value
    this.fetchData()
  }
  private async fetchData() {
    this.loading = true
    if (this.filters.articleTag === '全部') {
      this.filters.articleTag = ''
    }
    const { data } = await getArticles(this.filters)
    if (data.length > 0) {
      this.articles = this.articles.concat(fommentArticle(data))
      this.loading = false
    } else {
      this.isEmpty = true
    }
    if (data.length < 10) {
      this.noMore = true
      this.loading = false
    }
  }
  private async created() {
    this.fetchData()
   
  //   wx.config({
  //     beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
  //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //     appId: 'ww21d6c9e1e8af4a2d', // 必填，企业微信的corpID
  //     timestamp: data.timestamp, // 必填，生成签名的时间戳
  //     nonceStr: data.noncestr, // 必填，生成签名的随机串
  //     signature: data.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
  //     jsApiList: ['getCurExternalChat', 'chooseImage'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
  //   })
  //   wx.ready(function(){
  //     wx.checkJsApi({
  //     jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  //     success: function(res) {
  //       console.log('hello')
  //         // 以键值对的形式返回，可用的api值true，不可用为false
  //         // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
  //     }
  //   });
  //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
  // });
    
  }
}
</script>
<style lang="scss" scoped>
</style>


