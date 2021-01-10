<template>
  <div class="container">
    <Header />
    <div class="main mg-top-80">
      <div class="article section">
        <div class="article-main">
          {{ article.title }}
        </div>
        <!-- <div class="article-img" v-if="article.articleImg">
          <img fit="contain" class="article-img" src="https://img13.360buyimg.com/imagetools/jfs/t1/154343/19/13594/101357/5ff3dd4fE97253942/4f4c022c48bcc38f.jpg" />
        </div> -->
        <div ref="article" v-highlight>
          <div class="article-content" v-html="article.content"></div>
        </div>
        <div class="article-comment">
          <comment />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/header/index.vue'
import comment from '@/components/comment/index.vue'
import { detailArticle } from '../../api/blog'
import { IArticleData } from '../../api/types'
const defaultArticle = {
  articleImg: '',
  article_id: 0,
  author: '',
  title: '',
  content: '',
  createtime: '',
  likeCount: 0,
  comments: 0,
  reviews: 0,
  markdown: '',
  islike: false
}

@Component({
  components: {
    Header,
    comment
  }
})
export default class extends Vue {
  private article: IArticleData = defaultArticle
  private async created() {
    const articleId: string | (string | null)[] = this.$route.query.articleId
    const { data } = await detailArticle({ id: articleId })
    this.article = data.article
  }
}
</script>

<style lang="scss" scoped>
.article {
  position: relative;
  background: #fff;
  padding: 0 2rem 2rem 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: default;
  @media only screen and (max-width: 767px) { 
    padding: 1rem;
  }

  &-header {
    @include flexcenter($jc: space-between);
    margin-bottom: 10px;
    .article-time {
      letter-spacing: 1px;
      @include textRoundRight();
      font-size: 1.1rem;
      color: $fontcolor;
    }
    .article-edit {
      color: $primary;
      position: relative;
      @include textRound($color:'#409EFF');
    }
  }

  &-img {
    text-align: center;
    width: 95%;
    margin: 0 auto;
    @media only screen and (max-width: 750px) { 
      height: 180px;
    }
  }

  &-main {
    font-size: 2.5rem /* 30/12 */;
    font-weight: 700;
    line-height: 1.5;
    margin: .67em 0;
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
    background-image: linear-gradient(90deg, #673AB7 0%, #E91E63 50%);
    @media only screen and (max-width: 769px) { 
      font-size: 2rem;
    }
  }
}
</style>
