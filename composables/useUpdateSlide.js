import { gsap } from "gsap";
import Flip from "gsap/Flip";
// import { useIsMobile } from "./useIsMobile";

gsap.registerPlugin(Flip);

export function useUpdateSlide(currentIndex, slidesCopy, currentTitle, nextTitle, Direction, carousel) {
  // const { isMobile } = useIsMobile();
  const updateSlide = (direction) => {
    const state = Flip.getState(".carousel-item");
    const width = window.innerWidth;

    nextTitle.value = slidesCopy.value[currentIndex.value]?.title;

    setTimeout(() => {
      const tl = gsap.timeline();

      gsap.set(".title-next .letter", {
        y: direction === Direction.UP ? "100%" : "-100%",
        opacity: 0,
      });

      tl.to(".title-current .letter", {
        y: direction === Direction.UP ? "-100%" : "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: 0.04,
      }, 0)
        .to(".title-next .letter", {
          y: "0%",
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
          stagger: 0.04,
          onComplete: () => {
            currentTitle.value = nextTitle.value;
            nextTitle.value = "";
          },
        }, 0.1);

      gsap.to(carousel.value, {
        x: -currentIndex.value * width,
        duration: 1,
        ease: "power2.inOut",
        onStart: () =>
          Flip.from(state, {
            duration: 1,
            ease: "power2.inOut",
          }),
      });
    }, 0.2);
  };

  return { updateSlide };
}