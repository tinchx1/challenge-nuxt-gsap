import { gsap } from "gsap";
import { updateIndex } from "./useUpdateIndex";

export function useUpdateSlide(currentIndex, slidesCopy, currentTitle, nextTitle, Direction, carousel, isMobile, prev, next, backgroundIndex) {
  const updateSlide = (direction) => {
    const width = window.innerWidth
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
          },
        }, 0.1);
      if (isMobile) {
        updateIndex(currentIndex, slidesCopy.value.length, direction);
        gsap.to(carousel.value, {
          x: -currentIndex.value * width + 1,
          duration: 1,
          ease: "power2.inOut",
        });

      } else {
        const tl = gsap.timeline({
          onComplete: () => updateIndex(currentIndex, slidesCopy.value.length, direction),
        });
        tl.to(".background", {
          opacity: 0.7, duration: 0.5,

          onComplete: () => {
            gsap.set(".background", { opacity: 1 }, ">0.5")
            updateIndex(backgroundIndex, slidesCopy.value.length, direction);
          }
        }, "0")



        // **Animación del efecto de salida**
        function showOut(direction) {
          const outElements = document.querySelectorAll(".out");
          const out = direction === "left" ? outElements[0] : outElements[1];
          const target = direction === "left" ? prev.value : next.value;

          tl.set(out, {
            position: "absolute",
            width: target.offsetWidth + "px",
            height: target.offsetHeight + "px",
            top: target.offsetTop + "px",
            left: target.offsetLeft + "px",
            display: "block",
          }, "0");

          tl.fromTo(
            out,
            { scale: 0, opacity: 0 },
            { scale: 2, opacity: 1, duration: 1.4, ease: "power2.out" },
            "0"
          );

          tl.set(out, { scale: 2, opacity: 0 }, ">1.4");
        }

        showOut(direction === Direction.UP ? "right" : "left");

        // **Botón que no se toca desaparece y reaparece suavemente**
        const buttonNotTouch = direction === Direction.UP ? ".prev" : ".next";

        tl.to(buttonNotTouch, { scale: 0, duration: 1.4, zIndex: 0 }, "0")
          .set(buttonNotTouch, { scale: 1.5, zIndex: 5 }, ">1.4");
        const widthCurrent = document.querySelector(".current").offsetWidth;
        // **Movimiento de la caja actual con transición fluida**
        tl.to(".current", {
          x: direction === Direction.UP ? `-${widthCurrent}px` : `${widthCurrent}px`,
          clipPath: direction === Direction.UP
            ? "polygon(39% 66.66%,39% 33.33%, 61% 33.33%, 61% 66.66%)"
            : "polygon(61% 33.33%, 61% 66.66%, 39% 66.66%, 39% 33.33%)",
          duration: 1.4,
        }, "0");

        tl.set(".current", {
          clipPath: "polygon(28% 0%, 72% 0%, 72% 100%, 28% 100%)",
          x: 0,
        }, ">1.4");

        // **Movimiento de la siguiente o anterior caja**
        if (direction === Direction.UP) {

          tl.to(".next", {
            clipPath: "polygon(28% 100%, 28% 0%, 72% 0%, 72% 100%)",
            x: `-${widthCurrent}px`,
            duration: 1.4,
            zIndex: 2,
          }, "0");

          tl.set(".next", { clipPath: "polygon(39% 33.33%, 61% 33.33%, 61% 66.66%, 39% 66.66%)", x: 0, zIndex: 5, scale: 2 }, ">1.4");

        } else {
          tl.to(".prev", {
            clipPath: "polygon(72% 0%, 72% 100%, 28% 100%, 28% 0%)",
            x: `${widthCurrent}px`,
            duration: 1.4,
            zIndex: 2,
          }, "0");

          tl.set(".prev", { clipPath: "polygon(39% 33.33%, 61% 33.33%, 61% 66.66%, 39% 66.66%)", x: 0, zIndex: 5, scale: 2 }, ">1.4");
        }
      }
    }, 0.2);
  };

  return { updateSlide };
}