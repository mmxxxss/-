<script setup>
import Taro from "@tarojs/taro";
import { getRoomList } from "../../api/zuke";
import { ref } from "vue";
// 组件参数
const roomList = ref([]);
const form = ref({
  fangyuanbianhao: "",
  fangwumingcheng: "",
  fangwudizhi: "",
  zulinjiageStart: "",
  zulinjiageEnd: "",
});
const showFilter = ref(false);
// 组件方法
const openFilter = () => {
  showFilter.value = true;
};
const closeFilter = () => {
  showFilter.value = false;
};
const getRoomListData = async () => {
  let data = JSON.parse(JSON.stringify(form.value));
  for (let key in data) {
    if (data[key] === "") {
      delete data[key];
    }
  }
  let param = {
    page: 1,
    limit: 10,
    ...data,
  };
  const res = await getRoomList(param);
  if (res.code == 0) {
    roomList.value = res.data.list;
  }
};
const handleSearch = () => {
  getRoomListData();
  closeFilter();
};
const handleReset = () => {
  form.value = {
    fangyuanbianhao: "",
    fangwumingcheng: "",
    fangwudizhi: "",
    zulinjiageStart: "",
    zulinjiageEnd: "",
  };
  getRoomListData();
};
const openRoomDetail = (item) => {
  Taro.navigateTo({
    url: "/pages/roomDetail/index?id=" + item.id,
  });
};
getRoomListData();
</script>
<template>
  <div class="container">
    <!-- 筛选按钮 -->
    <div class="filter-btn-wrapper">
      <button class="filter-trigger-btn" @click="openFilter">
        <text>筛选</text>
      </button>
    </div>

    <!-- 弹窗遮罩 -->
    <div v-if="showFilter" class="modal-overlay" @click="closeFilter">
      <!-- 筛选框弹窗 -->
      <div class="filter-modal" @click.stop>
        <div class="modal-header">
          <text class="modal-title">筛选条件</text>
          <button class="close-btn" @click="closeFilter">✕</button>
        </div>
        <div class="modal-body">
          <div class="filter-item">
            <div class="filter-label">房源编号</div>
            <input
              v-model="form.fangyuanbianhao"
              class="filter-input"
              placeholder="请输入房源编号"
            />
          </div>
          <div class="filter-item">
            <div class="filter-label">房屋名称</div>
            <input
              v-model="form.fangwumingcheng"
              class="filter-input"
              placeholder="请输入房屋名称"
            />
          </div>
          <div class="filter-item">
            <div class="filter-label">房屋地址</div>
            <input
              v-model="form.fangwudizhi"
              class="filter-input"
              placeholder="请输入房屋地址"
            />
          </div>
          <div class="filter-item">
            <div class="filter-label">租赁价格</div>
            <div class="filter-range">
              <input
                v-model="form.zulinjiageStart"
                class="filter-input-small"
                placeholder="最低价格"
                type="number"
              />
              <span class="range-separator">-</span>
              <input
                v-model="form.zulinjiageEnd"
                class="filter-input-small"
                placeholder="最高价格"
                type="number"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-reset" @click="handleReset">重置</button>
          <button class="btn btn-search" @click="handleSearch">搜索</button>
        </div>
      </div>
    </div>

    <!-- 房源列表 -->
    <div v-if="roomList.length > 0">
      <div
        v-for="(item, index) in roomList"
        :key="index"
        class="item"
        @click="openRoomDetail(item)"
      >
        <image
          :src="
            'http://localhost:8080/zufangguanli/' +
            item.fangwutupian.split(',')[0]
          "
          alt=""
          class="img"
        />
        <div class="box">
          <div class="content">房源编号：{{ item.fangyuanbianhao }}</div>
          <div class="content">房屋名称：{{ item.fangwumingcheng }}</div>
          <div class="content">房屋地址：{{ item.fangwudizhi }}</div>
          <div class="content">租赁价格：{{ item.zulinjiage }}</div>
          <div class="content">手机号：{{ item.shoujihao }}</div>
        </div>
      </div>
    </div>

    <!-- 空数据提示 -->
    <div v-else class="empty-data">
      <div class="empty-icon">📦</div>
      <div class="empty-text">暂无房源数据</div>
      <div class="empty-tip">请尝试调整筛选条件</div>
    </div>
  </div>
</template>
<style lang="scss">
.container {
  padding-top: 120px;
  background-color: #f7f7f7;
  min-height: 100vh;
}
.filter-btn-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 5%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  box-sizing: border-box;
  .filter-trigger-btn {
    width: 200px;
    height: 80px;
    background-color: rgb(177, 58, 61);
    color: white;
    font-size: 32px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
}
.empty-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  .empty-icon {
    font-size: 120px;
    margin-bottom: 30px;
  }
  .empty-text {
    font-size: 36px;
    font-weight: 500;
    color: #333;
    margin-bottom: 15px;
  }
  .empty-tip {
    font-size: 28px;
    color: #999;
  }
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .filter-modal {
    width: 85%;
    max-height: 80vh;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30px;
      border-bottom: 1px solid #eee;
      .modal-title {
        font-size: 36px;
        font-weight: 600;
        color: #333;
      }
      .close-btn {
        width: 60px;
        height: 60px;
        font-size: 40px;
        color: #999;
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:active {
          color: #666;
        }
      }
    }
    .modal-body {
      flex: 1;
      overflow-y: auto;
      padding: 30px;
      .filter-item {
        margin-bottom: 25px;
        .filter-label {
          font-size: 28px;
          font-weight: 500;
          color: #333;
          margin-bottom: 15px;
        }
        .filter-input {
          width: 100%;
          height: 80px;
          padding: 0 20px;
          font-size: 28px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-sizing: border-box;
          &:focus {
            outline: none;
            border-color: #1890ff;
          }
        }
        .filter-range {
          display: flex;
          align-items: center;
          gap: 15px;
          .filter-input-small {
            flex: 1;
            height: 80px;
            padding: 0 20px;
            font-size: 28px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-sizing: border-box;
            &:focus {
              outline: none;
              border-color: #1890ff;
            }
          }
          .range-separator {
            font-size: 32px;
            color: #999;
          }
        }
      }
    }
    .modal-footer {
      display: flex;
      gap: 20px;
      padding: 30px;
      border-top: 1px solid #eee;
      .btn {
        flex: 1;
        height: 80px;
        font-size: 32px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
      }
      .btn-search {
        background-color: #1890ff;
        color: white;
        &:active {
          background-color: #096dd9;
        }
      }
      .btn-reset {
        background-color: #f5f5f5;
        color: #666;
        &:active {
          background-color: #e0e0e0;
        }
      }
    }
  }
}
.item {
  width: 90%;
  height: 300px;
  display: flex;
  border: 1px solid #ccc;
  margin: 20px auto;
  border-radius: 20px;
  background-color: white;
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
    .content {
      font-size: 24px;
      font-weight: 400;
      color: black;
      margin: 20px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
