<script setup>
import {
  getRoomDetail,
  getIsCollect,
  updateCollect,
  addCollect,
  delCollect,
  getCommentList,
  delComment,
} from "../../../api/zuke";
import { ref } from "vue";
import dayjs from "dayjs";
import Taro from "@tarojs/taro";
// 组件参数
const roomDetail = ref({});
const userid = Taro.getStorageSync("userid");
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
    userid: userid,
  };
  const res = await getIsCollect(param);
  if (res.code == 0) {
    isCollect.value = res.data.list.length > 0;
    collectInfo.value = res.data.list[0];
  }
};
getIsCollectData();
// 收藏房源
const addCollectData = async () => {
  let id = Taro.getCurrentInstance().router?.params?.id;
  let param = {
    name: roomDetail.value.fangwumingcheng,
    picture: roomDetail.value.fangwutupian.split(",")[0],
    refId: id,
    tableName: "fangyuanxinxi",
    userid: userid,
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
const show = ref(false);
const toCommentList = () => {
  show.value = true;
};
const delCommentFn = async (item) => {
  let param = [item.id];
  const res = await delComment(param);
  if (res.code == 0) {
    Taro.showToast({
      title: "删除成功",
      icon: "none",
    });
    getCommentListData();
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
        <img
          :src="'http://localhost:8080/zufangguanli/' + item"
          alt=""
          style="height: 100%; width: 100%"
          draggable="false"
        />
      </nut-swiper-item>
    </nut-swiper>
    <div class="top">
      <h1>{{ roomDetail.fangyuanbianhao }}</h1>
      <div v-if="!isCollect" class="collect" @click="addCollectData">
        <span>收藏</span
        ><image src="../../../assets/cancelLike.png" alt="" class="img" />
      </div>
      <div v-else class="collect" @click="delCollectData">
        <span>取消收藏</span
        ><image src="../../../assets/like.png" alt="" class="img" />
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
    <div class="reserve-btn">
      <nut-button color="#b13a3d">预约</nut-button>
    </div>
    <nut-popup
      v-model:visible="show"
      :style="{ height: '500px' }"
      position="bottom"
    >
      <div class="comment" style="height: 460px">
        <div class="comment-top">
          <div class="comment-top-text">评论·{{ commentList.length }}</div>
        </div>
        <div style="height: 400px; overflow: auto">
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
              v-if="item.userid == userid"
              size="mini"
              class="comment-item-btn"
              @click="delCommentFn(item)"
              >删除</nut-button
            >
          </div>
        </div>
      </div>
    </nut-popup>
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
      margin-top: 6px;
      width: 30px;
      height: 30px;
      border: 1px solid #dfdfdf;
      border-radius: 50%;
    }
    .comment-item-right {
      margin-left: 15px;
      width: 580px;
      .comment-item-right-nickname {
        font-size: 32px;
        color: black;
      }
      .comment-item-right-content {
        font-size: 28px;
        color: #8a8a8a;
      }
    }
  }
}
.reserve-btn {
  position: fixed;
  bottom: 20px;
  left: 550px;
}
</style>
