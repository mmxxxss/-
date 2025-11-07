<template>
  <div class="container">
    <h1 class="title">您好，</h1>
    <p class="desc">
      欢迎来到租房平台，立即<span class="register" @click="goRegister"
        >注册</span
      >
    </p>
    <p class="desc change">请先选择您的身份吧！</p>
    <nut-radio-group v-model="role" direction="horizontal">
      <nut-radio label="1">我是租客</nut-radio>
      <nut-radio label="2">我是房东</nut-radio>
      <nut-radio label="3">我是管理员</nut-radio>
    </nut-radio-group>
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
import { goZuKeLogin } from "../../api/zuke";
import { goFangDongLogin } from "../../api/fangdong";
import { goUserLogin } from "../../api/user";
const form = ref({
  username: "",
  password: "",
});
const role = ref("1");
const login = async () => {
  if (role.value == 1) {
    const res = await goZuKeLogin(form.value);
    Taro.setStorageSync("token", res.data.token);
  } else if (role.value == 2) {
    const res = await goFangDongLogin(form.value);
    Taro.setStorageSync("token", res.data.token);
  } else {
    const res = await goUserLogin(form.value);
    Taro.setStorageSync("token", res.data.token);
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
