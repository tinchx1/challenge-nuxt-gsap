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
const current = ref(0);
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
const { updateSlide } = useUpdateSlide(currentIndex, slidesCopy, currentTitle, nextTitle, Direction, carousel, isMobile, prev, next,current , slides);
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
</script>

<template>
  <div class="carousel-wrapper">
    <button v-if="isMobile" ref="prev" class="btn prev" @click="prevSlide">
      <span>◀</span>
    </button>
    <div class="carousel-container">
    <div class="index-container">
      <template v-for="(slide, index) in slidesCopy" :key="index">
        <h4 :class="{ active: index === currentIndex }">{{ slide.title }}</h4>
      </template>
    </div>

      <div class="title-overlay">
        <h2 class="title title-current" v-html="splitTitle"></h2>
        <h2 v-if="nextTitle" class="title title-next" v-html="splitNextTitle"></h2>
      </div>
      <div ref="carousel" class="carousel">
        <template v-if="isMobile" v-for="(slide, index) in slidesCopy" :key="index">
            <MediaItem customClass="carousel-item" :media="slide.media" />
        </template>
        <template v-else>
          <div class="media-button out">
            <MediaItem id="carousel" customClass="carousel-item" v-show="true" :media="slides[currentIndex === 0 ? slides.length - 2 : (currentIndex - 2 + slides.length) % slides.length].media" />
          </div>
        <div class="media-button prev" ref="prev" @click="prevSlide">
          <MediaItem id="carousel" customClass="carousel-item" v-show="true" :media="slides[currentIndex === 0 ? slides.length - 1 : currentIndex - 1].media" />
        </div>
        <div class="current" ref="current">
          <MediaItem id="carousel"  v-show="true" customClass="carousel-item" :media="slides[currentIndex].media" />
        </div>
        <div class="media-button next" ref="next" @click="nextSlide">
          <MediaItem id="carousel" customClass="carousel-item" v-show="true" :media="slides[(currentIndex + 1) % slides.length].media"  />
        </div>
          <div class="media-button out">
            <MediaItem id="carousel" customClass="carousel-item" v-show="true" :media="slides[(currentIndex + 2) % slides.length].media" />
          </div>
          <div :style="{ backgroundImage: `url(${slides[currentIndex].media.src})` }" class="background"></div>
        </template>
      </div>
    </div>
    <button v-if="isMobile" ref="next" @click="nextSlide" class="btn next">
      <span>▶</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/carousel.scss';
@use '@/assets/styles/media.scss';
</style>
