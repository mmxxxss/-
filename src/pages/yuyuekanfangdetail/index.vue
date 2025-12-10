<script setup>
import { getReserveDetail } from "../../api/zuke";
import { ref } from "vue";
import Taro from "@tarojs/taro";
// 组件参数
const roomDetail = ref({});
// 轮播图列表
const swiperList = ref([]);
// 获取房源详情
const getRoomDetailData = async () => {
  let id = Taro.getCurrentInstance().router?.params?.id;
  const res = await getReserveDetail(id);
  if (res.code == 0) {
    roomDetail.value = res.data;
    swiperList.value = res.data.fangwutupian.split(",");
  }
};
getRoomDetailData();
const previewImg = (item) => {
  Taro.previewImage({
    urls: ["http://localhost:8080/zufangguanli/" + item],
  });
};
</script>
<template>
  <div class="container">
    <nut-swiper
      :init-page="2"
      :auto-play="3000"
      pagination-visible
      pagination-color="#426543"
      pagination-unselected-color="#808080"
      class="square-swiper"
    >
      <nut-swiper-item
        v-for="(item, index) in swiperList"
        :key="index"
        class="square-swiper-item"
      >
        <img
          :src="'http://localhost:8080/zufangguanli/' + item"
          alt=""
          style="height: 100%; width: 100%"
          draggable="false"
          @click="previewImg(item)"
        />
      </nut-swiper-item>
    </nut-swiper>
    <div class="top">
      <h1>{{ roomDetail.fangwumingcheng }}</h1>
    </div>
    <div class="content">
      <div class="content-item">
        <div class="content-item-left">
          <div>房屋面积</div>
          <div class="content-item-left-text">
            {{ roomDetail.fangwumianji }}
          </div>
        </div>
        <div class="content-item-right">
          <div>房屋地址</div>
          <div class="content-item-right-text">
            {{ roomDetail.fangwudizhi }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div>租赁价格</div>
          <div class="content-item-left-text">
            {{ roomDetail.zulinjiage }}
          </div>
        </div>
        <div class="content-item-right">
          <div>房东</div>
          <div class="content-item-right-text">
            {{ roomDetail.fangdong }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div>房东姓名</div>
          <div class="content-item-left-text">
            {{ roomDetail.fangdongxingming }}
          </div>
        </div>
        <div class="content-item-right">
          <div>租客名</div>
          <div class="content-item-right-text">
            {{ roomDetail.zukexingming }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div>姓名</div>
          <div class="content-item-left-text">
            {{ roomDetail.xingming }}
          </div>
        </div>
        <div class="content-item-right">
          <div>预约时间</div>
          <div class="content-item-right-text">
            {{ roomDetail.yuyueshijian }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div>租赁人数</div>
          <div class="content-item-left-text">
            {{ roomDetail.zulinrenshu }}
          </div>
        </div>
        <div class="content-item-right">
          <div>是否审核</div>
          <div class="content-item-right-text">
            {{ roomDetail.sfsh }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div>回复内容</div>
          <div class="content-item-left-text">
            {{ roomDetail.sfhf }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.container {
  background-color: #f7f7f7;
  padding-bottom: 20px;
  min-height: 100vh;
}
.square-swiper {
  width: 100%;
  height: 600px;
}
.top {
  padding: 0 20px;
  height: 90px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-weight: 400;
    font-size: 48px;
  }
  .collect {
    display: flex;
    align-items: center;
    span {
      font-size: 28px;
      color: #8a8a8a;
    }
    .img {
      width: 32px;
      height: 32px;
      margin-left: 5px;
    }
  }
}
.content {
  margin: 20px 0;
  display: flex;
  padding: 20px 20px 0 20px;
  flex-direction: column;
  background-color: white;

  .content-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    width: 100%;
    border-bottom: 1px solid #f0efef;
    &-left {
      width: 350px;
      &-text {
        font-size: 28px;
        color: #8a8a8a;
      }
    }
    &-right {
      margin-left: 20px;
      &-text {
        font-size: 28px;
        color: #8a8a8a;
      }
    }
  }
}
</style>
