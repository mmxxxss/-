<template>
  <div class="container">
    <p class="desc">请注册您的账号哦～</p>
    <nut-form ref="formRef" :model-value="form" :rules="rules">
      <nut-form-item label="账号名" prop="zukeming">
        <nut-input
          v-model="form.zukeming"
          placeholder="请输入账号名"
          type="text"
          @blur="customBlurValidate('zukeming')"
        />
      </nut-form-item>
      <nut-form-item label="密码" prop="mima">
        <nut-input
          v-model="form.mima"
          placeholder="请输入密码"
          type="password"
          @blur="customBlurValidate('mima')"
        />
      </nut-form-item>
      <nut-form-item label="确认密码" prop="mima2">
        <nut-input
          v-model="form.mima2"
          placeholder="请输入确认密码"
          type="password"
          @blur="customBlurValidate('mima2')"
        />
      </nut-form-item>
      <nut-form-item label="姓名" prop="xingming">
        <nut-input
          v-model="form.xingming"
          placeholder="请输入姓名"
          type="text"
          @blur="customBlurValidate('xingming')"
        />
      </nut-form-item>
      <nut-form-item label="性别" prop="xingbie">
        <nut-radio-group v-model="form.xingbie" direction="horizontal">
          <nut-radio label="男">男</nut-radio>
          <nut-radio label="女">女</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="头像" prop="touxiang">
        <nut-uploader
          v-model="form.touxiang"
          url="http://localhost:8080/zufangguanli/file/upload"
          accept="image/*"
          maximum="1"
          :source-type="['album', 'camera']"
        >
        </nut-uploader>
      </nut-form-item>
      <nut-form-item label="年龄" prop="nianling">
        <nut-input
          v-model="form.nianling"
          placeholder="请输入年龄"
          type="number"
        ></nut-input>
      </nut-form-item>
      <nut-form-item label="手机号" prop="shoujihao">
        <nut-input
          v-model="form.shoujihao"
          placeholder="请输入手机号"
          type="number"
          @blur="customBlurValidate('shoujihao')"
        ></nut-input>
      </nut-form-item>
      <nut-form-item label="邮箱" prop="youxiang">
        <nut-input
          v-model="form.youxiang"
          placeholder="请输入邮箱"
          type="text"
          @blur="customBlurValidate('youxiang')"
        ></nut-input>
      </nut-form-item>
    </nut-form>
    <nut-button type="primary" class="btn" @click="register">注册</nut-button>
    <p @click="handleLogin" class="back">已有账号?返回登录</p>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Taro from "@tarojs/taro";
import tool from "../../utils/tool";
import { goZuKeRegister } from "../../api/zuke";
const form = ref({
  zukeming: "",
  mima: "",
  mima2: "",
  xingbie: "男",
  xingming: "",
  touxiang: "",
  nianling: "",
  shoujihao: "",
  youxiang: "",
});
const rules = ref({
  zukeming: [{ required: true, message: "请输入账号名" }],
  mima: [{ required: true, message: "请输入密码" }],
  mima2: [
    { required: true, message: "请输入确认密码" },
    {
      validator: (val) => val == form.value.mima,
      message: "两次密码不一致",
    },
  ],
  xingming: [{ required: true, message: "请输入姓名" }],
  shoujihao: [{ validator: tool.isMobile, message: "请输入正确的手机号" }],
  youxiang: [{ validator: tool.isEmail, message: "请输入正确的邮箱" }],
});
const formRef = ref(null);
// 失去焦点校验
const customBlurValidate = (prop) => {
  formRef.value?.validate(prop);
};
const register = async () => {
  formRef.value?.validate().then(async ({ valid, errors }) => {
    if (valid) {
      form.value.touxiang = "file/" + form.value.touxiang;
      const res = await goZuKeRegister(form.value);
      if (res.code == 0) {
        Taro.showToast({
          title: "注册成功",
          icon: "none",
        });
        setTimeout(() => {
          Taro.navigateTo({
            url: "/pages/login/index",
          });
        }, 1000);
      } else {
        Taro.showToast({
          title: res.msg,
          icon: "none",
        });
      }
    } else {
      console.warn("error:", errors);
    }
  });
};
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
