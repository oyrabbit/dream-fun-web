<script setup lang="ts">
  import { watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import { getDefaultWebsite } from '/@/api/home/index';
  import { useAppStore } from '/@/store';

  // import img1 from '/@/assets/images/background/1.png';

  const appStore = useAppStore();
  const theme = computed(() => {
    return appStore.theme;
  });

  const route = useRoute();
  // const back = 'url(' + img1 + ')';

  const websiteData: Ref<any> = ref([]);

  const getDefaultWebsiteData = async (fid: number) => {
    console.log(fid, 7898);

    await getDefaultWebsite(fid).then((res) => {
      const data = res?.data;
      const websiteDataTemp: any[] = [];
      // 获取所有分类
      const cates = data
        ?.filter((item: any, index: number) => data.findIndex((item1: any) => item?.category_id === item1?.category_id) === index)
        .map((item: any) => {
          return { id: item?.category_id, name: item?.category_name };
        });

      // 建立树形结构
      cates?.forEach((item: any) => {
        websiteDataTemp.push({
          id: item?.id,
          category: item?.name,
          websites: data
            ?.filter((item1: any) => item1?.category_id === item?.id)
            .map((item1: any) => {
              return {
                id: item1?.website_id,
                name: item1?.website_name,
                url: item1?.website_url,
                description: item1?.website_description,
              };
            }),
        });
      });
      websiteData.value = websiteDataTemp;
    });
  };

  const handleClick = (info: any) => {
    appStore.lastWebsite = {
      name: info.name,
      url: info.url,
    };
    if (!appStore.recommendWebsites.find((item: any) => item?.name === info.name)) {
      appStore.recommendWebsites.push({
        name: info.name,
        url: info.url,
        count: 1,
      });
    } else {
      appStore.recommendWebsites[appStore.recommendWebsites.findIndex((item: any) => item?.name === info.name)].count += 1;
    }
    window.open('http://' + info.url, '_blank');
  };
  watchEffect(() => {
    getDefaultWebsiteData(Number(route.query.fid));
  });
</script>

<template>
  <div class="default w-100% h-100% px-20px py-20px">
    <div class="mb-20px px-15px py-10px bg-white dark:bg-#18181c" border-rd="[10px]" v-for="item in websiteData" :key="item.id">
      <div class="text-16px font-600">{{ item.category }}</div>
      <div class="website-list px-20px py-15px">
        <div
          :class="{
            'website-box': true,
            'light-box': theme !== 'dark',
            'dark-box': theme === 'dark',
          }"
          border-rd="[10px]"
          v-for="item1 in item.websites"
          :key="item1.id"
          @click="handleClick(item1)"
        >
          <div class="w-45px h-45px mr-15px px-10px py-10px">
            <img class="w-100%" border-rd="[10px]" :src="'https://api.iowen.cn/favicon/' + item1.url + '.png'" alt="" />
          </div>
          <div class="w-120px whitespace-nowrap overflow-hidden">
            <div class="text-16px">{{ item1.name }}</div>
            <div class="text-10px" text="[#707070]">{{ item1.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  .default {
    position: relative;
    // background-image: v-bind(back);
    // background-repeat: no-repeat;
    // background-position: center;
  }

  .website-box {
    display: flex;
    align-items: center;
    width: 220px;
    height: 68px;
    padding: 0 15px;
    cursor: pointer;
  }

  .dark-box {
    box-shadow: 0 0 14px 2px #313131;
    border: 1px solid rgb(46 46 46);

    &:hover {
      background-color: #212121;
    }
  }

  .light-box {
    box-shadow: 0 0 14px 2px #e5e5e5;
    border: 1px solid rgb(225 225 225);

    &:hover {
      background-color: #e2e2e2;
    }
  }

  .website-list {
    display: grid;
    grid-gap: 25px 40px;
    grid-template-columns: repeat(auto-fill, 210px);
  }
</style>
