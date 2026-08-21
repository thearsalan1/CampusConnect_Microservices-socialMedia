import { ArrowRight, Cable } from "lucide-react";
import { getStarted } from "../../data/GetStarted";
import { motion } from "framer-motion";

const GetStarted = () => {
  return (
    <section className="w-full flex items-center justify-center h-[60vh] mb-10">
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-[70%] h-[400px] p-5 bg-card rounded-2xl border border-border flex overflow-hidden"
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-1/2 h-full flex items-center"
        >
          {/* Cable Animation */}
          <motion.div
            animate={{
              rotate: [0, 3, -3, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute"
          >
            <Cable className="opacity-10" size={380} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-heading text-primary font-semibold text-7xl absolute top-35 left-5"
          >
            Get Started
          </motion.h1>
        </motion.div>

        {/* DIVIDER */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="h-full w-[1px] bg-accent rounded-full origin-top"
        />

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-1/2 h-full flex flex-col items-center justify-evenly p-3"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-2xl font-semibold text-heading text-text-primary"
          >
            {getStarted.heading}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-center text-text-secondary"
          >
            {getStarted.subheading}
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex gap-2 w-full justify-center items-center"
          >
            {/* PRIMARY */}
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
              className="
                text-body
                px-5 py-3
                rounded-full
                bg-primary
                hover:bg-primary-hover
                text-text-on-primary
                flex items-center gap-1
                transition-colors
                text-sm
              "
            >
              {getStarted.primaryCta}

              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>

            {/* SECONDARY */}
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
              className="
                text-body
                px-5 py-3
                rounded-full
                bg-accent
                hover:bg-accent-hover
                text-text-on-primary
                flex items-center gap-1
                transition-colors
                text-sm
              "
            >
              {getStarted.secondaryCta}

              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>
          </motion.div>

          {/* NOTE */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xs font-body text-text-muted"
          >
            {getStarted.note}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GetStarted;
