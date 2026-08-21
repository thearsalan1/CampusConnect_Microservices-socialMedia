import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const navItems = ["Home", "Details", "Guide", "About us", "FAQs"];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (current > previous && current > 100) {
      // Scrolling down
      setHidden(true);
    } else {
      // Scrolling up
      setHidden(false);
    }
  });

  return (
    <motion.nav
      animate={{
        y: hidden ? "-150%" : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        fixed
        top-0
        left-1/2
        -translate-x-1/2
        z-50
        w-[70%]
        h-fit
        px-4 py-4
        mt-5
        rounded-2xl
        border border-border
        bg-card
        hover:bg-card-hover
        hover:border-border-hover
        text-text-secondary
        font-semibold
        text-lg
        text-logo
        transition-colors
      "
    >
      <div className="w-full flex items-center justify-evenly text-sm">
        {navItems.map((item, index) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.1,
            }}
            whileHover={{
              y: -2,
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              relative
              cursor-pointer
              hover:text-text-on-primary
              transition-colors
              py-1
            "
          >
            {item}

            <motion.span
              className="
                absolute
                left-0
                -bottom-1
                h-[2px]
                w-full
                bg-text-on-primary
                origin-left
              "
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
            />
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
