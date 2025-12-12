<template>
  <img :src="localSrc" alt="" @click="previewImg(localSrc)" />
</template>
<script setup>
import imgError from "../assets/imgError.png";
import { onMounted, ref, watch } from "vue";
import Taro from "@tarojs/taro";
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
});
const previewImg = (src) => {
  Taro.previewImage({
    urls: [src],
  });
};
const localSrc = ref("");
const initSrc = async () => {
  console.log(props.src);

  const res = await Taro.request({
    url: `http://localhost:8080/zufangguanli/${props.src}`,
    method: "GET",
  });
  if (res.data.code === 500) {
    localSrc.value = imgError;
  } else {
    localSrc.value = `http://localhost:8080/zufangguanli/${props.src}`;
  }
};
onMounted(() => {
  initSrc();
});
watch(
  () => props.src,
  async (newVal) => {
    const res = await Taro.request({
      url: `http://localhost:8080/zufangguanli/${newVal}`,
      method: "GET",
    });
    if (res.data.code === 500) {
      localSrc.value = imgError;
    } else {
      localSrc.value = `http://localhost:8080/zufangguanli/${newVal}`;
    }
  }
);
</script>
