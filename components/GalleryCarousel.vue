<script setup>
import { ref, onMounted, onUnmounted, toRefs } from "vue";
import { useAutoplay } from "../composables/useAutoplay";
import { useNavigation } from "../composables/useNavigation";
import { useUpdateSlide } from "../composables/useUpdateSlide";
import { useSplitTitle } from "../composables/useSplitTitle";
import { useIsMobile } from "../composables/useIsMobile";
import MediaItem from "./MediaItem.vue";

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
const prev = ref(null);
const next = ref(null);
const { loop, slides, autoplay, autoplayDelay } = toRefs(props);
const { isMobile } = useIsMobile();
const carousel = ref(null);

const currentIndex = ref(0);
const currentTitle = ref(slides.value[0]?.title || "");
const nextTitle = ref("");

// Crear una copia de slides
const slidesCopy = ref([...slides.value]);

// Validar que el componente reciba al menos 3 slides
if (slidesCopy.value.length < 3) {
  slidesCopy.value = [...slidesCopy.value, ...slidesCopy.value, ...slidesCopy.value].slice(0, 3);
}

const { splitTitle, splitNextTitle } = useSplitTitle(currentTitle, nextTitle);
const { updateSlide } = useUpdateSlide(currentIndex, slidesCopy, currentTitle, nextTitle, Direction, carousel, isMobile, prev, next);
const { nextSlide, prevSlide } = useNavigation(currentIndex, slidesCopy, updateSlide, Direction);
const { startAutoplay, stopAutoplay } = useAutoplay(nextSlide, autoplayDelay, loop, currentIndex, slidesCopy);

onMounted(() => {
  if (autoplay.value) {
    startAutoplay();
  }
});

onUnmounted(() => {
  stopAutoplay();
});
console.log(carousel)
</script>

<template>
  <div class="carousel-wrapper">
    <button ref="prev" class="btn prev" @click="prevSlide">
      <span v-if="isMobile">◀</span>
      <template v-else>
        <MediaItem customClass="media-button" :media="currentIndex === 0 ? slidesCopy[slidesCopy.length - 1].media : slidesCopy[currentIndex - 1].media" />
      </template>
    </button>
    <div class="carousel-container">
      <div class="title-overlay">
        <h2 class="title title-current" v-html="splitTitle"></h2>
        <h2 v-if="nextTitle" class="title title-next" v-html="splitNextTitle"></h2>
      </div>

      <div ref="carousel" class="carousel">
        <template v-for="(slide, index) in slidesCopy" :key="index">
          <MediaItem customClass="carousel-item" :media="slide.media" />
        </template>
      </div>
    </div>
    <button ref="next" @click="nextSlide" class="btn next">
      <span v-if="isMobile">▶</span>
      <template v-else>
        <MediaItem customClass="media-button" :media="currentIndex === slidesCopy.length - 1 ? slidesCopy[0].media : slidesCopy[currentIndex + 1].media" />
      </template>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/carousel.scss';
</style>
