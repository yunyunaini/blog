<template>
  <router-link class="article" target="_blank" :to="{path: '/article', query: { articleId: article.article_id }}">
    <div class="article-imgWrap mobile-none" v-if="article.articleImg">
      <el-image fit="cover" lazy class="article-img" :src = article.articleImg ></el-image>
      <!-- <div class="article-type">{{article.articleType}}</div> -->
    </div>
    <div class="article-content">
      <div class="article-title">{{article.title}}</div>
      <div class="article-desc">{{article.ellipsis}}</div>
      <articleAction :article= article />
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import articleAction from './articleAction.vue'
import { IArticleData } from '../../../api/types'

@Component({
  components: {
    articleAction
  }
})
export default class extends Vue {
  @Prop() private article!: IArticleData
}
</script>

<style lang="scss" scoped>
.article {
  width: 100%;
  padding: 1rem 1.34rem;
  overflow: hidden;
  background: #fff;
  box-sizing: border-box;
  border-bottom: 1px solid $border-color;
  @include flexcenter($jc: space-between, $ai: center);
  @media only screen and (max-width: 767px) { 
    padding: 1.5rem 1rem;
  }
  &-title {
    display: flex;
    &__text {
      padding-left: 8px;
    }
  }
  &:hover {
    background-color: $hover-color;
  }
  .article-imgWrap {
    width: 165px;
    height: 134px;
    margin-right: 16px;
    box-sizing: border-box;
    background-color: #fff;
    overflow: hidden;
    position: relative;
  }

  &-img {
    width: 165px;
    height: 114px;
    position: relative;
    transition: all 0.3s;
    overflow: hidden;
    &:hover {
      transform: scale(1.2);
    }
  }
  
  .article-content {
    flex: 1;
    height: 114px;
    overflow: hidden;
    box-sizing: border-box;
    @include flexcolumn($jc:space-between, $ai: none);
    @media only screen and (max-width: 767px) { 
      height: 124px;  
    }
    .article-desc {
      line-height: 1.5;
      font-size: 14px;
      font-size: 1.083333rem /* 13/12 */;
      @include twoLines($clamp: 2);
      color: $title-name-color;
    }
  }
}
.article-type {
  position: absolute;
  color: #fff;
  background-color: red;
  padding: 3px 10px;
  top: 10px;
  left: 10px;
  font-size: 12px;
  z-index: 6;
}
</style>
