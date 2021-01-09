<template>
  <div class="card">
    <div class="box-card" shadow="never">
      <div class="clearfix">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class extends Vue {
  @Prop() private title!: string 
}
</script>
<style lang="scss" scoped>
.card {
  width: 240px;
  border-radius: 3px;
  margin-bottom: 20px;
  background: #fff;
  .clearfix {
    font-size: 16px;
    font-weight: 400;
    padding: 12px 15px;
    border-bottom: 1px solid $border-color;
  }
}
.iconfont {
  font-size: 16px;
  color: rgb(0, 127, 255);
  padding-right: 5px;
}
</style>
