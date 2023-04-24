<template>
  <n-layout-header class="flex content-center justify-end sticky z-998 top-0 left-0 w-100% h-15 py-0">
    <el-tooltip :content="theme === 'light' ? '设置暗黑主题' : '设置明亮主题'">
      <el-button
        class="nav-btn mr-3 mt-0.5"
        :shape="'circle'"
        type="info"
        plain
        :icon="theme === 'dark' ? Sunny : Moon"
        circle
        size="small"
        @click="toggleTheme()"
      />
    </el-tooltip>
    <iconpark-icon size="22" name="theme" class="mr-3" />
    <iconpark-icon size="22" name="setting-one" class="mr-1" />
    <n-divider vertical title-placement="center" />
    <n-avatar size="small" :src="head" round class="ml-1 mr-20px" />
    <div class="n-layout-header__border bg-#efeff5 dark:bg-#ffffff17"></div>
  </n-layout-header>
</template>
<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core';
  import { useAppStore } from '/@/store';
  import { Sunny, Moon } from '@element-plus/icons-vue';
  import head from '/@/assets/head.jpg';
  const appStore = useAppStore();
  // const useStore = useUserStore()
  const theme = computed(() => {
    return appStore.theme;
  });
  const isDark = useDark({
    selector: 'body',
    onChanged(dark: boolean) {
      appStore.toggleTheme(dark);
    },
  });
  const toggleTheme = useToggle(isDark);
</script>

<style scoped lang="less">
  :deep(.n-divider--vertical) {
    height: unset;
    justify-content: flex-end;
  }

  .n-layout-header__border {
    content: '';
    position: absolute;
    top: 60px;
    bottom: 0;
    width: 100%;
    height: 1px;
    transition: background-color 0.3s var(--n-bezier);
  }
</style>
