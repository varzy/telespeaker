<template>
  <div class="home">
    <aside class="home-aside">
      <div class="header">
        <div class="logo">
          <div class="logo-inner" @click="$router.push({ name: 'Home' })">
            <img class="image" src="@/assets/images/logo.png" alt="logo" />
            <div class="project">
              <div class="project-name">{{ projectName }}</div>
              <div class="project-meta">{{ envLabel }} {{ projectVersion }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu">
        <a-menu
          class="menu-nav"
          mode="inline"
          v-model:selectedKeys="calcSelectedMenuKeys"
          @click="handleMenuSelected"
        >
          <a-menu-item v-for="route in menuItems" :key="route.name">
            {{ route.meta.title }}
          </a-menu-item>
        </a-menu>
      </div>
    </aside>

    <section class="home-body">
      <header class="home-body-header">
        <div class="left">
          <h3 class="title" v-if="calcCurrentRouteTitle">{{ calcCurrentRouteTitle }}</h3>
        </div>

        <div class="right">
          <span>Welcome</span>
        </div>
      </header>

      <main class="home-body-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :key="$route.fullPath" :is="Component" />
          </transition>
        </router-view>

        <div class="home-body-main-footer">
          <span class="copyright">&copy; {{ new Date().getFullYear() }}</span>
          <a-divider type="vertical"></a-divider>
          <span>Telespeaker</span>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import { version as projectVersion } from '../../../package.json';
import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { PROJECT_NAME } from '@/config/constants';

function useProjectMeta() {
  const route = useRoute();

  const appEnv = process.env.VUE_APP_ENV;
  const relation = {
    development: '开发环境',
    testing: '测试环境',
    production: '正式环境',
  };
  const envLabel = appEnv && relation[appEnv] ? relation[appEnv] : '未知环境';

  const calcCurrentRouteTitle = computed(() => route?.meta?.title);

  return { projectName: PROJECT_NAME, projectVersion, envLabel, calcCurrentRouteTitle };
}

function useMenu() {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();

  const menuItems = store.state.view.navigation;
  const calcSelectedMenuKeys = computed(() => [route.name]);
  const handleMenuSelected = ({ key }) => {
    router.push({ name: key });
  };

  return { menuItems, calcSelectedMenuKeys, handleMenuSelected };
}

export default defineComponent({
  name: 'Home',

  setup() {
    return { ...useProjectMeta(), ...useMenu() };
  },
});
</script>

<style scoped lang="scss">
$height-header: 56px;
$bgc-page: #f9f9f9;
$bgc-header: #fff;
$bgc-aside: #fff;

.home {
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: $bgc-page;

  &-aside {
    width: 256px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    z-index: 502;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.08);

    .header {
      background-color: $bgc-aside;
      position: relative;
      display: flex;
      height: 96px;
      font-size: 14px;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;

      .logo {
        background-color: $bgc-aside;
        position: relative;
        display: flex;
        height: 96px;
        font-size: 14px;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;

        &-inner {
          cursor: pointer;
          display: flex;
          align-items: center;

          .image {
            width: 56px;
            height: 56px;
          }

          .project {
            margin-left: 8px;
            flex: 1;
            height: 100%;

            &-name {
              font-size: 20px;
              font-weight: bold;
            }

            &-meta {
              color: #777;
              font-size: 14px;
            }
          }

          .text {
            margin-left: 8px;
          }
        }

        .version_mark {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #ffe9d6;
          padding: 2px 4px;
        }
      }
    }

    .menu {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;

      &-nav {
        height: 100%;
        border-right: 0;
      }
    }
  }

  &-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;

    &-header {
      background-color: $bgc-header;
      height: $height-header;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 16px;
      padding-right: 16px;
      z-index: 501;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.08);

      .left {
        .title {
          margin: 0;
          padding: 0;
        }
      }
    }

    &-main {
      flex: 1;
      min-width: 0;
      min-height: 0;
      height: 100%;
      overflow: hidden auto;
      padding: 16px;

      &-footer {
        text-align: center;
        color: #666;
        font-size: 14px;
        margin-top: 48px;
        margin-bottom: 36px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
// 页面切换动效
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

// 渐显渐隐
.fade-effect-enter-active,
.fade-effect-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-effect-enter-from,
.fade-effect-leave-to {
  opacity: 0;
}
</style>
