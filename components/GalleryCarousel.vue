<script setup>
import { ref, onMounted } from "vue";
const { $gsap } = useNuxtApp();

const images = ref([
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/img5.jpg"
]);

const carousel = ref(null); // Referencia al contenedor de imágenes

onMounted(() => {
  $gsap.to(carousel.value, {
    xPercent: -100 * (images.value.length - 1),
    ease: "none",
    duration: 10,
    repeat: -1 // Loop infinito
  });
});
</script>

<template>
  <div class="carousel-wrapper">
    <div ref="carousel" class="carousel">
      <img v-for="(img, index) in images" :key="index" :src="img" class="carousel-item" />
    </div>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.carousel {
  display: flex;
  white-space: nowrap;
  will-change: transform;
}

.carousel-item {
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin-right: 10px;
}
</style>
