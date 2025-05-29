import { useEffect, useRef, useState } from "react";
import { CountUp } from "countup.js";

const StatsSection = () => {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          const numbers = sectionRef.current.querySelectorAll("[data-count-to]");

          numbers.forEach((number) => {
            const ID = number.getAttribute("id");
            const value = parseFloat(number.getAttribute("data-count-to"));
            const decimal = number.hasAttribute("data-decimal");

            const options = decimal ? { decimalPlaces: 1 } : {};
            const countUp = new CountUp(ID, value, options);

            if (!countUp.error) {
              countUp.start();
            } else {
              console.error(countUp.error);
              number.innerHTML = value;
            }
          });

          setHasAnimated(true); // Prevent it from triggering again
          observer.disconnect(); // Optional: stop observing after trigger
        }
      },
      {
        threshold: 0.3, // trigger when 30% of section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="bg-black" ref={sectionRef}>
      <div className="container flex flex-col mx-auto">
        <div className="w-full draggable">
          <div className="container flex flex-col items-center gap-16 mx-auto my-32">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8">
              <div className="flex flex-col items-center">
                <h3 className="text-5xl font-extrabold leading-tight text-center text-blue-100">
                  <span id="countto1" data-count-to="390"></span>+
                </h3>
                <p className="text-base font-medium leading-7 text-center text-blue-100">
                  Teams
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-5xl font-extrabold leading-tight text-center text-blue-100">
                  <span id="countto2" data-count-to="4000"></span>
                </h3>
                <p className="text-base font-medium leading-7 text-center text-blue-100">
                  Total Employees
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-5xl font-extrabold leading-tight text-center text-blue-100">
                  <span id="countto3" data-count-to="100"></span>+
                </h3>
                <p className="text-base font-medium leading-7 text-center text-blue-100">
                  Global Partners
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-5xl font-extrabold leading-tight text-center text-blue-100">
                  <span id="countto4" data-count-to="18000"></span>+
                </h3>
                <p className="text-base font-medium leading-7 text-center text-blue-100">
                  Daily Website Visitors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
