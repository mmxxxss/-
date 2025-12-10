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
        :src="'http://localhost:8080/zufangguanli/' + userinfo?.touxiang"
        alt=""
        class="avatar"
      />
      <div class="username" v-if="isLogin">Hi,{{ userinfo?.zukeming }}</div>
      <div class="username" v-else>
        Hi,请先<span class="login" @click="toLogin">登录</span>
      </div>
      <image src="../../assets/right.png" alt="" class="right" />
    </div>
    <div class="function">
      <div class="item">
        <image src="../../assets/xiugaimima.png" alt="" class="icon" />
        <span class="text">修改密码</span>
      </div>
      <div class="item">
        <image src="../../assets/yuyuekanfnag.png" alt="" class="icon" />
        <span class="text">预约看房</span>
      </div>
      <div class="item">
        <image src="../../assets/zulinhetong.png" alt="" class="icon" />
        <span class="text">租赁合同</span>
      </div>
      <div class="item">
        <image src="../../assets/fangwuzulin.png" alt="" class="icon" />
        <span class="text">房屋租赁</span>
      </div>
      <div class="item">
        <image src="../../assets/wodeshoucang.png" alt="" class="icon" />
        <span class="text">我的收藏</span>
      </div>
    </div>
    <nut-button type="primary" @click="logout" class="logout-btn"
      >退出登录</nut-button
    >
  </div>
</template>

<script setup>
import Taro from "@tarojs/taro";
import { ref, onMounted } from "vue";
import { keepSession } from "../../api/zuke";
// 胶囊信息
const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 获取胶囊信息
const systemInfo = wx.getSystemInfoSync(); // 获取设备信息
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight;
const menuButtonHeight = menuButtonInfo.height; // 胶囊高度
const topHeight = menuButtonStatusBarGap * 2 + menuButtonHeight;
const userinfo = ref({});
const isLogin = ref(true);
const getUserInfo = async () => {
  const token = Taro.getStorageSync("token");
  if (!token) {
    isLogin.value = false;
    return;
  }
  let res = await keepSession();
  if (res.code == 0) {
    userinfo.value = res.data;
    Taro.setStorageSync("userinfo", res.data);
  }
};
const toLogin = () => {
  Taro.reLaunch({
    url: "/pages/login/index",
  });
};
// 页面加载时获取用户信息
onMounted(() => {
  getUserInfo();
});

// 监听页面显示事件，当从其他页面返回时刷新数据
Taro.useDidShow(() => {
  // 检查是否有用户信息更新的标识
  const userInfoUpdated = Taro.getStorageSync("userInfoUpdated");
  if (userInfoUpdated) {
    // 清除标识
    Taro.removeStorageSync("userInfoUpdated");
    // 刷新用户信息
    getUserInfo();
  }
});

const toUserInfo = () => {
  Taro.navigateTo({
    url: "/pages/userinfo/index",
  });
};
const logout = () => {
  Taro.showModal({
    title: "提示",
    content: "确定退出登录吗？",
    success: (res) => {
      if (res.confirm) {
        Taro.removeStorageSync("token");
        Taro.removeStorageSync("userinfo");
        Taro.showToast({
          title: "退出登录成功",
          icon: "none",
          duration: 1000,
        });
        setTimeout(() => {
          Taro.reLaunch({
            url: "/pages/login/index",
          });
        }, 1000);
      }
    },
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
    width: 650px;
    .avatar {
      border: 2px solid rgb(177, 58, 61);
      width: 100px;
      height: 100px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .username {
      display: flex;
      flex: 1;
      margin: 20px;
      font-size: 40px;
      font-weight: 400;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .login {
      color: rgb(177, 58, 61);
    }
    .right {
      flex-shrink: 0;
      margin-top: 30px;
      width: 30px;
      height: 35px;
    }
  }
  .function {
    margin: 50px auto;
    width: 92%;
    background: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 150px;
      height: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon {
        width: 60px;
        height: 60px;
      }
      .text {
        color: #656565;
        margin-top: 20px;
        font-size: 28px;
        font-weight: 400;
      }
    }
  }
  .logout-btn {
    display: block;
    width: 400px;
    margin: 20px auto;
  }
}
</style>
