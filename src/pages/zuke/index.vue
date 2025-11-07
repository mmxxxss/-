<template>
  <div class="container" :style="{ paddingTop: statusBarHeight + 'px' }">
    <div
      class="title"
      :style="{ height: topHeight + 'px', lineHeight: topHeight + 'px' }"
    >
      大学生租客平台
    </div>
    <nut-swiper
      :init-page="2"
      :auto-play="3000"
      pagination-visible
      pagination-color="#426543"
      pagination-unselected-color="#808080"
    >
      <nut-swiper-item
        v-for="(item, index) in swiperList"
        :key="index"
        style="height: 150px"
      >
        <img
          :src="'http://localhost:8080/zufangguanli/' + item.value"
          alt=""
          class="swiper-img"
          draggable="false"
        />
      </nut-swiper-item>
    </nut-swiper>
    <div class="menu-list">
      <div class="menu-item">
        <image src="../../assets/tongzhigonggao.png" alt="" class="img" />
        <span>通知公告</span>
      </div>
      <div class="menu-item">
        <image src="../../assets/fangwuzixun.png" alt="" class="img" />
        <span>房屋咨询</span>
      </div>
      <div class="menu-item">
        <image src="../../assets/fangyuanxinxi.png" alt="" class="img" />
        <span>房源信息</span>
      </div>
      <div class="menu-item">
        <image src="../../assets/liuyanban.png" alt="" class="img" />
        <span>留言板</span>
      </div>
    </div>
    <div class="homeMessage">
      <div class="h-top">
        <span class="h-t-title">房源信息推荐</span>
        <span class="h-t-more">查看更多+</span>
      </div>
      <div class="h-content">
        <div v-for="(item, index) in houseList" :key="index" class="h-c-item">
          <img
            :src="
              'http://localhost:8080/zufangguanli/' +
              item.fangwutupian.split(',')[0]
            "
            alt=""
            class="h-c-i-img"
            draggable="false"
          />
          <div class="h-c-i-name">房屋名称：{{ item.fangwumingcheng }}</div>
          <div class="h-c-i-address">房屋地址：{{ item.fangwudizhi }}</div>
          <div class="h-c-i-price">租赁价格：{{ item.zulinjiage }}元/月</div>
          <div class="h-c-i-phone">联系电话：{{ item.shoujihao }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getSwiperList, getHouseList } from "../../api/zuke";

const swiperList = ref([]);
const houseList = ref([]);
onMounted(async () => {
  const res = await getSwiperList();
  if (res.code == 0) {
    swiperList.value = res.data.list;
  }
  const res2 = await getHouseList({
    sfsh: "是",
    page: 1,
    limit: 4,
  });
  if (res2.code == 0) {
    houseList.value = res2.data.list;
  }
});
const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 获取胶囊信息
const systemInfo = wx.getSystemInfoSync(); // 获取设备信息
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
// 状态栏到胶囊的间距
const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight;
const menuButtonHeight = menuButtonInfo.height; // 胶囊高度
const topHeight = menuButtonStatusBarGap * 2 + menuButtonHeight;
</script>
<style lang="scss">
.title {
  width: 100%;
  font-size: 32px;
  font-weight: 400;
  text-align: center;
}
.swiper-img {
  height: 100%;
  width: 90%;
  border-radius: 20px;
  margin: 0 auto;
  display: block;
}
.menu-list {
  margin-top: 20px;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(177, 58, 61);
  .menu-item {
    width: 25%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    .img {
      width: 55px;
      height: 55px;
      margin-bottom: 10px;
    }
  }
}
.homeMessage {
  margin-top: 20px;
  padding: 0 30px;
  .h-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    .h-t-title {
      font-size: 36px;
    }
  }
  .h-content {
    width: 100%;
    display: flex;
    overflow: auto;
    .h-c-item {
      margin: 10px;
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;
      border-radius: 20px;
      padding: 10px;
      box-sizing: border-box;
      .h-c-i-img {
        width: 320px;
        height: 300px;
        border-radius: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
