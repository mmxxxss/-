<template>
  <div class="container">
    <p class="desc">请先选择您的身份～</p>
    <nut-radio-group v-model="role" direction="horizontal">
      <nut-radio label="1">我是租客</nut-radio>
      <nut-radio label="2">我是房东</nut-radio>
    </nut-radio-group>
    <nut-form>
      <nut-form-item label="账号名">
        <nut-input
          v-model="form.userName"
          placeholder="请输入账号名"
          type="text"
        />
      </nut-form-item>
      <nut-form-item label="密码">
        <nut-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        />
      </nut-form-item>
      <nut-form-item label="确认密码">
        <nut-input
          v-model="form.confirmPassword"
          placeholder="请输入确认密码"
          type="password"
        />
      </nut-form-item>
      <nut-form-item label="性别">
        <nut-radio-group v-model="form.sex" direction="horizontal">
          <nut-radio label="man">男</nut-radio>
          <nut-radio label="women">女</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="头像">
        <nut-uploader
          v-model="form.avatar"
          url="http://服务地址"
          accept="image/*"
          maximum="1"
          :auto-upload="false"
          multiple
          :source-type="['album', 'camera']"
        >
        </nut-uploader>
      </nut-form-item>
      <nut-form-item label="年龄">
        <nut-input
          v-model="form.age"
          placeholder="请输入年龄"
          type="number"
        ></nut-input>
      </nut-form-item>
      <nut-form-item label="手机号">
        <nut-input
          v-model="form.phone"
          placeholder="请输入手机号"
          type="number"
        ></nut-input>
      </nut-form-item>
      <nut-form-item label="邮箱">
        <nut-input
          v-model="form.email"
          placeholder="请输入邮箱"
          type="text"
        ></nut-input>
      </nut-form-item>
    </nut-form>
    <nut-button type="primary" class="btn">注册</nut-button>
    <p @click="handleLogin" class="back">已有账号?返回登录</p>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Taro from "@tarojs/taro";
const role = ref("1");
const form = ref({
  sex: "man",
});
const handleLogin = () => {
  Taro.navigateTo({
    url: "/pages/login/index",
  });
};
</script>
<style lang="scss">
.container {
  padding: 0 30px;
  .desc {
    font-size: 32px;
    font-weight: 300;
    margin-bottom: 30px;
  }
  .sex {
    width: 100%;
    background: red;
    text-align: right;
  }
  .btn {
    display: block;
    margin: 30px auto;
    width: 80%;
  }
  .back {
    font-size: 32px;
    font-weight: 300;
    text-align: center;
  }
}
</style>
