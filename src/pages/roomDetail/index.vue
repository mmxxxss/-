<script setup>
import {
  getRoomDetail,
  getIsCollect,
  updateCollect,
  addCollect,
  delCollect,
  getCommentList,
  delComment,
  sendComment,
  reserveRoom,
} from "../../api/zuke";
import publishDialog from "../../components/publishDialog.vue";
import { ref } from "vue";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
// 组件参数
const roomDetail = ref({});
const userinfo = Taro.getStorageSync("userinfo");
// 轮播图列表
const swiperList = ref([]);
// 获取房源详情
const getRoomDetailData = async () => {
  let id = Taro.getCurrentInstance().router?.params?.id;
  const res = await getRoomDetail(id);
  if (res.code == 0) {
    roomDetail.value = res.data;
    swiperList.value = res.data.fangwutupian.split(",");
  }
};
getRoomDetailData();
// 获取是否收藏
const isCollect = ref(false);
const collectInfo = ref({});
const getIsCollectData = async () => {
  let id = Taro.getCurrentInstance().router?.params?.id;
  let param = {
    page: 1,
    limit: 1,
    type: 1,
    refid: id,
    tablename: "fangyuanxinxi",
    userid: userinfo.id.toString(),
  };
  const res = await getIsCollect(param);
  if (res.code == 0) {
    if (res.data.list.length > 0) {
      isCollect.value = true;
      collectInfo.value = res.data.list[0];
    } else {
      isCollect.value = false;
      collectInfo.value = {};
    }
  }
};
getIsCollectData();
// 收藏房源
const addCollectData = async () => {
  let param = {
    name: roomDetail.value.fangyuanbianhao,
    picture: roomDetail.value.fangwutupian.split(",")[0],
    refid: roomDetail.value.id,
    tablename: "fangyuanxinxi",
    userid: userinfo.id.toString(),
    type: 1,
  };
  const res = await addCollect(param);
  if (res.code == 0) {
    Taro.showToast({
      title: "收藏成功",
      icon: "none",
    });
    roomDetail.value.storeupNumber += 1;
    await updateCollect(roomDetail.value);
    getRoomDetailData();
    getIsCollectData();
  }
};
// 取消收藏房源
const delCollectData = async () => {
  let param = [collectInfo.value.id];
  const res = await delCollect(param);
  if (res.code == 0) {
    Taro.showToast({
      title: "取消收藏成功",
      icon: "none",
    });
    roomDetail.value.storeupNumber -= 1;
    await updateCollect(roomDetail.value);
    getRoomDetailData();
    getIsCollectData();
  }
};
const commentList = ref([]);
// 获取评论列表
const getCommentListData = async () => {
  let id = Taro.getCurrentInstance().router?.params?.id;
  let param = {
    sort: "id",
    order: "desc",
    page: 1,
    limit: 20,
    refid: id,
  };
  const res = await getCommentList(param);
  if (res.code == 0) {
    commentList.value = res.data.list;
  }
};
getCommentListData();
// 跳转到评论列表
const isShowComment = ref(false);
const toCommentList = () => {
  isShowComment.value = true;
};
const delCommentFn = async (item) => {
  let param = [item.id];
  const res = await delComment(param);
  if (res.code == 0) {
    Taro.showToast({
      title: "删除成功",
      icon: "none",
    });
    roomDetail.value.discussNumber -= 1;
    await updateCollect(roomDetail.value);
    getRoomDetailData();
    getCommentListData();
  }
};
// 发表评论
const isShowSendComment = ref(false);
const openSendComment = () => {
  isShowSendComment.value = true;
};
const sendCommentFn = async (val) => {
  let params = {
    avatarurl: userinfo.touxiang,
    content: val,
    refid: Taro.getCurrentInstance().router?.params?.id,
    userid: userinfo.id.toString(),
    nickname: userinfo.zukeming,
  };
  const res = await sendComment(params);
  if (res.code == 0) {
    Taro.showToast({
      title: "发表成功",
      icon: "none",
    });
    isShowSendComment.value = false;
    roomDetail.value.discussNumber += 1;
    await updateCollect(roomDetail.value);
    getRoomDetailData();
    getCommentListData();
  }
};
const isShowReserve = ref(false);
const openReserve = () => {
  isShowReserve.value = true;
};
const closeReserve = () => {
  isShowReserve.value = false;
};
const reserveForm = ref({
  yuyueshijian: "",
  zulinrenshu: "",
});
// 保存预约
const saveReserve = async () => {
  if (roomDetail.value.zulinrenshu < Number(reserveForm.value.zulinrenshu)) {
    Taro.showToast({
      title: "预约人数不足",
      icon: "none",
    });
    return;
  }
  let params = {
    fangdong: roomDetail.value.fangdong,
    fangdongxingming: roomDetail.value.fangdongxingming,
    fangwudizhi: roomDetail.value.fangwudizhi,
    fangwumianji: roomDetail.value.fangwumianji,
    fangwumingcheng: roomDetail.value.fangwumingcheng,
    fangwutupian: roomDetail.value.fangwutupian,
    huxing: roomDetail.value.huxing,
    shhf: roomDetail.value.shhf,
    xingming: userinfo.xingming,
    yuyueshijian: reserveForm.value.yuyueshijian,
    zulinrenshu: reserveForm.value.zulinrenshu,
    zukeming: userinfo.zukeming,
    zulinjiage: roomDetail.value.zulinjiage,
  };
  const res = await reserveRoom(params);
  if (res.code == 0) {
    roomDetail.value.zulinrenshu -= Number(reserveForm.value.zulinrenshu);
    const res1 = await updateCollect(roomDetail.value);
    if (res1.code == 0) {
      Taro.showToast({
        title: "预约成功",
        icon: "none",
      });
      getRoomDetailData();
      closeReserve();
    }
  }
};
const datePopupVisible = ref(false);
const min = new Date();
const max = new Date(2026, 10, 1, 23, 59);
const date = new Date();
const confirm = ({ selectedValue }) => {
  datePopupVisible.value = false;
  let time = "";
  for (let item in selectedValue) {
    time += selectedValue[item];
  }
  reserveForm.value.yuyueshijian = dayjs(time).format("YYYY-MM-DD hh:mm:ss");
};
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
      <h1>{{ roomDetail.fangyuanbianhao }}</h1>
      <div v-if="!isCollect" class="collect" @click="addCollectData">
        <span>收藏</span
        ><image src="../../assets/cancelLike.png" alt="" class="img" />
      </div>
      <div v-else class="collect" @click="delCollectData">
        <span>取消收藏</span
        ><image src="../../assets/like.png" alt="" class="img" />
      </div>
    </div>
    <div class="content">
      <div class="content-item">
        <div class="content-item-left">
          <div>房屋名称</div>
          <div class="content-item-left-text">
            {{ roomDetail.fangwumingcheng }}
          </div>
        </div>
        <div class="content-item-right">
          <div>房屋面积</div>
          <div class="content-item-right-text">
            {{ roomDetail.fangwumianji }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div>发布时间</div>
          <div class="content-item-left-text">
            {{ roomDetail.fabushijian }}
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
          <div>租赁方式</div>
          <div class="content-item-left-text">
            {{ roomDetail.zulinfangshi }}
          </div>
        </div>
        <div class="content-item-right">
          <div>租赁价格</div>
          <div class="content-item-right-text">
            {{ roomDetail.zulinjiage }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div>是否有人租赁</div>
          <div class="content-item-left-text">
            {{ roomDetail.shifouyourenzulin }}
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
          <div>手机号</div>
          <div class="content-item-right-text">
            {{ roomDetail.shoujihao }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div>邮箱</div>
          <div class="content-item-left-text">
            {{ roomDetail.youxiang }}
          </div>
        </div>
        <div class="content-item-right">
          <div>收藏数</div>
          <div class="content-item-right-text">
            {{ roomDetail.storeupNumber }}
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="content-item-left">
          <div>评论数</div>
          <div class="content-item-left-text">
            {{ roomDetail.discussNumber }}
          </div>
        </div>
        <div class="content-item-right">
          <div>地址</div>
          <div class="content-item-right-text">
            {{ roomDetail.fulladdress }}
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
      </div>
    </div>
    <div class="comment">
      <div class="comment-top">
        <div class="comment-top-text">评论·{{ commentList.length }}</div>
        <div class="comment-top-view" @click="toCommentList">查看全部+</div>
      </div>
      <div
        v-for="(item, index) in commentList"
        :key="index"
        class="comment-item"
      >
        <image
          :src="'http://localhost:8080/zufangguanli/' + item.avatarurl"
          alt=""
          class="comment-item-avatar"
        />
        <div class="comment-item-right">
          <div class="comment-item-right-nickname">
            {{ item.nickname || "匿名用户" }}
          </div>
          <div v-html="item.content" class="comment-item-right-content"></div>
        </div>
      </div>
    </div>
    <div class="save">
      <nut-button color="#b13a3d" @click="openReserve">预约</nut-button>
    </div>
    <nut-popup
      v-model:visible="isShowComment"
      :style="{ height: '500px' }"
      position="bottom"
    >
      <div class="comment" style="height: 460px">
        <div class="comment-top">
          <div class="comment-top-text">评论·{{ commentList.length }}</div>
          <div class="comment-top-view" @click="openSendComment">发表</div>
        </div>
        <div style="height: 400px; overflow-y: auto">
          <div
            v-for="(item, index) in commentList"
            :key="index"
            class="comment-item"
          >
            <image
              :src="'http://localhost:8080/zufangguanli/' + item.avatarurl"
              alt=""
              class="comment-item-avatar"
            />
            <div class="comment-item-right">
              <div class="comment-item-right-nickname">
                {{ item.nickname || "匿名用户" }}
              </div>
              <div
                v-html="item.content"
                class="comment-item-right-content"
              ></div>
            </div>
            <nut-button
              type="primary"
              v-if="item.userid == userinfo.id"
              size="mini"
              class="comment-item-btn"
              @click="delCommentFn(item)"
              >删除</nut-button
            >
          </div>
        </div>
      </div>
    </nut-popup>
    <nut-popup
      v-model:visible="isShowReserve"
      :style="{ height: '500px' }"
      position="bottom"
    >
      <nut-form>
        <nut-form-item label="房屋名称">
          <nut-input v-model="roomDetail.fangwumingcheng" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="房屋图片">
          <img
            v-for="(item, index) in roomDetail.fangwutupian?.split(',') || []"
            :key="index"
            :src="'http://localhost:8080/zufangguanli/' + item"
            alt=""
            class="reverse-img"
            @click="previewImg(item)"
          />
        </nut-form-item>
        <nut-form-item label="房屋面积">
          <nut-input v-model="roomDetail.fangwumianji" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="房屋地址">
          <nut-input v-model="roomDetail.fangwudizhi" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="租赁价格">
          <nut-input v-model="roomDetail.zulinjiage" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="户型">
          <img
            v-for="(item, index) in roomDetail.huxing?.split(',') || []"
            :key="index"
            :src="'http://localhost:8080/zufangguanli/' + item"
            alt=""
            class="reverse-img"
            @click="previewImg(item)"
          />
        </nut-form-item>
        <nut-form-item label="房东">
          <nut-input v-model="roomDetail.fangdong" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="租客">
          <nut-input v-model="userinfo.zukeming" disabled></nut-input>
        </nut-form-item>
        <nut-form-item label="预约时间">
          <div
            @click="datePopupVisible = true"
            style="width: 200px; height: 21px"
          >
            {{ reserveForm.yuyueshijian }}
          </div>
        </nut-form-item>
        <nut-form-item label="租赁人数">
          <nut-input
            v-model="reserveForm.zulinrenshu"
            type="number"
          ></nut-input>
        </nut-form-item>
        <nut-form-item>
          <div class="reserve-save">
            <nut-button type="default" @click="closeReserve">取消</nut-button>
            <nut-button
              type="primary"
              @click="saveReserve"
              style="margin-left: 20px"
              >保存</nut-button
            >
          </div>
        </nut-form-item>
      </nut-form>
    </nut-popup>
    <nut-popup v-model:visible="datePopupVisible" position="bottom">
      <nut-date-picker
        v-model="date"
        :min-date="min"
        :max-date="max"
        type="datetime"
        :three-dimensional="false"
        @confirm="confirm"
        @cancel="datePopupVisible = false"
      ></nut-date-picker>
    </nut-popup>
    <publishDialog
      v-model:isShowSendComment="isShowSendComment"
      @sendComment="sendCommentFn"
    />
  </div>
</template>
<style lang="scss">
.container {
  background-color: #f0efef;
  padding-bottom: 20px;
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
.comment {
  padding: 20px;
  height: 300px;
  overflow: hidden;
  background-color: white;
  .comment-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .comment-top-text {
      font-size: 35px;
      color: black;
    }
    .comment-top-view {
      font-size: 28px;
      color: #8a8a8a;
    }
  }
  .comment-item {
    display: flex;
    margin-top: 20px;
    .comment-item-avatar {
      flex-shrink: 0;
      margin-top: 6px;
      width: 30px;
      height: 30px;
      border: 1px solid #dfdfdf;
      border-radius: 50%;
      object-fit: cover;
    }
    .comment-item-right {
      flex: 1;
      margin-left: 15px;
      min-width: 0;
      .comment-item-right-nickname {
        font-size: 32px;
        color: black;
      }
      .comment-item-right-content {
        font-size: 28px;
        color: #8a8a8a;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }
  }
}
.save {
  position: fixed;
  bottom: 20px;
  left: 550px;
}
.reverse-img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
.reserve-save {
  display: flex;
  justify-content: center;
}
</style>
