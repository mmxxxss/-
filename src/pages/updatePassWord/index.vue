<template>
  <div class="container">
    <nut-form :model="form" :rules="rules">
      <nut-form-item label="旧密码" prop="oldPassword">
        <nut-input v-model="form.oldPassword" placeholder="请输入旧密码" />
      </nut-form-item>
      <nut-form-item label="新密码" prop="newPassword">
        <nut-input v-model="form.newPassword" placeholder="请输入新密码" />
      </nut-form-item>
      <nut-form-item label="确认密码" prop="confirmPassword">
        <nut-input v-model="form.confirmPassword" placeholder="请确认新密码" />
      </nut-form-item>
    </nut-form>
    <nut-button type="primary" @click="updatePassword" class="update-btn"
      >更新密码</nut-button
    >
  </div>
</template>
<script setup>
import { ref } from "vue";
import Taro from "@tarojs/taro";
import { keepSession, updateZuKeInfo } from "../../api/zuke";

const rules = ref({
  oldPassword: [{ required: true, message: "请输入旧密码" }],
  newPassword: [{ required: true, message: "请输入新密码" }],
  confirmPassword: [
    { required: true, message: "请确认新密码" },
    {
      validator: (val) => val == form.value.newPassword,
      message: "两次密码不一致",
    },
  ],
});
const userinfo = ref({});
const getUserInfo = async () => {
  const res = await keepSession();
  if (res.code === 0) {
    userinfo.value = res.data;
  }
};
getUserInfo();
const form = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const updatePassword = async () => {
  if (form.value.oldPassword !== userinfo.value.mima) {
    Taro.showToast({
      title: "旧密码错误",
      icon: "none",
    });
    return;
  }
  if (form.value.newPassword !== form.value.confirmPassword) {
    Taro.showToast({
      title: "两次密码不一致",
      icon: "none",
    });
    return;
  }
  userinfo.value.mima = form.value.newPassword;
  const res = await updateZuKeInfo(userinfo.value);
  if (res.code === 0) {
    Taro.showToast({
      title: "密码更新成功",
      icon: "success",
    });
    Taro.setStorageSync("userInfoUpdated", true);
    setTimeout(() => {
      Taro.navigateBack();
    }, 1000);
  }
};
</script>
<style lang="scss">
.container {
  padding-top: 20px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  min-height: 100vh;
}
.update-btn {
  display: block;
  width: 400px;
  margin: 20px auto;
}
</style>
