import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { howItWorks } from "../../data/HowItWorks";

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${howItWorks.length * 200}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center mx-auto">
        {/* Heading */}
        <motion.h1
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
          className="
    absolute top-5 left-0 w-full
    z-50
    text-center text-7xl 
    font-semibold text-primary
  "
        >
          How It Works
        </motion.h1>

        {/* Cards */}
        <div className="relative w-full h-[400px] px-6 ">
          {howItWorks.map((item, index) => (
            <Card
              key={item.title}
              item={item}
              index={index}
              total={howItWorks.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  item: (typeof howItWorks)[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function Card({ item, index, total, scrollYProgress }: CardProps) {
  const segment = 1 / total;

  const start = index * segment;

  // Card enters from slightly below
  const y = useTransform(
    scrollYProgress,
    [start, start + segment * 0.5],
    [400, 0],
  );

  // Starts slightly smaller and becomes normal size
  const scale = useTransform(
    scrollYProgress,
    [start, start + segment * 0.5],
    [0.92, 1],
  );

  const Icon = item.icon;
  return (
    <motion.div
      style={{
        y,
        scale,
        zIndex: index + 1,
      }}
      transition={{
        ease: "easeOut",
        duration: 0.5,
      }}
      className="
       absolute inset-0
      mx-auto
      flex flex-col 
      items-center 
      text-center
      h-[400px]
      w-[900px]
      rounded-2xl
      bg-card
      p-8
      border border-border
      shadow-lg
    "
    >
      <div className="flex w-full">
        <div
          className="
          flex items-center justify-center
          w-26 h-26
          rounded-2xl
          bg-accent
          text-primary
          mb-6
          relative
          top-0 left-0
          
        "
        >
          <Icon className="w-7 h-7" />
        </div>

        <div className="w-full">
          <h3 className="text-5xl font-semibold text-text-primary mt-3 mb-4 text-center text-heading">
            {item.title}
          </h3>
        </div>
      </div>
      <div className="w-full h-1 rounded-2xl bg-background"></div>

      <p className="text-2xl text-text-secondary leading-relaxed max-w-full mt-10 text-body">
        {item.description}
      </p>
    </motion.div>
  );
}

export default HowItWorks;
