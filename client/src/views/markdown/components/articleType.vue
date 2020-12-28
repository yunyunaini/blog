<template>
  <el-popover
    width="290"
    trigger="click"
  >
    <div class="type">
      <div class="type-title">发布文章</div>
      <div class="type-panel">
        <div class="panel-title">标签</div>
        <el-select
          v-model="types"
          :multiple-limit = 3
          multiple
          size="small"
          placeholder="请选择文章标签">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.value"
            :value="item.label">
          </el-option>
        </el-select>
      </div>
      <div class="type-publish">
        <el-button @click="sumbit" size="medium">确定并发布</el-button>
      </div>
    </div>
    <span slot="reference" style="margin-right: 25px; color: #007fff; font-size: 16px; font-weight: 500; cursor: pointer;">
      <span>发布</span>
      <i class="el-icon-caret-bottom"></i>
    </span>
  </el-popover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getArticleTags } from '../../../api/blog'
import { TAG_LIST } from '../../../global'

interface Tags {
  articleType: string
  articleTag: string[]
}

@Component({
  name: 'articleType'
})

export default class extends Vue {
  private options: object[]  = []
  private types = []
  private sumbit() {
    if (this.types.length <= 0) {
      this.$message({ message: '请选择文章标签', type: 'error' })
    } else {
      let tags:Tags = {
        articleType:'前端', 
        articleTag: []
      }
      this.types.forEach(item => {
        let tag = TAG_LIST.filter(i => i.label === item)[0].value
        tags.articleTag.push(tag)
      })
      this.$emit('submit', tags)
    }
  }
  private async created() {
    TAG_LIST.shift()
    this.options = TAG_LIST
  }
}

</script>

<style lang="scss" scoped>
.type {
  padding: 20px;
  .type-title {
    margin-bottom: 18px;
    font-size: 18px;
    font-weight: 700;
    color: hsla(218,9%,51%,.8);
  }
  .type-panel {
    margin-bottom: 20px;
    .panel-title {
      font-size: 16px;
      color: $fontcolor;
      margin-bottom: 10px;
    }
  }
  .type-publish {
    width: 240px;
    text-align: center;
  }
}
</style>