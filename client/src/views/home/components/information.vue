<template>
  <div>
    <div v-if="!token">
      <div class="information">
        <div class="information-content">
        <p class="information-content-title">嗨！朋友</p>
        <p>Better Life, Better Work</p>
      </div>
      <div class="information-bottom" @click="submit('login')">
        <span>登录</span>
      </div>
      </div>
    </div>
    <!-- <div v-else>
      <div class="information">
        <div class="information-userBg">
          <i class='mask'></i>
          <img object-fit='cover' src="https://img12.360buyimg.com/imagetools/jfs/t1/158709/26/2556/37403/5ff9717dE1a9ecded/14dd63d0c4070401.png" />
        </div>
        <div class="user user-bottom">
          <img class="user-avatar" :src= userInfo.avatar />
          <span class="user-name">{{userInfo.author}}</span>
        </div>
        <div class='user user-top'>
          <div class='user-info'>
            <span class="user-info__text">文章</span>
            <span>{{userInfo.blogs}}</span>
          </div>
          <div class='user-info'>
            <span class="user-info__text">点赞</span>
            <span>{{userInfo.likes || 0}}</span>
          </div>
          <div class='user-info'>
            <span class="user-info__text">关注</span>
            <span>{{userInfo.follows}}</span>
          </div>
          <div class='user-info'>
            <span class="user-info__text">粉丝</span>
            <span>{{userInfo.followings}}</span>
          </div>
        </div>
      </div>
    </div> -->
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
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.05);
  // background: linear-gradient(180deg, rgba(0,0,0,.03) 5%,rgba(0,0,0,.5));
}
.information {
  width: 100%;
  cursor: pointer;
  background: #fff;
  padding-bottom: 8px;
  margin-bottom: 20px;
  &-content {
    font-size: 14px;
    padding: 8px 16px 0 16px;
    &-title {
      margin-bottom: 10px;
      color: #bcbcbc;
    }
  }
  &-bottom {
    width: 70px;
    box-sizing: border-box;
    text-align: center;
    background: #0084ff;
    border: 1px solid #0084ff;
    border-radius: 3px;
    color: #fff;
    padding: 4px 8px;
    margin-left: 16px;
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
  }
}
.user {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  margin: 0px 20px;
  border-top: 1px solid #ebeef5;
  padding-top: 10px;
  height: 49px;
  &-company {
    color: #909090;
    font-size: 0.83333rem;
  }
  &-name {
    display: block;
    font-size: 14px;
    margin-top: 5px;
  }
  &-top {
    margin-top: 30px;
  }
  &-bottom {
    margin-bottom: 15px;
    border-top: none;
    padding-top: 75px;
    justify-content: center;
    flex-direction: column;
    // align-items: flex-end;
  }
  &-avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 2px solid #fff;
    margin-right: 10px;
  }
  &-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.4;
    font-size: 16px;
    color: #323232;
    &__text {
      font-size: 12px;
      color: #bcbcbc;
    }
  }
}
.information-userBg {
  width: 240px;
  height: 83px;
  position: absolute;
  overflow: hidden;
  &> img {
    width: 240px;
  }
}
</style>
