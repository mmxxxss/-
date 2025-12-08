<template>
  <div class="container">
    <nut-form :model="form">
      <nut-form-item label="租客名" prop="zukeming">
        <nut-input
          v-model="form.zukeming"
          placeholder="请输入租客名"
          :disabled="disabled"
        />
      </nut-form-item>
      <nut-form-item label="姓名" prop="xingming">
        <nut-input
          v-model="form.xingming"
          placeholder="请输入租客名"
          :disabled="disabled"
        />
      </nut-form-item>
      <nut-form-item label="性别" prop="xingbie">
        <nut-radio-group v-model="form.xingbie" direction="horizontal">
          <nut-radio label="男" :disabled="disabled">男</nut-radio>
          <nut-radio label="女" :disabled="disabled">女</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="头像" prop="touxiang">
        <nut-uploader
          v-model:file-list="defaultFileList"
          url="http://localhost:8080/zufangguanli/upload"
          accept="image/*"
          maximum="1"
          :auto-upload="false"
          :source-type="['album', 'camera']"
          :disabled="disabled"
        >
        </nut-uploader>
      </nut-form-item>
      <nut-form-item label="年龄" prop="nianling">
        <nut-input
          v-model="form.nianling"
          placeholder="请输入年龄"
          :disabled="disabled"
        />
      </nut-form-item>
      <nut-form-item label="手机号" prop="shoujihao">
        <nut-input
          v-model="form.shoujihao"
          placeholder="请输入手机号"
          :disabled="disabled"
        />
      </nut-form-item>
      <nut-form-item label="邮箱" prop="youxiang">
        <nut-input
          v-model="form.youxiang"
          placeholder="请输入邮箱"
          :disabled="disabled"
        />
      </nut-form-item>
    </nut-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Taro from "@tarojs/taro";
const userinfo = Taro.getStorageSync("userinfo");
const disabled = ref(true);
const defaultFileList = ref([
  {
    url: "http://localhost:8080/zufangguanli/" + userinfo.touxiang,
    name: userinfo.touxiang,
    status: "success",
    message: "上传成功",
    type: "image",
  },
]);
const form = ref({
  zukeming: userinfo.zukeming,
  xingming: userinfo.xingming,
  xingbie: userinfo.xingbie,
  touxiang: userinfo.touxiang,
  nianling: userinfo.nianling,
  shoujihao: userinfo.shoujihao,
  youxiang: userinfo.youxiang,
});
</script>
<style lang="scss">
.container {
  background-color: #f7f7f7;
  min-height: 100vh;
  padding-top: 20px;
}
</style>
