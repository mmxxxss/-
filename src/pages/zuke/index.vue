<template>
  <div
    class="container"
    :style="{
      paddingTop: statusBarHeight + topHeight + 'px',
      paddingBottom: '20px',
    }"
  >
    <div
      class="title"
      :style="{
        height: topHeight + 'px',
        lineHeight: topHeight + 'px',
        paddingTop: statusBarHeight + 'px',
        top: 0,
      }"
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
      <div class="menu-item" @click="toNotice">
        <image src="../../assets/tongzhigonggao.png" alt="" class="img" />
        <span>通知公告</span>
      </div>
      <div class="menu-item" @click="toConsultation">
        <image src="../../assets/fangwuzixun.png" alt="" class="img" />
        <span>房屋咨询</span>
      </div>
      <div class="menu-item" @click="toRoom">
        <image src="../../assets/fangyuanxinxi.png" alt="" class="img" />
        <span>房源信息</span>
      </div>
      <div class="menu-item" @click="toMessageBoard">
        <image src="../../assets/liuyanban.png" alt="" class="img" />
        <span>留言板</span>
      </div>
    </div>
    <div class="common">
      <div class="c-top">
        <span class="c-t-title">房源信息推荐</span>
        <span class="c-t-more">查看更多+</span>
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
          <div class="h-c-i-text">地址：{{ item.fangwudizhi }}</div>
          <div class="h-c-i-text">价格：{{ item.zulinjiage }}元/月</div>
          <div class="h-c-i-text">电话：{{ item.shoujihao }}</div>
        </div>
      </div>
    </div>
    <div class="common">
      <div class="c-top">
        <span class="c-t-title">通知公告</span>
        <span class="c-t-more" @click="toNotice">查看更多+</span>
      </div>
      <div class="t-content">
        <div
          class="t-c-item"
          v-for="(item, index) in noticeList"
          :key="index"
          @click="openNotice(item)"
        >
          <div class="t-c-i-tile">{{ item.title }}</div>
          <div class="t-c-i-desc">{{ item.introduction }}</div>
          <div class="t-c-i-date">
            {{ dayjs(item.addTime).format("YYYY-MM-DD") }}
          </div>
        </div>
      </div>
    </div>
    <div class="common">
      <div class="c-top">
        <span class="c-t-title">发展历程</span>
        <span class="c-t-more">查看更多+</span>
      </div>
      <div class="f-content">
        <img
          :src="'http://localhost:8080/zufangguanli/' + developList.picture1"
          alt=""
          class="f-c-img"
          draggable="false"
        />
        <div class="f-c-text">
          {{ developList.content }}
        </div>
      </div>
    </div>
    <div class="common">
      <div class="c-top">
        <span class="c-t-title">相关介绍</span>
        <span class="c-t-more">查看更多+</span>
      </div>
      <div class="f-content">
        <img
          :src="'http://localhost:8080/zufangguanli/' + websiteInfo.picture1"
          alt=""
          class="f-c-img"
          draggable="false"
        />
        <div class="f-c-text">
          {{ websiteInfo.content }}
        </div>
      </div>
    </div>
  </div>
  <noticeDialog
    :visible="noticeVisible"
    :param="noticeParam"
    @updateVisible="updateNoticeVisible"
  />
</template>

<script setup>
import Taro from "@tarojs/taro";
import { ref, onMounted } from "vue";
import {
  getSwiperList,
  getHouseList,
  getDevelopList,
  getNoticeList,
  getWebsiteInfo,
} from "../../api/zuke";
import dayjs from "dayjs";
import noticeDialog from "../../components/noticeDialog.vue";
// 组件参数
const noticeVisible = ref(false);
const noticeParam = ref({});
const updateNoticeVisible = (visible) => {
  noticeVisible.value = visible;
};
const openNotice = (item) => {
  noticeVisible.value = true;
  noticeParam.value = item;
};
// 胶囊信息
const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 获取胶囊信息
const systemInfo = wx.getSystemInfoSync(); // 获取设备信息
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight;
const menuButtonHeight = menuButtonInfo.height; // 胶囊高度
const topHeight = menuButtonStatusBarGap * 2 + menuButtonHeight;
// 页面数据
const swiperList = ref([]);
const houseList = ref([]);
const developList = ref({});
const noticeList = ref([]);
const websiteInfo = ref({});
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
  const res3 = await getDevelopList();
  if (res3.code == 0) {
    developList.value = res3.data;
  }
  const res4 = await getNoticeList({
    page: 1,
    limit: 3,
    sort: "id",
    order: "desc",
  });
  if (res4.code == 0) {
    noticeList.value = res4.data.list;
  }
  const res5 = await getWebsiteInfo();
  if (res5.code == 0) {
    websiteInfo.value = res5.data;
  }
});
const toNotice = () => {
  Taro.navigateTo({
    url: "/pages/notice/index",
  });
};
const toConsultation = () => {
  Taro.navigateTo({
    url: "/pages/consultation/index",
  });
};
const toRoom = () => {
  Taro.navigateTo({
    url: "/pages/room/index",
  });
};
const toMessageBoard = () => {
  Taro.navigateTo({
    url: "/pages/messageBoard/index",
  });
};
</script>
<style lang="scss">
.container {
  .title {
    width: 100%;
    font-size: 32px;
    font-weight: 400;
    text-align: center;
    position: fixed;
    background: white;
    left: 0;
    z-index: 999;
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
  .common {
    margin-top: 20px;
    padding: 0 30px;
    .c-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      font-weight: 400;
      text-align: center;
      margin-bottom: 10px;
      .c-t-title {
        font-size: 36px;
      }
    }
    .h-content {
      width: 100%;
      display: flex;
      overflow: auto;
      .h-c-item {
        margin: 0px 10px 10px 10px;
        display: flex;
        flex-direction: column;
        background-color: #f5f5f5;
        border-radius: 20px;
        padding: 10px;
        box-sizing: border-box;
        .h-c-i-img {
          width: 260px;
          height: 300px;
          border-radius: 10px;
          margin-bottom: 10px;
        }
        .h-c-i-text {
          font-size: 24px;
          font-weight: 400;
        }
      }
    }
    .f-content {
      width: 100%;
      display: flex;
      .f-c-img {
        flex-shrink: 0;
        width: 300px;
        height: 230px;
        border-radius: 10px;
      }
      .f-c-text {
        margin-left: 20px;
        font-size: 24px;
        font-weight: 400;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
      }
    }
    .t-content {
      .t-c-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        padding: 20px;
        background-color: rgb(177, 58, 61);
        .t-c-i-tile {
          font-size: 30px;
          font-weight: 400;
          color: white;
        }
        .t-c-i-desc {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          font-size: 24px;
          font-weight: 300;
          color: #fff;
        }
        .t-c-i-date {
          font-size: 24px;
          font-weight: 400;
          color: white;
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
