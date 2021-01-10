<template>
  <van-swipe @change="onChange" class="carousel" indicator-color='#fff' :autoplay="4000" lazy-render width="100%">
    <van-swipeItem v-for="(item, index) in lists" :key="index">
      <router-link class="carousel-content" target="_blank" :to="{path: '/article', query: { articleId: item.article_id }}">
        <el-image fit="contain" class="carousel-img" :src = item.articleImg />
        <div class="mask"></div>
        <div class="carousel-panel">
          <div class="carousel-panel__title">{{item.title}}</div>
        </div>
      </router-link>
    </van-swipeItem>
    <template #indicator>
      <div class="custom-indicator">{{ current + 1 }}/{{lists.length}}</div>
    </template>
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
  private current: number = 0
  private async created() {
    getCarousel().then(res => {
      this.lists = res.data
    })
  };
  private onChange(index: number) {
    this.current = index
  }
}
</script>

<style lang="scss" scoped>
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.carousel {
  height: 200px;
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
    width: 100%;
    color: #fff;
    bottom: 0;
    @include flexcolumn($jc:space-around, $ai: none);
    background: linear-gradient(to bottom,rgba(6,6,8,0),rgba(6,6,8,.4));
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
