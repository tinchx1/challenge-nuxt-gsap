import { debounce } from 'lodash';

export function useNavigation(currentIndex, slidesCopy, updateSlide, Direction) {
  const nextSlide = debounce(() => {
    updateSlide(Direction.UP);
    // if (currentIndex.value < slidesCopy.value.length - 1) {
    //   currentIndex.value += 1;
    // } else {
    //   currentIndex.value = 0;
    // }
  }, 300);

  const prevSlide = debounce(() => {
    updateSlide(Direction.DOWN);
    // if (currentIndex.value > 0) {
    //   currentIndex.value -= 1;
    // } else {
    //   currentIndex.value = slidesCopy.value.length - 1;
    // }
  }, 300);

  return { nextSlide, prevSlide };
}