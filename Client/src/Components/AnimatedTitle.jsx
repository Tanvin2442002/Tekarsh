import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);
  const wordRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "0 bottom",
          end: "100 bottom",
          toggleActions: "play none none reverse",
          markers: false,
          scrub: 1,
        },
      });

      titleAnimation.to(
        wordRefs.current,
        {
          duration: 1,
          // delay: 0.2,
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  wordRefs.current = [];

  return (
    <div
      ref={containerRef}
      className={clsx(
        "flex flex-col gap-1 text-7xl uppercase leading-[.8] text-white sm:px-32 md:text-[6rem]",
        containerClass
      )}
    >
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex justify-center items-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              ref={(el) => (wordRefs.current.push(el))}
              className="font-black opacity-0"
              style={{
                transform:
                  "translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)",
                transformOrigin: "50% 50% -150px",
                willChange: "opacity, transform",
              }}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
