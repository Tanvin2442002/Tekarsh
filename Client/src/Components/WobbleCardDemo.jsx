import { WobbleCard } from "./WobbleCard";

function WobbleCardDemo() {
  return (
    <div className="bg-black py-5">
      <div className="flex justify-end max-w-7xl mx-auto px-4 mb-6">
        <div className="text-right">
          <h1 className="text-3xl font-bold text-white">
            Passion, Precision, Performance.
          </h1>
          <p className="mt-2 text-neutral-300 max-w-xl text-sm">
           At our core, we are strategists, makers, and visionaries united by a mission to craft digital experiences that move people and businesses forward. We challenge the ordinary, champion creativity, and thrive at the intersection of innovation and impact. Whether it’s a bold new idea or a complex business challenge, we show up with heart, hustle, and the expertise to make things happen.
          </p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
        {/* Culture Card */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              We’re Built Different
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200">
              Our team blends passion and precision to craft digital solutions that don't just work—they wow. We're agile, accountable, and obsessed with results.
            </p>
          </div>
          {/* <img
            src="/team-culture.webp"
            width={500}
            height={500}
            alt="team culture"
            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
          /> */}
        </WobbleCard>

        {/* Innovation Card */}
        <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gray-900">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Innovation at the Core
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            We embrace change, test boundaries, and explore the edge of what's possible. Innovation drives everything we do—from ideas to execution.
          </p>
        </WobbleCard>

        {/* Impact Card */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Impact Beyond Code
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Whether it’s empowering startups or supporting enterprises, we focus on delivering measurable outcomes and long-term value—not just deliverables.
            </p>
          </div>
          {/* <img
            src="/impact.webp"
            width={500}
            height={500}
            alt="impact illustration"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
          /> */}
        </WobbleCard>
      </div>
    </div>
  );
}

export default WobbleCardDemo;
