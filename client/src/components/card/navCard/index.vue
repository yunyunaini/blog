<template>
  <div class="card">
    <cardModule>
      <template v-slot:header>
        <i class="iconfont">&#xe689;</i>
        热门导航
      </template>
    </cardModule>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import cardModule from '../cardModule/index.vue'
import authorInfo from '../../authorInfo/index.vue'
import { getuserList } from '../../../api/user'
import { IUserInfo } from '../../../api/types'

@Component({
  components: {
    cardModule,
    authorInfo
  },
})
export default class extends Vue {
  private users: IUserInfo[] = []
  private async created() {
    const { data } = await getuserList({top: 3})
    this.users = data
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  color: $primary;
}
</style>
