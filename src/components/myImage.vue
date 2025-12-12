<template>
  <image
    :src="localSrc"
    alt=""
    style="height: 100%; width: 100%"
    draggable="false"
    @click="previewImg(localSrc)"
    @error="handleError"
  />
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
