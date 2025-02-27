import _ from 'lodash';

export function useNavigation(updateSlide, Direction) {
  const nextSlide = _.debounce(() => {
    updateSlide(Direction.UP);
  }, 300);

  const prevSlide = _.debounce(() => {
    updateSlide(Direction.DOWN);
  }, 300);

  return { nextSlide, prevSlide };
}