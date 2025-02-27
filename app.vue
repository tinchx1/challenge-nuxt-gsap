<template>
  <main>
    <GalleryCarousel :slides="sliderVideos" :loop="false" :autoplay=false :autoplay-delay="5000" />
  
  </main>
</template>

<script setup>
import GalleryCarousel from "./components/GalleryCarousel.vue";

const sliderVideos = [
  {
    title: "Guacamayo",
    media: {
      type: "image",
      src: "https://cdn.pixabay.com/photo/2014/06/24/17/38/smoke-376543_640.jpg",
      w: "1920",
      h: "1080",
    }
  },
  
  {
    title: "Leon Hagenbeck",
    media: {
      type: "image",
      src: "https://cdn.pixabay.com/photo/2020/04/17/06/39/smoke-5053431_640.jpg",
      w: "1920",
      h: "1080",
    }
  },
  {
    title: "Bufalo",
    media: {
      type: "image",
      src: "https://cdn.pixabay.com/photo/2015/10/22/17/34/smoke-1001667_640.png",
      w: "1920",
      h: "1080",
    }
  },
  {
    title: "Mono Primate",
    media: {
      type: "image",
      src: "https://cdn.pixabay.com/photo/2015/10/22/17/32/smoke-1001664_640.png",
      w: "1920",
      h: "1080",
    }
  },
];


</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss';
</style>