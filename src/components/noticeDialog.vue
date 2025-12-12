<template>
  <nut-dialog v-model:visible="props.visible" no-footer :lock-scroll="true">
    <div class="dialog-content">
      <div class="notice">通知公告</div>
      <div class="title">{{ props.param.title }}</div>
      <div class="time">
        发布时间：{{ dayjs(props.param.addTime).format("YYYY-MM-DD") }}
      </div>
      <myImage :src="props.param.picture" class="image" />
      <div class="content">{{ props.param.content }}</div>
    </div>
    <nut-button type="default" @click="onOk" class="close-btn">关闭</nut-button>
  </nut-dialog>
</template>

<script setup>
import dayjs from "dayjs";
import myImage from "./myImage.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  param: {
    type: Object,
    default: () => {},
  },
});
const emit = defineEmits(["updateVisible"]);

const onOk = () => {
  emit("updateVisible", false);
};
</script>
<style lang="scss">
.dialog-content {
  display: flex;
  flex-direction: column;
  color: black;
  align-items: center;
  height: 750px;
  overflow: auto;
  .notice {
    font-size: 30px;
    align-self: flex-start;
    margin-bottom: 20px;
  }
  .title {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .time {
    font-size: 24px;
    align-self: flex-end;
    color: #999;
    margin-bottom: 10px;
  }
  .image {
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }
  .content {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 20px;
  }
}
.close-btn {
  width: 200px;
  height: 50px;
}
.nut-dialog {
  padding: 30px 20px;
}
.nut-dialog__content {
  margin: 0;
  max-height: 800px;
}
</style>
