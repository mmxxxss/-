<script setup>
import Taro from "@tarojs/taro";
import { getMyCollectList } from "../../api/zuke";
import { ref } from "vue";
// 组件参数
const roomList = ref([]);
// 组件方法
const getRoomListData = async () => {
  const res = await getMyCollectList();
  if (res.code == 0) {
    roomList.value = res.data.list;
  }
};
const openRoomDetail = (item) => {
  Taro.navigateTo({
    url: "/pages/roomDetail/index?id=" + item.refid,
  });
};
getRoomListData();
</script>
<template>
  <div class="container">
    <div v-if="roomList.length == 0" class="none-text">暂无数据哦～</div>
    <div v-else>
      <div
        v-for="(item, index) in roomList"
        :key="index"
        class="item"
        @click="openRoomDetail(item)"
      >
        <image
          :src="
            'http://localhost:8080/zufangguanli/' + item.picture.split(',')[0]
          "
          alt=""
          class="img"
        />
        <div class="box">
          <div class="content">房源编号：{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.none-text {
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  color: #999;
}
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
