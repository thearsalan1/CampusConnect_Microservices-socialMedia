import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { features } from "../../data/features";

const Features = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0px", "-1000px"]);

  // Heading
  const headingY = useTransform(scrollYProgress, [0, 0.15], [30, 0]);

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] mx-10">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Heading */}
        <motion.h1
          style={{
            y: headingY,
            opacity: headingOpacity,
          }}
          className="absolute top-5 left-0 w-full text-center text-7xl font-semibold text-primary"
        >
          Features
        </motion.h1>

        {/* Cards */}
        <motion.div style={{ x }} className="flex gap-8 pt-40">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
              }}
              className="group relative h-105 w-96 shrink-0 rounded-3xl border border-border 
                bg-card p-8 transition-all duration-300 
                hover:bg-card-hover hover:shadow-xl 
                hover:border-border-hover"
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center w-14 h-14 
                  rounded-2xl bg-accent text-primary mb-6 
                  group-hover:bg-accent-hover 
                  transition-colors duration-300"
              >
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h1 className="mb-4 text-2xl font-semibold text-heading text-text-primary">
                {feature.title}
              </h1>

              {/* Description */}
              <p className="text-body text-lg text-text-secondary leading-relaxed">
                {feature.description}
              </p>

              {/* Subtle glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 
                  group-hover:opacity-10 
                  bg-gradient-to-r from-primary to-accent 
                  transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
