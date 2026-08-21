import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../data/FAQ";

const FAQ = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const controls = useAnimation();

  const duplicatedFaqs = [...faqs, ...faqs];

  const handleCardEnter = (index: number) => {
    setHoveredIndex(index);
    controls.stop();
  };

  const handleContainerLeave = () => {
    setHoveredIndex(null);

    controls.start({
      x: "-50%",
      transition: {
        duration: 45,
        repeat: Infinity,
        ease: "linear",
      },
    });
  };

  return (
    <section className="py-20 overflow-hidden min-h-[600px] mt-10">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          text-heading
          text-primary
          text-7xl
          font-semibold
          text-center
          mb-12
        "
      >
        Frequently Asked Questions
      </motion.h2>

      {/* Marquee */}
      <div
        className="overflow-visible py-10"
        onMouseLeave={handleContainerLeave}
      >
        <motion.div
          className="flex gap-5 w-max"
          animate={controls}
          initial={{ x: "0%" }}
          transition={{
            x: {
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedFaqs.map((faq, index) => {
            const isHovered = hoveredIndex === index;
            const isOtherCard =
              hoveredIndex !== null && !isHovered;

            return (
              <motion.div
                key={`${faq.question}-${index}`}
                onMouseEnter={() => handleCardEnter(index)}
                animate={{
                  scale: isHovered ? 1.08 : 1,
                  filter: isOtherCard
                    ? "blur(5px)"
                    : "blur(0px)",
                  opacity: isOtherCard ? 0.4 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                style={{
                  zIndex: isHovered ? 50 : 1,
                }}
                className="
                  relative
                  w-[350px]
                  md:w-[450px]
                  shrink-0
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  overflow-hidden
                  cursor-pointer
                "
              >
                {/* Question */}
                <div className="flex items-center justify-between px-6 py-5">
                  <span className="text-text-primary font-medium text-lg pr-4">
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{
                      rotate: isHovered ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className="text-accent"
                      size={20}
                    />
                  </motion.div>
                </div>

                {/* Answer */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;