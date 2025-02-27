<template>
  <main>
    <GalleryCarousel :slides="sliderVideos" :loop="false" :autoplay=false :autoplay-delay="5000" />
  
  </main>
</template>

<script setup>
import GalleryCarousel from "./components/GalleryCarousel.vue";

const sliderVideos = [
  {
    title: "Serene Space",
    media: {
      type: "image",
      src: "https://cdn.pixabay.com/photo/2014/06/24/17/38/smoke-376543_640.jpg",
      w: "1920",
      h: "1080",
    }
  },
  
  {
    title: "Calm Drift",
    media: {
      type: "image",
      src: "https://cdn.pixabay.com/photo/2020/04/17/06/39/smoke-5053431_640.jpg",
      w: "1920",
      h: "1080",
    }
  },
  {
    title: "Soft Whisper",
    media: {
      type: "image",
      src: "https://cdn.pixabay.com/photo/2015/10/22/17/34/smoke-1001667_640.png",
      w: "1920",
      h: "1080",
    }
  },
  {
    title: "Subtle Balance",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2019/08/10/25922-353764102_tiny.mp4",
      w: "1920",
      h: "1080",
    }
  },
];


</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss';
</style>