<template>
  <div class="container" :style="{ paddingTop: statusBarHeight + 'px' }">
    <div
      :style="{ height: topHeight + 'px', lineHeight: topHeight + 'px' }"
      class="top-title"
    >
      登陆
    </div>
    <h1 class="title">您好，</h1>
    <p class="desc">
      欢迎来到租房平台，立即<span class="register" @click="goRegister"
        >注册</span
      >
    </p>
    <p class="desc change">请先登录吧！</p>
    <div class="user">
      <span v-if="form.username" class="desc">账号</span>
      <nut-input
        v-model="form.username"
        placeholder="请输入账号"
        class="input"
        type="text"
      />
      <span v-if="form.password" class="desc">密码</span>
      <nut-input
        v-model="form.password"
        placeholder="请输入密码"
        class="input"
        type="password"
      />
    </div>
    <nut-button
      type="primary"
      class="btn"
      :disabled="!form.username || !form.password || !role"
      @click="login"
      >登录</nut-button
    >
  </div>
</template>
<script setup>
import Taro from "@tarojs/taro";
import { ref } from "vue";
import { goZuKeLogin, keepSession } from "../../api/zuke";
const menuButtonInfo = wx.getMenuButtonBoundingClientRect(); // 获取胶囊信息
const systemInfo = wx.getSystemInfoSync(); // 获取设备信息
const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
// 状态栏到胶囊的间距
const menuButtonStatusBarGap = menuButtonInfo.top - statusBarHeight;
const menuButtonHeight = menuButtonInfo.height; // 胶囊高度
const topHeight = menuButtonStatusBarGap * 2 + menuButtonHeight;
const form = ref({
  username: "",
  password: "",
});
const role = ref("zuke");
const login = async () => {
  let res;
  if (role.value == "zuke") {
    res = await goZuKeLogin(form.value);
  }
  if (res.code == 0) {
    Taro.setStorageSync("token", res.token);
    const session = await keepSession();
    if (session.code == 0) {
      Taro.setStorageSync("userinfo", session.data);
    }
    Taro.showToast({
      title: "登录成功",
      icon: "none",
      duration: 1000,
    });
    setTimeout(() => {
      Taro.reLaunch({
        url: "/pages/zuke/index",
      });
    }, 1000);
  } else {
    Taro.showToast({
      title: res.msg,
      icon: "none",
    });
  }
};
const goRegister = () => {
  Taro.navigateTo({
    url: "/pages/register/index",
  });
};
</script>
<style lang="scss">
.container {
  height: 100vh;
  padding: 0 30px;
  .top-title {
    width: 100%;
    font-size: 32px;
    font-weight: 400;
    text-align: center;
  }
  .title {
    margin-top: 50px;
    font-size: 60px;
    font-weight: 400;
  }
  .desc {
    font-size: 32px;
    font-weight: 300;
    margin-top: 10px;
    display: flex;
    .register {
      font-size: 32px;
      color: red;
      margin-left: 10px;
    }
  }
  .change {
    margin-top: 100px;
    margin-bottom: 30px;
  }
  .user {
    margin-top: 30px;
    .desc {
      font-size: 20px;
    }
  }
  .btn {
    width: 80%;
    display: block;
    margin: 100px auto;
  }
}
</style>
