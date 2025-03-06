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
            { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
            "0"
          );

          tl.set(out, { scale: 0, opacity: 0 }, ">1.2");
        }

        showOut(direction === Direction.UP ? "right" : "left");

        // **Botón que no se toca desaparece y reaparece suavemente**
        const buttonNotTouch = direction === Direction.UP ? ".prev" : ".next";

        tl.to(buttonNotTouch, { scale: 0, duration: 1.2, zIndex: 0 }, "0")
          .set(buttonNotTouch, { scale: 1, zIndex: 5 }, ">1.2");
        const widthCurrent = document.querySelector(".current").offsetWidth + 170
        // **Movimiento de la caja actual con transición fluida**
        tl.to(".current", {
          x: direction === Direction.UP ? `-${widthCurrent}px` : `${widthCurrent}px`,
          clipPath: direction === Direction.UP
            ? "polygon(20% 63%,20% 41%, 80% 41%, 80% 63%)"
            : "polygon(80% 41%, 80% 63%, 20% 63%, 20% 41%)",
          height: "100%",
          duration: 1.2,
        }, "0");

        tl.set(".current", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          x: 0,
        }, ">1.2");

        // **Movimiento de la siguiente o anterior caja**
        if (direction === Direction.UP) {
          tl.to(".next", {
            clipPath: "polygon(0% 100%,0% 0%, 100% 0%, 100% 100%)",
            x: `-${widthCurrent}px`,
            duration: 1.2,
            zIndex: 2,
          }, "0");

          tl.set(".next", { clipPath: "polygon(20% 41%, 80% 41%, 80% 63%, 20% 63%)", x: 0, zIndex: 5 }, ">1.2");

        } else {
          tl.to(".prev", {
            clipPath: "polygon(100% 0%, 100% 100%, 0% 100%,0% 0%)",
            x: `${widthCurrent}px`,
            duration: 1.2,
            zIndex: 2,
          }, "0");

          tl.set(".prev", { clipPath: "polygon(20% 41%, 80% 41%, 80% 63%, 20% 63%)", x: 0, zIndex: 5 }, ">1.2");
        }

      }
    }, 0.2);
  };

  return { updateSlide };
}