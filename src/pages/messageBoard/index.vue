<script setup>
import { getMessageList, sendMessage } from "../../api/zuke";
import { ref } from "vue";
import Taro from "@tarojs/taro";
import myImage from "../../components/myImage.vue";
import publishDialog from "../../components/publishDialog.vue";
// 组件参数
const messageList = ref([]);
const userinfo = Taro.getStorageSync("userinfo");
// 组件方法
const getMessageListData = async () => {
  let param = {
    page: 1,
    limit: 20,
    sort: "addtime",
    order: "desc",
  };
  const res = await getMessageList(param);
  if (res.code == 0) {
    messageList.value = res.data.list;
  }
};
getMessageListData();
const isShowSendComment = ref(false);
const sendCommentFn = async (val) => {
  let params = {
    avatarurl: userinfo.touxiang,
    content: val,
    userid: userinfo.id.toString(),
    username: userinfo.zukeming,
  };
  const res = await sendMessage(params);
  if (res.code == 0) {
    Taro.showToast({
      title: "发表成功",
      icon: "none",
    });
    isShowSendComment.value = false;
    getMessageListData();
  }
};
</script>
<template>
  <div class="container">
    <nut-button
      type="primary"
      class="publish-btn"
      size="small"
      @click="isShowSendComment = true"
      >发表</nut-button
    >
    <div v-for="(item, index) in messageList" :key="index" class="item">
      <myImage :src="item.avatarurl" class="avatar" />
      <div class="content-container">
        <div class="username">{{ item.username }}</div>
        <div class="content">{{ item.content }}</div>
        <div v-if="item.reply" class="reply">回复</div>
        <div class="content" v-if="item.reply">{{ item.reply }}</div>
      </div>
    </div>
  </div>
  <publishDialog
    v-model:isShowSendComment="isShowSendComment"
    @sendComment="sendCommentFn"
  />
</template>
<style lang="scss">
.container {
  padding: 30px;
  height: 100vh;
  background-color: #f7f7f7;
  min-height: 100vh;
}
.publish-btn {
  position: fixed;
  top: 30px;
  right: 30px;
}
.item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: 1px solid #dfdfdf;
    flex-shrink: 0;
  }
}
.content-container {
  flex: 1;
  flex-grow: 0;
  margin-left: 20px;
  .username {
    font-size: 36px;
    color: rgb(58, 82, 177);
  }
  .content {
    font-size: 28px;
    width: 560px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  .reply {
    font-size: 32px;
    color: rgb(177, 58, 61);
  }
}
</style>
