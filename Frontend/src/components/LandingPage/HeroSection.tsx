import { motion } from "motion/react";
import { MoveDown, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen pt-24 flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div
        className="
          absolute
          top-[15%]
          left-[10%]
          w-40 h-40
          rounded-full
          bg-primary/25
          blur-3xl
        "
      />

      <div
        className="
          absolute
          top-[25%]
          right-[10%]
          w-52 h-52
          rounded-full
          bg-accent/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-[5%]
          left-1/2
          -translate-x-1/2
          w-60 h-32
          rounded-full
          bg-primary/20
          blur-3xl
        "
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            text-body
            text-accent-hover
            text-sm
            tracking-[0.3em]
            uppercase
            mb-6
          "
        >
          Your campus. Your community.
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="text-9xl text-heading text-primary uppercase"
        >
          Campus Connect
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.35,
            ease: "easeOut",
          }}
          className="
            text-3xl
            text-body
            text-accent-hover
            text-center
            mt-10
          "
        >
          Built for students, powered by campus life.
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.65,
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            text-body
            mt-10
            px-7 py-3
            rounded-full
            bg-primary
            hover:bg-primary-hover
            text-text-on-primary
            flex items-center gap-2
            transition-colors
          "
        >
          Join your campus
          <ArrowRight size={18} />
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [1, 0.4, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-20 text-accent"
        >
          <MoveDown size={45} />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;