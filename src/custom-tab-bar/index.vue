<template>
  <div class="custom-tab-bar">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="tab-item"
      @click="switchTab(index)"
    >
      <image
        :src="current === index ? item.selectedIconPath : item.iconPath"
        mode="aspectFit"
        class="icon"
      ></image>
      <div class="text" :class="{ active: current === index }">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Taro from "@tarojs/taro";
import indexActive from "../assets/index-active.png";
import index from "../assets/index.png";
import mineActive from "../assets/mine-active.png";
import mine from "../assets/mine.png";

const current = ref(0);

// 监听tabbar切换
Taro.eventCenter.on("tabbarChange", (index) => {
  current.value = index;
});

const list = [
  {
    pagePath: "pages/zuke/index",
    iconPath: index,
    selectedIconPath: indexActive,
    text: "首页",
  },
  {
    pagePath: "pages/mine/index",
    iconPath: mine,
    selectedIconPath: mineActive,
    text: "我的",
  },
];

// 页面加载时设置当前选中项
const setTabBarIndex = () => {
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const route = currentPage.route;

  // 根据当前页面设置tabbar选中项
  const index = list.findIndex((item) => item.pagePath === route);
  if (index !== -1) {
    current.value = index;
  }
};

// 组件挂载时设置初始状态
onMounted(() => {
  // 延迟执行以确保页面完全加载
  setTimeout(() => {
    setTabBarIndex();
  }, 0);
});

const switchTab = (index) => {
  current.value = index;
  Taro.switchTab({
    url: `/${list[index].pagePath}`,
  });

  // 发送事件通知其他组件tabbar已切换
  Taro.eventCenter.trigger("tabbarChange", index);
};
</script>

<style lang="scss">
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: white;
  display: flex;
  border-top: 1px solid #eee;
  z-index: 999;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  cursor: pointer;
}

.icon {
  width: 48px;
  height: 48px;
  margin-bottom: 2px;
  transition: all 0.3s ease;
}

.text {
  font-size: 24px;
  color: #666;
  transition: color 0.3s ease;
}

.text.active {
  color: #c82f1b;
}
</style>
