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
    <button class="btn prev" 
    @click="prevSlide">      
      <span v-if="isMobile">◀</span>
      <template v-else>
        <MediaItem class="media-button" :media="currentIndex === 0 ? slidesCopy[slidesCopy.length - 1].media : slidesCopy[currentIndex - 1].media" />
      </template>
    </button>
    <div class="carousel-container">
      <div class="title-overlay">
        <h2 class="title title-current" v-html="splitTitle"></h2>
        <h2 v-if="nextTitle" class="title title-next" v-html="splitNextTitle"></h2>
      </div>
      <div ref="carousel" class="carousel">
        <template v-for="(slide, index) in slidesCopy" :key="index">
          <MediaItem class="carousel-item" :media="slide.media" />
        </template>
      </div>
    </div>
    <button @click="nextSlide" class="btn next">
      <span v-if="isMobile">▶</span>
      <template v-else>
        <MediaItem class="media-button" :media="currentIndex === slidesCopy.length - 1 ? slidesCopy[0].media : slidesCopy[currentIndex + 1].media" />
      </template>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/carousel.scss';
</style>
