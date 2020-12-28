<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class  extends Vue {
  created() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=648d810630237ddc91d2&redirect_uri=http://localhost:8080/redirect'
  }
}
</script>
