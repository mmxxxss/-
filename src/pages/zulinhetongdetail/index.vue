<script setup>
import {
  getRentContractDetail,
  saveContract,
  updateContract,
} from "../../api/zuke";
import { ref } from "vue";
import Taro from "@tarojs/taro";
import myImage from "../../components/myImage.vue";
// 组件参数
const roomDetail = ref({});
// 轮播图列表
const swiperList = ref([]);
// 获取租赁合同详情
const getRoomDetailData = async () => {
  let id = Taro.getCurrentInstance().router?.params?.id;
  const res = await getRentContractDetail(id);
  if (res.code == 0) {
    roomDetail.value = res.data;
    swiperList.value = res.data.fangwutupian.split(",");
  }
};
getRoomDetailData();
const visible = ref(false);
const saveContractData = async () => {
  delete roomDetail.value.hetongriqi;
  let contractForm = JSON.parse(JSON.stringify(roomDetail.value));
  delete contractForm.addtime;
  delete contractForm.id;
  const res = await saveContract(contractForm);
  if (res.code == 0) {
    let form = {
      ...roomDetail.value,
      ispay: "已支付",
      isUsed: "是",
    };
    const res1 = await updateContract(form);
    if (res1.code == 0) {
      Taro.showToast({
        title: "保存成功",
        icon: "none",
      });
      getRoomDetailData();
    }
    visible.value = false;
  }
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
        <myImage :src="item" :style="{ height: '100%', width: '100%' }" />
      </nut-swiper-item>
    </nut-swiper>
    <div class="top">
      <h1>{{ roomDetail.fangwumingcheng }}</h1>
    </div>
    <div class="content">
      <div class="content-item">
        <div class="content-item-left">
          <div class="content-item-left-title">房屋面积</div>
          <div class="content-item-left-text">
            {{ roomDetail.fangwumianji }}
          </div>
        </div>
        <div class="content-item-right">
          <div class="content-item-right-title">房屋地址</div>
          <div class="content-item-right-text">
            {{ roomDetail.fangwudizhi }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div class="content-item-left-title">租赁价格</div>
          <div class="content-item-left-text">
            {{ roomDetail.zulinjiage }}
          </div>
        </div>
        <div class="content-item-right">
          <div class="content-item-right-title">房东</div>
          <div class="content-item-right-text">
            {{ roomDetail.fangdong }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div class="content-item-left-title">房东姓名</div>
          <div class="content-item-left-text">
            {{ roomDetail.fangdongxingming }}
          </div>
        </div>
        <div class="content-item-right">
          <div class="content-item-right-title">租客名</div>
          <div class="content-item-right-text">
            {{ roomDetail.zukexingming }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div class="content-item-left-title">姓名</div>
          <div class="content-item-left-text">
            {{ roomDetail.xingming }}
          </div>
        </div>
        <div class="content-item-right">
          <div class="content-item-right-title">租赁/月</div>
          <div class="content-item-right-text">
            {{ roomDetail.zulinshijian }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div class="content-item-left-title">租赁人数</div>
          <div class="content-item-left-text">
            {{ roomDetail.zulinrenshu }}
          </div>
        </div>
        <div class="content-item-right">
          <div class="content-item-right-title">租赁金额</div>
          <div class="content-item-right-text">
            {{ roomDetail.zulinjine }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div class="content-item-left-title">合同日期</div>
          <div class="content-item-left-text">
            {{ roomDetail.hetongriqi }}
          </div>
        </div>
      </div>
    </div>
    <nut-button
      type="primary"
      @click="visible = true"
      class="rent-btn"
      v-if="roomDetail.isUsed == '否'"
      >租赁</nut-button
    >
    <nut-button type="primary" disabled class="rent-btn" v-else
      >已租赁</nut-button
    >
    <nut-popup
      v-model:visible="visible"
      :style="{ height: '600px' }"
      position="bottom"
    >
      <nut-form :model="roomDetail">
        <nut-form-item label="房屋名称">
          <nut-input v-model="roomDetail.fangwumingcheng" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="房屋图片">
          <div>
            <myImage
              v-for="(item, index) in roomDetail?.fangwutupian?.split(',')"
              :key="index"
              :src="item"
              :style="{ height: '100px', width: '100px', marginRight: '10px' }"
            />
          </div>
        </nut-form-item>
        <nut-form-item label="房屋面积/m3">
          <nut-input v-model="roomDetail.fangwumianji" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="房屋地址">
          <nut-input v-model="roomDetail.fangwudizhi" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="租赁价格">
          <nut-input v-model="roomDetail.zulinjiage" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="户型">
          <div>
            <myImage
              alt=""
              v-for="(item, index) in roomDetail?.huxing?.split(',')"
              :key="index"
              :src="item"
              :style="{ height: '100px', width: '100px', marginRight: '10px' }"
            />
          </div>
        </nut-form-item>
        <nut-form-item label="房东">
          <nut-input v-model="roomDetail.fangdong" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="房东姓名">
          <nut-input v-model="roomDetail.fangdongxingming" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="租客名">
          <nut-input v-model="roomDetail.zukeming" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="姓名">
          <nut-input v-model="roomDetail.xingming" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="租赁/月">
          <nut-input v-model="roomDetail.zulinshijian" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="租赁人数">
          <nut-input v-model="roomDetail.zulinrenshu" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="租赁金额">
          <nut-input v-model="roomDetail.zulinjine" disabled></nut-input>
        </nut-form-item>
      </nut-form>
      <div class="btn-box">
        <nut-button type="default" @click="visible = false" class="btn"
          >取消</nut-button
        >
        <nut-button type="primary" @click="saveContractData">保存</nut-button>
      </div>
    </nut-popup>
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
  padding: 0 20px;
  flex-direction: column;
  background-color: white;

  .content-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #f0efef;
    &-left {
      width: 350px;
      &-title {
        height: 40px;
      }
      &-text {
        height: 40px;
        font-size: 28px;
        color: #8a8a8a;
      }
    }
    &-right {
      margin-left: 20px;
      &-title {
        height: 40px;
      }
      &-text {
        font-size: 28px;
        color: #8a8a8a;
        height: 40px;
      }
    }
  }
}
.rent-btn {
  display: block;
  margin: 0 20px 0 auto;
  width: 180px;
}
.btn-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
  .btn {
    margin-right: 20px;
  }
}
</style>
