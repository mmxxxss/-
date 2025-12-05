<script setup>
import { getMessageList } from "../../api/zuke";
import { ref } from "vue";
import Taro from "@tarojs/taro";
// 组件参数
const messageList = ref([]);
// 组件方法
const getMessageListData = async () => {
  let param = {
    page: 1,
    limit: 10,
  };
  const res = await getMessageList(param);
  if (res.code == 0) {
    messageList.value = res.data.list;
  }
};
getMessageListData();
</script>
<template>
  <div class="container">
    <nut-button type="primary" class="publish-btn" size="small"
      >发表</nut-button
    >
    <div v-for="(item, index) in messageList" :key="index" class="item">
      <img
        :src="'http://localhost:8080/zufangguanli/' + item.avatarurl"
        alt=""
        class="avatar"
      />
      <div class="content-container">
        <div class="username">{{ item.username }}</div>
        <div class="content">{{ item.content }}</div>
        <div v-if="item.reply" class="reply">回复</div>
        <div class="content" v-if="item.reply">{{ item.reply }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.container {
  padding: 30px;
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
  }
}
.content-container {
  flex: 1;
  margin-left: 20px;
  .username {
    font-size: 36px;
    color: rgb(58, 82, 177);
  }
  .content {
    font-size: 28px;
  }
  .reply {
    font-size: 32px;
    color: rgb(177, 58, 61);
  }
}
</style>
