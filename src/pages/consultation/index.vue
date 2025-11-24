<template>
  <div v-for="(item, index) in consultationList" :key="index" class="item">
    <image
      :src="'http://localhost:8080/zufangguanli/' + item.tupian.split(',')[0]"
      alt=""
      class="img"
    />
    <div class="box">
      <div class="title">标题：{{ item.biaoti }}</div>
      <div class="content">简介：{{ item.jianjie }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.item {
  width: 90%;
  height: 300px;
  display: flex;
  border: 1px solid #ccc;
  margin: 20px auto;
  border-radius: 20px;
  .img {
    align-self: center;
    margin-left: 20px;
    width: 280px;
    height: 280px;
    border-radius: 20px;
  }
  .box {
    width: 280px;
    height: 280px;
    align-self: center;
    margin-left: 20px;
    .title {
      font-size: 32px;
      font-weight: 400;
    }
    .content {
      font-size: 24px;
      font-weight: 400;
      color: #808080;
    }
  }
}
</style>

<script setup>
import { getConsultationList } from "../../api/zuke";
import { ref, onMounted } from "vue";
// 组件参数
const consultationList = ref([]);
// 组件方法
const getConsultationListData = async () => {
  let param = {
    page: 1,
    limit: 10,
  };
  const res = await getConsultationList(param);
  if (res.code == 0) {
    consultationList.value = res.data.list;
  }
};
// 组件挂载时调用
onMounted(() => {
  getConsultationListData();
});
</script>
