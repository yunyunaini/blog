<template>
  <div class="notice">
    <div class="notice-img">
      <img class="notice-img" src="https://img13.360buyimg.com/imagetools/jfs/t1/154343/19/13594/101357/5ff3dd4fE97253942/4f4c022c48bcc38f.jpg" alt="">
    </div>
    <div class="notice-content">
      <div>
        <i class="iconfont">&#xe601;</i>
        <span class="notice-content__text">社区运行公告</span>
      </div>
    </div>
    <div class="notice-list">
      <div class="notice-list__item">
        <span>文章总数：</span>
        <span>17</span>
      </div>
      <div class="notice-list__item">
        <span>注册会员：</span>
        <span>17</span>
      </div>
      <!-- <div class="notice-list__item">
        <span>注册会员：</span>
        <span>17</span>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { INFORMATION_LIST, Qlist } from '../../../global'
import { UserModule } from "../../../store/modules/user"
import authorInfo from '@/components/authorInfo/index.vue'

@Component({
  components: {
    authorInfo,
  }
})
export default class extends Vue {
  private lists: Qlist[] = INFORMATION_LIST
  get token() {
    return UserModule.token
  }
  get userInfo() {
    return UserModule.userInfo
  }
  private submit(action: string) {
    UserModule.handleIslogin(true)
    UserModule.handleLoggedType(action)
  }
}
</script>

<style lang="scss" scoped>
.notice {
  margin-bottom: 20px;
  width: 240px;
  background: #fff;
  &-img {
    width: 240px;
    height: 83px;
  }
}
.iconfont {
  font-size: 17px;
  padding-right: 4px;
  display: inline-block;
  vertical-align: middle;
}
.notice-content {
  padding: 8px 10px 10px 10px;
  cursor: pointer;
  font-size: 16px;
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-image: linear-gradient(90deg, #673AB7 0%, #E91E63 50%);
  &__text {
    vertical-align: middle;
  }
}
.notice-list {
  padding-bottom: 16px;
  &__item {
    font-size: 14px;
    margin-bottom: 10px;
    margin-left: 35px;
    border-radius: 5px;
    text-shadow: 0px 1px 0px #fff;
  }
}
</style>
