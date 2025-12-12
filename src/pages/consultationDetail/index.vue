<script setup>
import { getConsultationDetail } from "../../api/zuke";
import { ref } from "vue";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
// 组件参数
const consultationDetail = ref({});
const swiperList = ref([]);
// 组件方法
const getConsultationDetailData = async () => {
  let id = Taro.getCurrentInstance().router?.params?.id;
  const res = await getConsultationDetail(id);
  if (res.code == 0) {
    consultationDetail.value = res.data;
    swiperList.value = consultationDetail.value.tupian.split(",");
  }
};
const previewImg = (src) => {
  Taro.previewImage({
    urls: [src],
  });
};
getConsultationDetailData();
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
        <img
          :src="'http://localhost:8080/zufangguanli/' + item"
          style="height: 100%; width: 100%"
          draggable="false"
          @click="previewImg('http://localhost:8080/zufangguanli/' + item)"
        />
      </nut-swiper-item>
    </nut-swiper>
    <div class="content">
      <h2 class="title">{{ consultationDetail.biaoti }}</h2>
      <p class="desc">简介：{{ consultationDetail.jianjie }}</p>
      <p class="desc">内容：{{ consultationDetail.neirong }}</p>
      <p class="time desc">
        时间：{{ dayjs(consultationDetail.fabushijian).format("YYYY-MM-DD") }}
      </p>
    </div>
  </div>
</template>
<style lang="scss">
.square-swiper {
  width: 100%;
  height: 600px;
}
.content {
  display: flex;
  flex-direction: column;
  padding: 20px;
  .title {
    font-size: 40px;
    font-weight: bold;
    color: black;
  }
  .desc {
    font-size: 24px;
    font-weight: 400;
    color: #808080;
    margin-top: 20px;
  }
  .time {
    align-self: flex-end;
  }
}
</style>
