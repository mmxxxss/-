<template>
  <div class="container">
    <nut-form :model="userinfo">
      <nut-form-item label="租客名" prop="zukeming">
        <nut-input v-model="userinfo.zukeming" placeholder="请输入租客名" />
      </nut-form-item>
      <nut-form-item label="姓名" prop="xingming">
        <nut-input v-model="userinfo.xingming" placeholder="请输入姓名" />
      </nut-form-item>
      <nut-form-item label="性别" prop="xingbie">
        <nut-radio-group v-model="userinfo.xingbie" direction="horizontal">
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
        <nut-input v-model="userinfo.nianling" placeholder="请输入年龄" />
      </nut-form-item>
      <nut-form-item label="手机号" prop="shoujihao">
        <nut-input v-model="userinfo.shoujihao" placeholder="请输入手机号" />
      </nut-form-item>
      <nut-form-item label="邮箱" prop="youxiang">
        <nut-input v-model="userinfo.youxiang" placeholder="请输入邮箱" />
      </nut-form-item>
    </nut-form>
    <nut-button type="primary" @click="save" class="save-btn">保存</nut-button>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import { updateZuKeInfo, keepSession } from "../../api/zuke";
const userinfo = ref({});
const defaultFileList = ref([]);
const getUserInfo = async () => {
  const res = await keepSession();
  if (res.code === 0) {
    userinfo.value = res.data;
    defaultFileList.value = [
      {
        url:
          "http://localhost:8080/zufangguanli/file/" + userinfo.value.touxiang,
        name: userinfo.value.touxiang,
        status: "success",
        message: "上传成功",
        type: "image",
      },
    ];
  }
};
onMounted(() => {
  getUserInfo();
});
const handleSuccess = (res) => {
  let data = JSON.parse(res.data.data);
  userinfo.value.touxiang = data.file;
};
const save = async () => {
  userinfo.value.touxiang = "file/" + userinfo.value.touxiang;
  await updateZuKeInfo(userinfo.value);
  Taro.showToast({
    title: "保存成功",
    icon: "none",
  });

  // 设置标识，表示用户信息已更新
  Taro.setStorageSync("userInfoUpdated", true);

  // 返回上一页
  setTimeout(() => {
    Taro.navigateBack();
  }, 1000);
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
