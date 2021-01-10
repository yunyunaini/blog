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
          <!-- <div class="section-nav">
            <div class="section-nav__item section-nav__item--active">
              推荐
            </div>
            <div class="section-nav__item">
              热门
            </div>
            <div class="section-nav__item">
              点赞
            </div>
            <div class="section-nav__item">
              关注
            </div>
          </div> -->
          <div v-if="isEmpty">
            <empty description="该类目下还没有文章" />
          </div>
          <van-list v-model="loading" :finished="noMore" :finished-text="isEmpty ? '' : '没有更多内容了'" @load="onLoad" >
            <div class="section-list" v-for="(article, index) in articles" :key="index">
              <articleCard class="section-list__card" v-if="article.articleType !== 'about'" :article= article />
            </div>
          </van-list>
        </div>
      </div>
      <div class="asside">
        <AdviseCard />
        <!-- <NoticeCard /> -->
        <information />
        <sticky :z-index= 8 :sticky-top="70">
          <!-- <NavCard /> -->
          
          <QrCard />
          <rankingCard />
          <rewardCard />
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
import NavCard from '@/components/card/navCard/index.vue'
import tabs from '@/components/tabs/index.vue'
import empty from '@/components/emptyBox/index.vue'
import Sticky from '@/components/Sticky/index.vue'
import { UserModule } from '../../store/modules/user'
import QrCard from './components/qrcard.vue'
import AdviseCard from './components/adviseCard.vue'
import NoticeCard from './components/noticeCard.vue'
import { getArticles, getArticleTags, getSignature } from '../../api/blog'
import { IArticleData } from '../../api/types'
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
    QrCard,
    carousel,
    articleCard,
    NavCard,
    AdviseCard,
    NoticeCard,
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
      this.articles = this.articles.concat(data)
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
  }
}
</script>
<style lang="scss" scoped>
.section-message {
  height: 90px;
  margin-bottom: 15px;
  & > img {
    height: 90px;
    width: 100%;
  }
}

.section-nav {
  height: 46px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 0px 20px;
  background: #fff;
  border-bottom: 1px solid #e2e2e2;
  &__item {
    box-sizing: border-box;
    cursor: pointer;
    width: 48px;
    height: 26px;
    font-size: 14px;
    padding: 6px 10px;
    font-size: 14px;
    line-height: 1;
    margin-right: 20px;
    border-radius: 2px;
    &:hover {
      background-color: $primary;
      color: #fff;
    }
    &--active {
      background-color: $primary;
      color: #fff;
    }
  }
}
</style>


