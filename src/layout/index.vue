<script setup lang="ts">
  import { h, ref, defineAsyncComponent } from 'vue';
  import { RouterLink } from 'vue-router';
  import type { MenuOption } from 'naive-ui';
  import { useAppStore } from '/@/store';
  import { darkTheme } from 'naive-ui';
  import { NIcon } from 'naive-ui';
  import { HomeOutline as Home } from '@vicons/ionicons5';
  import Header from '/@/layout/components/header.vue';
  // import type { GlobalTheme } from 'naive-ui';

  // 导入logo
  import logo from '/@/assets/logo.png';
  import logoLight from '/@/assets/logo-light.png';
  import logoMini from '/@/assets/logo-mini.png';

  // 导入组件
  // const Header = defineAsyncComponent(() => import('/@/layout/components/header.vue'));
  const Main = defineAsyncComponent(() => import('/@/layout/components/main.vue'));

  // 设置主题
  const appStore = useAppStore();
  const theme = computed(() => {
    return appStore.theme;
  });
  const themeMenu = computed(() => {
    return appStore.theme === 'dark' ? darkTheme : null;
  });

  // 菜单栏图标处理
  const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) });
  };

  // 菜单栏标签处理
  const renderMenuLabel = (option: MenuOption) => {
    if ('href' in option) {
      return h('a', { href: option.href, target: '_blank' }, option.label as string);
    }
    return option.label as string;
  };

  // 菜单数据
  const menuOptions: MenuOption[] = [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: 'home',
              params: {
                lang: 'zh-CN',
              },
            },
          },
          { default: () => '首页' },
        ),
      key: 'hear-the-wind-sing',
      icon: renderIcon(Home),
    },
    {
      label: '1973年的弹珠玩具',
      key: 'pinball-1973',
      disabled: true,
      children: [
        {
          label: '鼠',
          key: 'rat',
        },
      ],
    },
    {
      label: '寻羊冒险记',
      key: 'a-wild-sheep-chase',
      disabled: true,
    },
    {
      label: '舞，舞，舞',
      key: 'dance-dance-dance',
      children: [
        {
          type: 'group',
          label: '人物',
          key: 'people',
          children: [
            {
              label: '叙事者',
              key: 'narrator',
            },
            {
              label: '羊男',
              key: 'sheep-man',
            },
          ],
        },
        {
          label: '饮品',
          key: 'beverage',
          children: [
            {
              label: '威士忌',
              key: 'whisky',
              href: 'https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin',
            },
          ],
        },
        {
          label: '食物',
          key: 'food',
          children: [
            {
              label: '三明治',
              key: 'sandwich',
            },
          ],
        },
        {
          label: '过去增多，未来减少',
          key: 'the-past-increases-the-future-recedes',
        },
      ],
    },
  ];

  // 是否折叠
  const collapsed = ref(true);

  // logo展示控制
  const logoShow = computed(() => {
    if (theme.value === 'light') {
      return logo;
    } else {
      return logoLight;
    }
  });
</script>

<template>
  <n-config-provider :theme="themeMenu">
    <n-space vertical>
      <n-layout has-sider class="w-screen h-screen bg-white dark:shadow-md" shadow="[4px_0_25px_0_#f3f3f3]">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <div class="flex justify-center items-center w-100%">
            <img :src="logoShow" class="w-52 h-31" alt="" v-if="collapsed === false" />
            <img :src="logoMini" class="w-50px h-50px mt-5px" alt="" v-if="collapsed === true" />
          </div>
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
          />
        </n-layout-sider>
        <n-layout>
          <Header />
          <Main />
        </n-layout>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>
<style scoped lang="less"></style>
