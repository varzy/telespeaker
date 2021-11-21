<template>
  <el-container class="index">
    <el-aside width="200px">
      <el-menu
        default-active="SendPhoto"
        class="el-menu-vertical-demo"
        @select="handleMenuSelected"
      >
        <el-menu-item index="SendPhoto">
          <span>发照片</span>
        </el-menu-item>
        <el-menu-item index="SendMessage">
          <span>发消息</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <h2 v-if="routeTitle">{{ routeTitle }}</h2>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Index',

  setup() {
    const route = useRoute();
    const router = useRouter();

    const routeTitle = computed(() => route?.meta?.title);

    const handleMenuSelected = (index) => {
      router.push({ name: index });
    };

    return { routeTitle, handleMenuSelected };
  },
};
</script>

<style lang="scss" scoped>
.index {
  height: 100vh;
  overflow: hidden;
}
</style>
