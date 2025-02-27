import { debounce } from 'lodash-es'

export function useNavigation(updateSlide, Direction) {
  const nextSlide = debounce(() => {
    updateSlide(Direction.UP);
  }, 300);

  const prevSlide = debounce(() => {
    updateSlide(Direction.DOWN);
  }, 300);

  return { nextSlide, prevSlide };
}