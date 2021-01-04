<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class  extends Vue {
  created() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=55e4c0ed566c7683c287&redirect_uri=https://qihang.3.cn/redirect'
  }
}
</script>
