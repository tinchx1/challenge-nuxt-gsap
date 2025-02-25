import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip)


export function useUpdateSlide(currentIndex, slidesCopy, currentTitle, nextTitle, Direction, carousel, isMobile, prev, next) {
  const updateSlide = (direction) => {
    const width = isMobile.value || window.innerWidth < 1200 ? window.innerWidth : "1200";
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
        stagger: 0.04,
      }, 0)
        .to(".title-next .letter", {
          y: "0%",
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          onComplete: () => {
            currentTitle.value = nextTitle.value;
            nextTitle.value = "";
          },
        }, 0.1);
      if (isMobile.value) {
        gsap.to(carousel.value, {
          x: -currentIndex.value * width,
          duration: 1,
          ease: "power2.inOut",
        });
      } else {

        const state = Flip.getState(carousel.value);
        console.log(state);
        (direction === Direction.UP ? next : prev).value.appendChild(carousel.value);
        Flip.from(state, {
          rotate: direction === Direction.UP ? -90 : 90,
          duration: 1,
          ease: "power2.inOut",
          scale: true
        })
        // const buttonNotTouch = direction !== Direction.UP ? ".next" : ".prev";
        // const buttonTouch = direction === Direction.UP ? ".next" : ".prev";

        // gsap.to(buttonNotTouch, {
        //   scale: 0.5,
        //   opacity: 0,
        //   duration: 1,
        // });

        // gsap.to(carousel.value, {
        //   x: (direction === Direction.UP ? 50 : 750) * (direction === Direction.UP ? -1 : 1),
        //   clipPath: "inset(4% 14% 4% 14%)",
        //   rotate: direction === Direction.UP ? -90 : 90,
        //   transformOrigin: "center center",
        //   duration: 1,
        //   width: "360",
        // });

        // gsap.to(buttonTouch, {
        //   x: direction === Direction.UP ? `-=${50}` : `+=${50}`,
        //   // clipPath: "inset(0 32% 0 34%)",
        //   duration: 1,
        //   width: "50%",
        //   height: "100vh",
        //   rotate: direction === Direction.UP ? -90 : 90,
        // });
      }
    }, 0.2);
  };

  return { updateSlide };
}