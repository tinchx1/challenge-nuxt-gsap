

export function updateIndex(indexRef, totalSlides, direction) {
  if (direction === 'up') {
    indexRef.value = (indexRef.value < totalSlides - 1) ? indexRef.value + 1 : 0;
  } else {
    indexRef.value = (indexRef.value > 0) ? indexRef.value - 1 : totalSlides - 1;
  }
}
