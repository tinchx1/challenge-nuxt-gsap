import { Flip } from "gsap/Flip";
import { gsap } from "gsap";

gsap.registerPlugin(Flip)

export function useUpdateSlide(currentIndex, slidesCopy, currentTitle, nextTitle, Direction, carousel, isMobile, prev, next, current, slides) {
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
        if (direction === Direction.UP) {

          if (currentIndex.value < slidesCopy.value.length - 1) {
            currentIndex.value += 1;
          } else {
            currentIndex.value = 0;
          }
        } else {
          if (currentIndex.value > 0) {
            currentIndex.value -= 1;
          } else {
            currentIndex.value = slidesCopy.value.length - 1;
          }
        }
      } else {
        const buttonNotTouch = direction === Direction.UP ? ".prev" : ".next";
        gsap.to(buttonNotTouch, {
          scale: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(buttonNotTouch, { scale: 1, delay: 0.2 });
          }
        });

        gsap.to(".current", {
          x: direction === Direction.UP ? "-100%" : "100%",
          rotate: 1,
          zIndex: 1,
          duration: 1.4,
          clipPath: "inset(36% 26% 36% 26%)",
          onComplete: () => {
            gsap.set(".current", { x: 0, rotate: 90, clipPath: "inset(0% 0% 0% 0%)" });
          }
        });
        if (direction === Direction.UP) {
          gsap.to(".next", {
            x: "-98%",
            rotate: 90,
            duration: 1.4,
            clipPath: "inset(0% 0% 0% 0%)",
            onComplete: () => {
              gsap.set(".next", { x: 0, rotate: 0, clipPath: "inset(36% 26% 36% 26%)" })
              if (currentIndex.value < slidesCopy.value.length - 1) {
                currentIndex.value += 1;
              } else {
                currentIndex.value = 0;
              }
            }
          });
        } else {
          gsap.to(".prev", {
            x: "99%",
            rotate: -90,
            duration: 0.8,
            clipPath: "inset(0% 0% 0% 0%)",
            onComplete: () => {
              gsap.set(".prev", { x: 0, rotate: 0, clipPath: "inset(36% 26% 36% 26%)" })
              if (currentIndex.value > 0) {
                currentIndex.value -= 1;
              } else {
                currentIndex.value = slidesCopy.value.length - 1;
              }
            }
          });
        }
      }
    }, 0.2);
  };

  return { updateSlide };
}