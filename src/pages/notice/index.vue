<template>
  <div class="content">
    <div
      class="list"
      v-for="(item, index) in noticeList"
      :key="index"
      @click="openNotice(item)"
    >
      <div class="title">{{ item.title }}</div>
      <div class="desc">{{ item.introduction }}</div>
      <div class="date">
        {{ dayjs(item.addTime).format("YYYY-MM-DD") }}
      </div>
    </div>
    <noticeDialog
      :visible="noticeVisible"
      :param="noticeParam"
      @updateVisible="updateNoticeVisible"
    />
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import noticeDialog from "../../components/noticeDialog.vue";
import { getNoticeList } from "../../api/zuke";
import { ref } from "vue";
// 组件参数
const noticeList = ref([]);
// 通知公告弹窗参数
const noticeParam = ref({});
// 通知公告弹窗是否显示
const noticeVisible = ref(false);
// 更新通知公告弹窗是否显示
const updateNoticeVisible = (visible) => {
  noticeVisible.value = visible;
};
// 打开通知公告弹窗
const openNotice = (item) => {
  noticeParam.value = item;
  updateNoticeVisible(true);
};
// 组件方法
const getNoticeListData = async () => {
  let param = {
    page: 1,
    limit: 20,
    sort: "addtime",
    order: "desc",
  };
  const res = await getNoticeList(param);
  if (res.code == 0) {
    noticeList.value = res.data.list;
  }
};
getNoticeListData();
</script>
<style lang="scss">
.content {
  padding-bottom: 20px;
  .list {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding: 20px;
    background-color: rgb(177, 58, 61);
    .title {
      font-size: 30px;
      font-weight: 400;
      color: white;
    }
    .desc {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 24px;
      font-weight: 300;
      color: #fff;
    }
    .date {
      font-size: 24px;
      font-weight: 400;
      color: white;
      align-self: flex-end;
    }
  }
}
</style>
