<template>
  <el-popover
    width="290"
    trigger="click"
  >
    <div class="type">
      <div class="type-title">
        发布文章
        <div class="type-publish">
          <el-button @click="sumbit" size="small">确定并发布</el-button>
        </div>
      </div>
      <div class="type-panel">
        <div class="panel-title">标签选择
          <span class="warning">(最多3项)</span>
        </div>
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
    </div>
    <span slot="reference" style="margin-right: 25px; color: #007fff; font-size: 16px; font-weight: 500; cursor: pointer;">
      <span>标签</span>
      <i class="el-icon-caret-bottom"></i>
    </span>
  </el-popover>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getArticleTags } from '../../../api/blog'
import { TAG_LIST } from '../../../global'


interface Tags {
  articleTag: string[]
}

@Component({
  name: 'articleType'
})

export default class extends Vue {
  @Prop() private updateTags!: string
  private options: object[]  = []
  private types: string[] = []

  @Watch('updateTags', {immediate:true})
    private async watchTags(val: string) {
      if (val) {
        this.types = val.split(',')
      }
    }
  private sumbit() {
    if (this.types.length <= 0) {
      this.$message({ message: '请选择文章标签', type: 'error' })
    } else {
      let tags:Tags = { articleTag: [] }
      this.types.forEach(item => {
        if (isNaN(parseInt(item))) {
          tags.articleTag.push(item)
        } else {
          let tag = TAG_LIST.filter(i => i.label === item)[0].value
          tags.articleTag.push(tag)
        }
      })
      this.$emit('submit', tags)
    }
  }
  private async created() {
    this.options = TAG_LIST.filter(item => item.value !== '全部')
  }
}

</script>

<style lang="scss" scoped>
.type {
  padding: 20px;
  .type-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: 700;
    color: hsla(218,9%,51%,.8);
  }
  .type-panel {
    margin-bottom: 10px;
    .panel-title {
      font-size: 16px;
      color: $fontcolor;
      margin-bottom: 10px;
    }
  }
}
</style>