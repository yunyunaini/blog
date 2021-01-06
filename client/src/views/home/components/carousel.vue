<template>
  <van-swipe class="carousel" indicator-color='#fff' :autoplay="3000" lazy-render width="100%">
    <van-swipeItem v-for="(item, index) in lists" :key="index">
      <router-link class="carousel-content" target="_blank" :to="{path: '/article', query: { articleId: item.article_id }}">
        <el-image fit="contain" class="carousel-img" :src = item.articleImg />
        <div class="carousel-panel">
          <div class="carousel-panel__title">{{item.title}}</div>
          <div class="carousel-panel__info">
            <span class="carousel-name">{{item.author}}</span>
            <span class="split-line">—</span>
            <span class="carousel-time">{{formatDate(item.createtime)}}</span>
          </div>
        </div>
      </router-link>
    </van-swipeItem>
  </van-swipe>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticleData } from '../../../api/types'
import { getCarousel } from '../../../api/blog'
import formatDate from '../../../utils/formatDate'
@Component
export default class extends Vue {
  private lists: any = []
  private async created() {
    getCarousel().then(res => {
      this.lists = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  height: 14.166667rem /* 170/12 */;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  @media only screen and (max-width: 767px) { 
    height: 12rem;
    border-radius: 0px;
  }
  .carousel-content {
    width: 100%;
    height: 100%;
    position: relative;
    cursor: default;
  }
  .carousel-img {
    width: 100%;
    height: 100%;
  }
  .carousel-panel {
    position: absolute;
    padding: 2rem /* 24/12 */;
    box-sizing: border-box;
    z-index: 9;
    bottom: 0;
    width: 100%;
    color: #fff;
    @include flexcolumn($jc:space-around, $ai: none);
    background: linear-gradient(to bottom,rgba(6,6,8,0),rgba(6,6,8,.6));
    @media only screen and (max-width: 767px) { 
      padding: 1rem;
    }

    &__title {
      font-size: 2rem;
      font-weight: bold;
      @include nowrap();
      @media only screen and (max-width: 767px) { 
        font-size: 1.5rem;
      }
    }
    &__info {
      color: rgba(255,255,255,.5);
      font-size: 1.1rem;
      line-height: 1.5;
      @media only screen and (max-width: 767px) { 
        font-size: 1rem;
      }
      .carousel-name {
        color: #fff;
        vertical-align: middle;
      }
      .split-line {
        padding: 0 1rem;
        vertical-align: middle;
      }
      .carousel-time {
        vertical-align: middle;
      }
    }
  }
}
</style>
