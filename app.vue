<template>
  <main>
    <GalleryCarousel :slides="sliderVideos" :loop="false" :autoplay=false :autoplay-delay="5000" />
  
  </main>
</template>

<script setup>
import GalleryCarousel from "./components/GalleryCarousel.vue";

const sliderVideos = [
  {
    title: "Mono Primate",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2023/08/28/178061-858827923_large.mp4",
      w: "1920",
      h: "1080",
    }
  },
  {
    title: "Guacamayo",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2022/05/12/116780-709887677_large.mp4",
      w: "1920",
      h: "1080",
    }
  },
  
  {
    title: "Leon Hagenbeck",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2017/01/01/6970-197914397_large.mp4",
      w: "1920",
      h: "1080",
    }
  },

  {
    title: "Aguila",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2021/07/02/79866-570708318_large.mp4",
      w: "1920",
      h: "1080",
    }
  },
  {
    title: "Bufalo",
    media: {
      type: "image",
      src: "https://cdn.pixabay.com/photo/2016/09/20/08/51/buffalo-1682061_640.jpg",
      w: "1920",
      h: "1080",
    }
  }
];


</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss';
</style>