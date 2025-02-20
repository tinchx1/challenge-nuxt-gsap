<script setup>
import { ref, computed, onMounted, toRefs } from "vue";
import { gsap } from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

const Direction = {
  UP: 'up',
  DOWN: 'down'
};
const props = defineProps({
  loop: {
    type: Boolean,
    default: true,
  },
  slides: {
    type: Array,
    required: true,
  },
});

const { loop, slides } = toRefs(props);
const carousel = ref(null);
const currentIndex = ref(0);
const currentTitle = ref(slides.value[0]?.title || "");
const nextTitle = ref("");

const splitTitle = computed(() => currentTitle.value.split("").map(letter => `<span class="letter">${letter}</span>`).join(""));
const splitNextTitle = computed(() => nextTitle.value.split("").map(letter => `<span class="letter">${letter}</span>`).join(""));

onMounted(() => {
  updateSlide();
});


const updateSlide = (direction) => {
  const state = Flip.getState(".carousel-item");
  const width = window.innerWidth;

  nextTitle.value = slides.value[currentIndex.value]?.title;

  setTimeout(() => {
    const tl = gsap.timeline();

    gsap.set(".title-next .letter", {
      y: direction === Direction.UP ? "100%" : "-100%", 
      opacity: 0,
    });

    tl.to(".title-current .letter", {
      y: direction === Direction.UP ? "-100%" : "100%", 
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.04, 
    }, 0)
    .to(".title-next .letter", {
      y: "0%",
      opacity: 1,
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.04, 
      onComplete: () => {
        currentTitle.value = nextTitle.value;
        nextTitle.value = "";
      },
    }, 0.1);

    gsap.to(carousel.value, {
      x: -currentIndex.value * width,
      duration: 1,
      ease: "power2.inOut",
      onStart: () =>
        Flip.from(state, {
          duration: 1,
          ease: "power2.inOut",
        }),
    });
  }, 0.2);
};

const nextSlide = () => {
  currentIndex.value =
    currentIndex.value < slides.value.length - 1
      ? currentIndex.value + 1
      : loop.value
      ? 0
      : slides.value.length - 1;
  updateSlide(Direction.UP);
};

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value > 0
      ? currentIndex.value - 1
      : loop.value
      ? slides.value.length - 1
      : 0;
  updateSlide(Direction.DOWN);
};
</script>

<template>
  <div class="carousel-wrapper">
    <button @click="prevSlide" class="btn prev">◀</button>
    <div class="carousel-container">
      <!-- 🔥 Animación con letras individuales -->
      <div class="title-overlay">
        <h2 class="title title-current" v-html="splitTitle"></h2>
        <h2 v-if="nextTitle" class="title title-next" v-html="splitNextTitle"></h2>
      </div>

      <div ref="carousel" class="carousel">
        <template v-for="(slide, index) in slides" :key="index">
          <img
            v-if="slide.media.type === 'image'"
            :src="slide.media.src"
            class="carousel-item"
            width="100%"
            height="100%"
          />
          <video
            v-else
            autoplay
            loop
            muted
            playsinline
            :src="slide.media.src"
            class="carousel-item"
            width="100%"
            height="100%"
            controls
          ></video>
        </template>
      </div>
    </div>
    <button @click="nextSlide" class="btn next">▶</button>
  </div>
</template>
<style lang="scss" scoped>
@use '@/assets/styles/carousel.scss';
</style>
