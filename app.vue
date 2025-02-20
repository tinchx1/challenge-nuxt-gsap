<template>
  <main>
    <GalleryCarousel :slides="sliderVideos" :loop="true" />
  </main>
</template>

<script setup>
import GalleryCarousel from "./components/GalleryCarousel.vue";

const sliderVideos = [
  {
    title: "Video 01",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2023/03/28/156403-812608621_tiny.mp4",
      w: "200",
      h: "300",
    }
  },
  
  {
    title: "Video 02",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2022/07/25/125483-733802506_tiny.mp4",
      w: "200",
      h: "300",
    }
  },
  
  {
    title: "Video 03",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2024/06/04/215334_tiny.mp4",
      w: "200",
      h: "300",
    }
  },

  {
    title: "Video 04",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2024/01/28/198389-907598289_tiny.mp4",
      w: "200",
      h: "300",
    }
  },

  {
    title: "Video 06",
    media: {
      type: "video",
      src: "https://cdn.pixabay.com/video/2023/08/25/177653-858018148_large.mp4",
      w: "1920",
      h: "1080",
    }
  }
];


</script>

<style lang="scss" scoped>
@use '@/assets/styles/main.scss';
</style>