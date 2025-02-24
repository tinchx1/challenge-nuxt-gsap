import { debounce } from 'lodash';

export function useNavigation(currentIndex, slidesCopy, updateSlide, Direction) {
  const nextSlide = debounce(() => {
    if (currentIndex.value < slidesCopy.value.length - 1) {
      currentIndex.value += 1;
    } else {
      currentIndex.value = 0;
    }
    updateSlide(Direction.UP);
  }, 300);

  const prevSlide = debounce(() => {
    if (currentIndex.value > 0) {
      currentIndex.value -= 1;
    } else {
      currentIndex.value = slidesCopy.value.length - 1;
    }
    updateSlide(Direction.DOWN);
  }, 300);

  return { nextSlide, prevSlide };
}