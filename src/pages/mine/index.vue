<template>
  <div
    class="container"
    :style="{
      paddingTop: statusBarHeight + topHeight + 'px',
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
      我的
    </div>
    <div class="userinfo" @click="toUserInfo">
      <img
        :src="'http://localhost:8080' + userInfo.touxiang"
        alt=""
        class="avatar"
      />
      <div class="username">Hi,{{ userInfo.zukeming }}</div>
      <image src="../../assets/right.png" alt="" class="right" />
    </div>
  </div>
</template>

<script setup>
import Taro from "@tarojs/taro";
// 胶囊信息
const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 获取胶囊信息
const systemInfo = wx.getSystemInfoSync(); // 获取设备信息
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight;
const menuButtonHeight = menuButtonInfo.height; // 胶囊高度
const topHeight = menuButtonStatusBarGap * 2 + menuButtonHeight;
const userInfo = Taro.getStorageSync("userinfo");

const toUserInfo = () => {
  Taro.navigateTo({
    url: "/pages/userinfo/index",
  });
};
</script>
<style lang="scss">
.container {
  background-color: #f7f7f7;
  width: 100%;
  padding-bottom: 110px;
  min-height: 100vh;
  .title {
    width: 100%;
    font-size: 32px;
    font-weight: 400;
    text-align: center;
    position: fixed;
    background: #f7f7f7;
    left: 0;
    z-index: 999;
  }
  .userinfo {
    margin-left: 50px;
    display: flex;
    .avatar {
      border: 2px solid rgb(177, 58, 61);
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .username {
      margin: 20px;
      font-size: 40px;
      font-weight: 400;
      text-align: center;
    }
    .right {
      width: 30px;
      height: 35px;
      margin: 30px 0 0 200px;
    }
  }
}
</style>
