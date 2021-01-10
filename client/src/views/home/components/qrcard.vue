<template>
  <div class="card">
    <div class="card-share">
      <img
        style="height: 60px"
        src="https://img14.360buyimg.com/imagetools/jfs/t1/156810/3/5213/2557/5ff9cf71E79f57dcf/c82e1a2f1a428833.png"
        fit="contain"
        />
      <div class="card-title">
        <div class="card-title__text">起航技术交流群</div>
          掌握潮流前端技术，玩转优质用户体验！
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.card {
  width: 240px;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 10px;
  .card-share {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .card-title {
      font-size: 12px;
      margin-left: 5px;
      color: #909090;
      &__text {
        font-size: 15px;
        font-weight: 600;
        color: #333;
        padding-bottom: 6px;
      }
    }
  }
}
</style>
