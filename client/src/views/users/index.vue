<template>
  <div class="container">
    <Header />
    <div class="main">
      <div class="mg-top-80">
        <van-list :finished-text="isEmpty ? '' : '没有更多内容了'" v-model="loading" :finished="noMore" class="section" @load="onLoad">
          <div class="section-list" v-for="(user, index) in users" :key="index">
            <authorInfo :userInfo= user >
              <div slot="content" class="author-desc">
                <div class="info-desc">{{user.job}} @{{user.company || '添加公司'}}</div>
              </div>
            </authorInfo>
            <author-follow v-if="nickname !== user.nickname" :author = user.nickname ></author-follow>
          </div>
      </van-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getuserList } from '../../api/user'
import Header from '@/components/header/index.vue'
import authorInfo from '@/components/authorInfo/index.vue'
import authorFollow from '@/components/follow/index.vue'
import { IUserInfo } from '../../api/types'
import { UserModule } from '../../store/modules/user'

@Component({
  name:'home',
  components: {
    Header,
    authorInfo,
    authorFollow
  }
})
export default class extends Vue {
  private users: IUserInfo[] = []
  private page: number = 1
  private loading: boolean = false
  private noMore: boolean = false
  private isEmpty: boolean = false

  private async onLoad () {
    this.page = this.page + 1
    this.fetchData()
  }
  
  get nickname() {
    return UserModule.author
  }

  private async fetchData() {
    this.loading = true
    await getuserList({page: this.page, top: 20}).then(data => {
      if (data.data.length > 0) {
        this.users = this.users.concat(data.data)
        this.loading = false
      } else {
        this.isEmpty = true
      }
      if (data.data.length < 20) {
        this.noMore = true
        this.loading = false
      }
    })
  }

  private async created() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
.section {
  background: #fff;
  .section-list {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media only screen and (max-width: 767px) { 
      padding: 1.5rem 1rem;
    }
    &:hover {
      background: $hover-color;
    }
    .info-desc {
      color: #b9c0c8;
      font-size: 12px;
      padding: 5px 0;
    }
    .info-detail {
      color: #777d81;
      font-size: 12px;
    }
  }
}
</style>
