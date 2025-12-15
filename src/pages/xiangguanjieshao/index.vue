<script setup>
import { getWebsiteInfo } from "../../api/zuke";
import { ref } from "vue";
import myImage from "../../components/myImage.vue";
// 组件参数
const websiteInfo = ref({});
const swiperList = ref([]);
// 组件方法
const getWebsiteInfoData = async () => {
  const res = await getWebsiteInfo();
  if (res.code == 0) {
    websiteInfo.value = res.data;
    swiperList.value.push(websiteInfo.value.picture1);
    swiperList.value.push(websiteInfo.value.picture2);
    swiperList.value.push(websiteInfo.value.picture3);
  }
};
getWebsiteInfoData();
</script>

<template>
  <div class="container">
    <nut-swiper
      :init-page="2"
      :auto-play="3000"
      pagination-visible
      pagination-color="#426543"
      pagination-unselected-color="#808080"
      class="square-swiper"
    >
      <nut-swiper-item
        v-for="(item, index) in swiperList"
        :key="index"
        class="square-swiper-item"
      >
        <myImage :src="item" :style="{ height: '100%', width: '100%' }" />
      </nut-swiper-item>
    </nut-swiper>
    <div class="content">
      <div class="title">标题</div>
      <div class="desc">{{ websiteInfo.title }}</div>
      <div class="title">副标题</div>
      <div class="desc">{{ websiteInfo.subtitle }}</div>
      <div class="title">内容</div>
      <div class="content-desc">{{ websiteInfo.content }}</div>
    </div>
  </div>
</template>
<style lang="scss">
.square-swiper {
  width: 100%;
  height: 600px;
}
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #f7f7f7;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 20px;
  .title {
    font-size: 32px;
    font-weight: 400;
    color: black;
    margin: 10px 0;
  }
  .desc {
    font-size: 28px;
    font-weight: 400;
    color: black;
    margin: 10px 0;
  }
  .content-desc {
    font-size: 28px;
    font-weight: 400;
    color: #808080;
    margin: 10px 0;
  }
}
</style>
