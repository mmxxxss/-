<script setup>
import Taro from "@tarojs/taro";
import { getRoomList } from "../../api/zuke";
import { ref } from "vue";
// 组件参数
const roomList = ref([]);
// 组件方法
const getRoomListData = async () => {
  let param = {
    page: 1,
    limit: 10,
  };
  const res = await getRoomList(param);
  if (res.code == 0) {
    roomList.value = res.data.list;
  }
};
const openRoomDetail = (item) => {
  Taro.navigateTo({
    url: "/pages/roomDetail/index?id=" + item.id,
  });
};
getRoomListData();
</script>
<template>
  <div class="container">
    <div
      v-for="(item, index) in roomList"
      :key="index"
      class="item"
      @click="openRoomDetail(item)"
    >
      <image
        :src="
          'http://localhost:8080/zufangguanli/' +
          item.fangwutupian.split(',')[0]
        "
        alt=""
        class="img"
      />
      <div class="box">
        <div class="content">房源编号：{{ item.fangyuanbianhao }}</div>
        <div class="content">房屋名称：{{ item.fangwumingcheng }}</div>
        <div class="content">房屋地址：{{ item.fangwudizhi }}</div>
        <div class="content">租赁价格：{{ item.zulinjiage }}</div>
        <div class="content">手机号：{{ item.shoujihao }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.container {
  padding: 20px 0;
  background-color: #f7f7f7;
  min-height: 100vh;
}
.item {
  width: 90%;
  height: 300px;
  display: flex;
  border: 1px solid #ccc;
  margin: 20px auto;
  border-radius: 20px;
  background-color: white;
  .img {
    align-self: center;
    margin-left: 20px;
    width: 280px;
    height: 280px;
    border-radius: 20px;
  }
  .box {
    width: 280px;
    height: 280px;
    align-self: center;
    margin-left: 20px;
    .content {
      font-size: 24px;
      font-weight: 400;
      color: black;
      margin: 20px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
