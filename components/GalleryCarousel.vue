<script setup>
import { ref, computed, onMounted, onUnmounted, toRefs } from "vue";
import { useAutoplay } from "../composables/useAutoplay";
import { useNavigation } from "../composables/useNavigation";
import { useUpdateSlide } from "../composables/useUpdateSlide";
import { useSplitTitle } from "../composables/useSplitTitle";
import { useIsMobile } from "../composables/useIsMobile";
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
  autoplay: {
    type: Boolean,
    default: false,
  },
  autoplayDelay: {
    type: Number,
    default: 5000,
  },
});

const { loop, slides, autoplay, autoplayDelay } = toRefs(props);
const  { isMobile } = useIsMobile();
const carousel = ref(null);
const currentIndex = ref(0);
const currentTitle = ref(slides.value[0]?.title || "");
const nextTitle = ref("");

const slidesCopy = ref([...slides.value]);


if (slidesCopy.value.length < 3) {
  slidesCopy.value = [...slidesCopy.value, ...slidesCopy.value, ...slidesCopy.value].slice(0, 3);
}
const { splitTitle, splitNextTitle } = useSplitTitle(currentTitle, nextTitle);
const { updateSlide } = useUpdateSlide(currentIndex, slidesCopy, currentTitle, nextTitle, Direction, carousel);
const { nextSlide, prevSlide } = useNavigation(currentIndex, slidesCopy, loop, updateSlide, Direction);
const { startAutoplay, stopAutoplay } = useAutoplay(nextSlide, autoplayDelay, loop, currentIndex, slidesCopy);

onMounted(() => {
  if (autoplay.value) {
    startAutoplay();
  }
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <div class="carousel-wrapper">
    <button v-if="currentIndex !== 0" class="btn prev" @click="prevSlide">◀</button>
    <div class="carousel-container">
      <div class="title-overlay">
        <h2 class="title title-current" v-html="splitTitle"></h2>
        <h2 v-if="nextTitle" class="title title-next" v-html="splitNextTitle"></h2>
      </div>

      <div ref="carousel" class="carousel">
        <template v-for="(slide, index) in slidesCopy" :key="index">
          <img
            v-if="slide.media.type === 'image'"
            :src="slide.media.src"
            class="carousel-item"
          />
          <video
            v-else
            autoplay
            loop
            muted
            playsinline
            :src="slide.media.src"
            class="carousel-item"
          ></video>
        </template>
      </div>
    </div>
    <button v-if="currentIndex !== slides.length - 1 && isMobile" @click="nextSlide" class="btn next">▶</button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/carousel.scss';
</style>
