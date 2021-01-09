<template>
  <div class="article-footer">
    <div class="footer-content" @click.stop="handleClick(article.author)">
      <el-avatar size="small" :src="article.avatar"></el-avatar>
      <span class="author-name">{{article.author}}</span>
      <div class="footer-content__tags footer-item">
        <i class="iconfont">&#xe794;</i>
        <span>{{article.articleTag}}</span>
      </div>
    </div>
    <div class="footer-action">
     <span class="footer-action__item">
        <span>{{formatDate(article.createtime)}}</span>
      </span>
      <span class="footer-action__item">
        <i class="iconfont">&#xe600;</i>
        <span>{{article.comments}}</span>
      </span>
      <span class="footer-action__item">
        <i class="iconfont" v-if="!article.islike">&#xe67e;</i>
        <i class="iconfont" v-else :style="{color: article.islike ? '#6cbd65' : '' }">&#xe67e;</i>
        <span :style="{color: article.islike ? '#6cbd65' : '' }">{{article.likeCount}}</span>
      </span>
       <span class="footer-action__item mobile-none">
        <i class="iconfont">&#xe8c7;</i>
        <span>{{article.reviews}}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IArticleData } from '../../../api/types'
import formatDate from '../../../utils/formatDate'

@Component({
  components: {
  }
})

export default class extends Vue {
  @Prop() private article!: IArticleData

  private handleClick(author: string) {
    window.open(`/author?author=${author}`, '_blank')
  }
}
</script>

<style lang="scss" scoped>
.article-footer {
  @include flexcenter($jc: space-between, $ai: center);
  margin-top: 4px;
  font-size: 1.083333rem /* 13/12 */;
}
.author-name {
  padding: 0 10px;
  box-sizing: border-box;
  color: $title-name-color;
  cursor: pointer;
  &:hover {
    color: $primary;
  }
}
.el-avatar--small{
  width: 20px;
  height: 20px;
}
.footer-content {
  flex: 1;
  display: flex;
  align-items: center;

  &__tags {
    flex: 1;
    box-sizing: border-box;
    color: $title-name-color;
    @include nowrap();
    .iconfont {
      color: $title-name-color;
      padding-right: 5px;
    }
  }
}
.footer-action {
  font-size: 12px;
  color: #bcbcbc;
  display: flex;
  justify-content: center;

  &__item {
    text-align: center;
    height: 19px;
    display: inline-block;
    line-height: 19px;
    margin-left: 10px;
    padding: 0 5px;
    border-radius: 3px;
    background: rgb(230 230 230 / 26%);
    .iconfont {
      color: #bcbcbc;
      padding-right: 5px;
    }
  }
}
</style>
