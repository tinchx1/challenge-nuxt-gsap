import { ref } from "vue";

export function useAutoplay(nextSlide, autoplayDelay, loop, currentIndex, slidesCopy) {
  const autoplayInterval = ref(null);

  const startAutoplay = () => {
    autoplayInterval.value = setInterval(() => {
      if (!loop.value && currentIndex.value === slidesCopy.value.length - 1) {
        stopAutoplay();
      } else {
        nextSlide();
      }
    }, autoplayDelay.value);
  };

  const stopAutoplay = () => {
    if (autoplayInterval.value) {
      clearInterval(autoplayInterval.value);
      autoplayInterval.value = null;
    }
  };

  return { startAutoplay, stopAutoplay };
}