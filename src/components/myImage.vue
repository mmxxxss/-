<template>
  <img :src="localSrc" alt="" @click="previewImg(localSrc)" />
</template>
<script setup>
import imgError from "../assets/imgError.png";
import { onMounted, ref } from "vue";
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
const localSrc = ref(props.src);
onMounted(async () => {
  const res = await Taro.request({
    url: props.src,
    method: "GET",
  });
  if (res.data.code === 500) {
    localSrc.value = imgError;
  }
});
</script>
