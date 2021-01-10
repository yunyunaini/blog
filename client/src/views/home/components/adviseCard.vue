<template>
  <div class="advise" @click="hadnleClick">
    <el-image
    style="width: 240px"
    :src="require('../../../assets/img/notice.png')"
    fit="fit" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getAbout } from '../../../api/blog'

@Component({
})
export default class extends Vue {
  private async hadnleClick() {
    const { data } = await getAbout()
    this.$router.push({
      path: '/about',
      query: {
        articleId: data[0].article_id
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.advise {
  margin-bottom: 20px;
}
</style>
