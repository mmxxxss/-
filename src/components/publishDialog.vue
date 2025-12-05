<template>
  <nut-popup
    v-model:visible="isShowSendComment"
    :style="{ height: '400px' }"
    position="bottom"
  >
    <div style="display: flex; flex-direction: column; padding: 10px 20px">
      <nut-button
        type="primary"
        @click="sendCommentFn"
        size="mini"
        style="align-self: flex-end"
        >发表</nut-button
      >
      <nut-textarea v-model="commentVal" placeholder="请输入评论" />
    </div>
  </nut-popup>
</template>
<script setup>
import { ref } from "vue";
const emit = defineEmits(["sendComment"]);
const isShowSendComment = defineModel("isShowSendComment");
const sendCommentFn = () => {
  emit("sendComment", commentVal.value);
  commentVal.value = "";
  isShowSendComment.value = false;
};

const commentVal = ref("");
</script>
