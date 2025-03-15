
export function useNavigation(updateSlide, Direction) {
  const nextSlide = () => {
    updateSlide(Direction.UP);
    // }, 120);
  }
  const prevSlide = () => {
    updateSlide(Direction.DOWN);
    // }, 120);
  }
  return { nextSlide, prevSlide };
}