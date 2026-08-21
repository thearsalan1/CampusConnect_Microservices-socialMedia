import { AnimatePresence, motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import { mission, story } from "../../data/AboutUs";

const About = () => {
  const [selected, setSelected] = useState("Mission");
  const tabs = ["Mission", "Solution"];

  return (
    <div className="w-full flex gap-5 mb-10">
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="min-w-1/2 bg-card p-10 rounded-r-2xl relative h-[80vh] border-border border-2 flex items-center justify-center gap-5 overflow-hidden"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.2, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-20 left-0 text-background text-9xl font-bold text-logo tracking-tighter"
        >
          CAMPUS
        </motion.span>

        <motion.span
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 0.2, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
          className="absolute bottom-20 right-0 text-background text-9xl font-bold text-logo tracking-tighter"
        >
          CONNECT
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-heading text-primary font-semibold text-7xl relative z-10"
        >
          About Us{" "}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative z-10"
        >
          <MoveRight size={45} className="text-accent" />
        </motion.div>
      </motion.div>

      {/* Right panel */}
      <div className="w-1/2 p-10 flex flex-col">
        {/* Tab buttons */}
        <div className="mx-auto bg-card p-1 rounded-full border-border">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setSelected(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-5 py-2 text-primary font-semibold text-lg mr-3 rounded-full"
            >
              <span className="relative z-10">{tab}</span>
              {selected === tab && (
                <motion.div
                  layoutId="about-us"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-0 bg-accent rounded-full z-0"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Content — crossfade + slide on tab switch */}
        <AnimatePresence mode="wait">
          {selected === "Mission" ? (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 className="text-text-on-primary text-center text-4xl font-semibold mt-10 text-heading mb-20">
                {mission.heading}
              </h1>
              <p className="text-text-muted text-xl text-body w-full text-center mx-auto">
                {mission.description}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 className="text-text-on-primary text-center text-4xl font-semibold mt-10 text-heading mb-20">
                {story.heading}
              </h1>
              <div className="space-y-6">
                {story.paragraphs.map((para, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.12 }}
                    className="text-text-muted  text-xl text-body w-full text-center mx-auto"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default About;
