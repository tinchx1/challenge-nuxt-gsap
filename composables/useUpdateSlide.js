import { gsap } from "gsap";


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
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            if (direction === Direction.UP) {
              currentIndex.value = (currentIndex.value < slidesCopy.value.length - 1)
                ? currentIndex.value + 1
                : 0;
            } else {
              currentIndex.value = (currentIndex.value > 0)
                ? currentIndex.value - 1
                : slidesCopy.value.length - 1;
            }
          }
        });

        // **Fondo con opacidad para transición sutil**
        tl.to(".background", { opacity: 0.8, duration: 0.3 }, "0")
          .set(".background", { opacity: 1 }, "0");

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
            {
              scale: 1,
              opacity: 1,
              delay: 0.3,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                setTimeout(() => {
                  gsap.set(out, {
                    opacity: 0,
                    onComplete: () => {
                      out.style.display = "none";
                      out.style.position = "";
                    },
                  });
                }, 300);
              },
            }
          ), "0"
        }



        showOut(direction === Direction.UP ? "right" : "left");

        // **Botón que no se toca desaparece y reaparece suavemente**
        const buttonNotTouch = direction === Direction.UP ? ".prev" : ".next";

        tl.to(buttonNotTouch, { scale: 0, duration: 0.9, zIndex: 0 }, "0")
          .set(buttonNotTouch, { scale: 1, zIndex: 5 }, "0");

        // **Movimiento de la caja actual con transición fluida**
        tl.to(".current", {
          x: direction === Direction.UP ? "-140.7%" : "140.7%",
          clipPath: direction === Direction.UP ? "polygon(20% 63%,20% 41%, 80% 41%, 80% 63%)" : "polygon(80% 41%, 80% 63%, 20% 63%, 20% 41%)",
          height: "100%",
          zIndex: 2,
          duration: 1,
        }, "0").set(".current", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          x: 0,
          zIndex: 1
        }, ">");

        // **Movimiento de la siguiente o anterior caja**
        if (direction === Direction.UP) {
          console.log("next");
          tl.to(".next", {
            clipPath: "polygon(0% 100%,0% 0%, 100% 0%, 100% 100%)",
            x: "-140.7%",
            duration: 1,
            zIndex: 3,
            onComplete: () => {
              gsap.set(".next", { x: 0, clipPath: "polygon(20% 41%, 80% 41%, 80% 63%, 20% 63%)", zIndex: 5 });
            }
          }, "0");
        } else {
          tl.to(".prev", {
            clipPath: "polygon(100% 0%, 100% 100%, 0% 100%,0% 0%)",
            x: "140.7%",
            duration: 1,
            zIndex: 3,
            onComplete: () => {
              gsap.set(".prev", { x: 0, clipPath: "polygon(20% 41%, 80% 41%, 80% 63%, 20% 63%)", zIndex: 5 });
            }
          }, "0");
        }
      }
    }, 0.2);
  };

  return { updateSlide };
}