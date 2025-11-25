<script setup>
import {
  getRoomDetail,
  getIsCollect,
  updateCollect,
  addCollect,
  delCollect,
} from "../../api/zuke";
import { ref } from "vue";
import dayjs from "dayjs";
import Taro from "@tarojs/taro";
// 组件参数
const roomDetail = ref({});
// 轮播图列表
const swiperList = ref([]);
// 获取房源详情
const getRoomDetailData = async () => {
  let id = Taro.getCurrentInstance().router?.params?.id;
  const res = await getRoomDetail(id);
  if (res.code == 0) {
    roomDetail.value = res.data;
    swiperList.value = res.data.fangwutupian.split(",");
  }
};
getRoomDetailData();
// 获取是否收藏
const isCollect = ref(false);
const getIsCollectData = async () => {
  let id = Taro.getCurrentInstance().router?.params?.id;
  let userid = Taro.getStorageSync("userid");
  let param = {
    page: 1,
    limit: 1,
    type: 1,
    refId: id,
    tableName: "fangyuanxinxi",
    userid: userid,
  };
  const res = await getIsCollect(param);
  if (res.code == 0) {
    isCollect.value = res.data.length > 0;
  }
};
getIsCollectData();
</script>
<template>
  <div>
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
          alt=""
          style="height: 100%; width: 100%"
          draggable="false"
        />
      </nut-swiper-item>
    </nut-swiper>
    <div class="content">
      <div class="top">
        <h1>{{ roomDetail.fangyuanbianhao }}</h1>
        <div v-if="!isCollect">
          <span>收藏</span
          ><Image src="../../assets/cancelLike.png" alt="" class="img" />
        </div>
        <div v-else>
          <span>取消收藏</span
          ><Image src="../../assets/like.png" alt="" class="img" />
        </div>
      </div>
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
  padding: 20px;
  flex-direction: column;
  .top {
    display: flex;
    h1 {
      font-size: 36px;
    }
    .img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
