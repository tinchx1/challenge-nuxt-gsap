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
      src: "/smoke-1.jpg",
      w: "415",
      h: "640",
    }
  },
  
  {
    title: "Calm Drift",
    media: {
      type: "image",
      src: "/smoke-2.jpg",
      w: "415",
      h: "640",
    }
  },
  {
    title: "Soft Whisper",
    media: {
      type: "image",
      src: "/smoke-3.jpg",
      w: "415",
      h: "640",
    }
  },
  {
    title: "Subtle Balance",
    media: {
      type: "image",
      src: "/smoke-4.jpg",
      w: "415",
      h: "640",
    }
  },
];


</script>

<style lang="scss" scoped>
main {
  background-color: #131114;
  width: 100%;
  height: 100vh;
  display: flex;
}
</style>