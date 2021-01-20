<template>
  <div class="form">
    <div class="form-title">{{ type == 'login' ? '登录' : '注册' }}</div>
    <el-form :rules="rules" autocomplete="on" ref="Form" :model="formData" class="form-content">
      <el-form-item v-if="type === 'register'" prop="author">
        <el-input type="text" :autocomplete="type === 'login' ? 'on' : 'new-password'" v-model="formData.author" placeholder="请输入您的笔名"></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input type="text" v-model="formData.username" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item v-if="type === 'register'" prop="code">
        <el-input type="text" v-model="formData.code" placeholder="手机验证码">
          <template slot="append">
            <div @click="getCode" v-if="visible">获取验证码</div>
            <div class="reset" v-else>
              <span class="reset-time">{{ time }}</span> s后重发</div>
            </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" :autocomplete="type === 'login' ? 'on' : 'new-password'" placeholder="请输入密码(不少于3位)" v-model="formData.password" @keyup.enter.native="handleLogin" show-password></el-input>
      </el-form-item>
      <el-dialog title="请完成下列验证后继续:" top='25vh' width='290px' append-to-body :visible.sync="verifyVisible">
        <drag-verify-img 
          ref="sss"
          :isPassing="isPassing"
          :imgsrc="verifyImgs"
          :showRefresh="true"
          refreshIcon="el-icon-refresh-right"
          text="请按住滑块拖动"
          successText="验证通过"
          @reset="handleFail"
          handlerIcon="el-icon-d-arrow-right"
          successIcon="el-icon-circle-check"
          @passcallback="handleFail"
          @refresh="restImg"
        />
      </el-dialog>
      <el-button class="sumbit-btn"  @click.native.prevent="handleLogin" :loading="visibal" :type="visibal ? 'info' : 'primary'">{{ type === 'login' ? '登录' : '立即注册' }}</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Form as ElForm, Input, Message } from 'element-ui'
import { sendSmsCodeToUser } from '../../../api/user'
import dragVerifyImg from "../../dragVerifyImg/index.vue"

const images:string[] = [
    'https://img11.360buyimg.com/imagetools/jfs/t1/164555/4/3143/11762/6007caabEb5fa7bcb/2d82bd9b08cea834.png',
    'https://img13.360buyimg.com/imagetools/jfs/t1/34557/33/15262/5020/6007cdd6Ef88520ad/0234471c33ef055f.png'
  ]
@Component({
  name: 'formBox',
  components: {
    dragVerifyImg
  }
})
export default class extends Vue {
  @Prop() private type!: string
  @Prop() private visibal!: Boolean
  private verifyVisible: boolean = false
  private isPassing: boolean = false
  private verifyImgs:string = images[0]
  private visible:boolean = true
  private show:boolean = false // 点击登录后
  private time: number = 60
  
  private validateUsername = (rule: any, value: string, callback: Function) => {
    if (value.length < 1) {
      callback(new Error('请输入手机号'))
    } else {
      let reg = /^1[3|4|5|7|8][0-9]{9}$/
      reg.test(this.formData.username) ? callback() : callback(new Error('请输入正确的手机号码'))
    }
  }
  get showCode() {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/
    return reg.test(this.formData.username) ? true : false
  }

  @Watch('visibal')
  private watchVisibal (val: Boolean) {
    this.show = !val
  }

  private formData = { username: '', password: '', author: '' }
  private rules = {
    author: [{required: true, message: '请输入用户名', trigger: 'blur'}],
    username: [{ validator: this.validateUsername, trigger: 'blur'}],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, message: '密码不少于3位数', trigger: 'blur' }]
  }
  private handleLogin() {
    (this.$refs.Form as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.show = true
        this.$emit('onSubmit', this.formData)
      } else {
        return false
      }
    })
  }
  // 离开页面/刷新页面 重新运行计时器
  private monitor() {

  }

  private restImg() {
    this.verifyImgs = images[Math.floor((Math.random()*images.length))]
  }
  private async handleFail() {
    this.isPassing = true
    setTimeout(async () => {
      this.verifyVisible = false
      await sendSmsCodeToUser({username: this.formData.username}).then((res: any) => {
        Message({
          message: res.message,
          type: 'success',
          duration: 10 * 1000
        })
      })
      this.visible = false
      let timer = setInterval(() => {
        if (this.time > 1) { 
          this.time = this.time - 1
        } else {
          this.time = 60
          this.visible = true
          clearInterval(timer) 
        }
      }, 1000)
    }, 1000);
  }

  private async getCode() {
    console.log(this.isPassing)
    if (this.showCode === true && this.isPassing === false) {
      this.verifyVisible = true
    }
    if (this.isPassing === true) {
      await sendSmsCodeToUser({username: this.formData.username}).then((res: any) => {
        Message({
          message: res.message,
          type: 'success',
          duration: 10 * 1000
        })
      })
      this.visible = false
      let timer = setInterval(() => {
        if (this.time > 1) { 
          this.time = this.time - 1
        } else {
          this.time = 60
          this.visible = true
          clearInterval(timer) 
        }
      }, 1000)
    }
  } 
}
</script>

<style lang="scss" scoped>
.panfish {
  position: absolute;
  top: 0;
  left: 50%;
  width: 140px;
  transform: translate(-50%,-83%);
  z-index: 9;
}
.form-title {
  font-size: 20px;
  margin: 24px 0;
  font-weight: 600;
}
.sumbit-btn {
  width: 100%;
  height: 40px;
  color: #fff;
  cursor: pointer;
  margin-bottom: 18px;
}
.item-code {
  display: flex
}
</style>
