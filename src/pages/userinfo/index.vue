<template>
  <div class="container">
    <nut-form :model="form">
      <nut-form-item label="租客名" prop="zukeming">
        <nut-input v-model="form.zukeming" placeholder="请输入租客名" />
      </nut-form-item>
      <nut-form-item label="姓名" prop="xingming">
        <nut-input v-model="form.xingming" placeholder="请输入租客名" />
      </nut-form-item>
      <nut-form-item label="性别" prop="xingbie">
        <nut-radio-group v-model="form.xingbie" direction="horizontal">
          <nut-radio label="男">男</nut-radio>
          <nut-radio label="女">女</nut-radio>
        </nut-radio-group>
      </nut-form-item>
      <nut-form-item label="头像" prop="touxiang">
        <nut-uploader
          v-model:file-list="defaultFileList"
          url="http://localhost:8080/zufangguanli/file/upload"
          accept="image/*"
          maximum="1"
          :source-type="['album', 'camera']"
          :onSuccess="handleSuccess"
        >
        </nut-uploader>
      </nut-form-item>
      <nut-form-item label="年龄" prop="nianling">
        <nut-input v-model="form.nianling" placeholder="请输入年龄" />
      </nut-form-item>
      <nut-form-item label="手机号" prop="shoujihao">
        <nut-input v-model="form.shoujihao" placeholder="请输入手机号" />
      </nut-form-item>
      <nut-form-item label="邮箱" prop="youxiang">
        <nut-input v-model="form.youxiang" placeholder="请输入邮箱" />
      </nut-form-item>
    </nut-form>
    <nut-button type="primary" @click="save" class="save-btn">保存</nut-button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Taro from "@tarojs/taro";
import { updateZuKeInfo } from "../../api/zuke";
const userinfo = Taro.getStorageSync("userinfo");
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
  id: userinfo.id,
  zukeming: userinfo.zukeming,
  xingming: userinfo.xingming,
  xingbie: userinfo.xingbie,
  touxiang: userinfo.touxiang,
  nianling: userinfo.nianling,
  shoujihao: userinfo.shoujihao,
  youxiang: userinfo.youxiang,
});
const handleSuccess = (res) => {
  let data = JSON.parse(res.data.data);
  form.value.touxiang = data.file;
};
const save = async () => {
  await updateZuKeInfo(form.value);
  Taro.showToast({
    title: "保存成功",
  });
};
</script>
<style lang="scss">
.container {
  background-color: #f7f7f7;
  min-height: 100vh;
  padding-top: 20px;
}
.save-btn {
  display: block;
  width: 400px;
  margin: 20px auto;
}
</style>
