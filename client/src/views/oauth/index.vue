<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class  extends Vue {
  created() {
    if (process.env.NODE_ENV === 'development') {
      window.location.href = 'https://github.com/login/oauth/authorize?client_id=648d810630237ddc91d2&redirect_uri=http://localhost:8080/redirect'
    } else {
      window.location.href = 'https://github.com/login/oauth/authorize?client_id=55e4c0ed566c7683c287&redirect_uri=https://qihang.3.cn/redirect'
    }
  }
}
</script>
