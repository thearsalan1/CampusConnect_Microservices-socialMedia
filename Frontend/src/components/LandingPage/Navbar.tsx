import { motion } from "motion/react";

const Navbar = () => {
  return (
    <motion.div
      className="w-[70%] h-fit px-4 py-4 my-5 rounded-2xl border border-border  bg-accent hover:bg-accent-hover hover:border-border-hover mx-auto text-background font-semibold text-lg text-logo "
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full flex items-center justify-evenly text-sm underline">
        <span className="hover:text-text-on-primary cursor-pointer">Home</span>
        <span className="hover:text-text-on-primary cursor-pointer">Details</span>
        <span className="hover:text-text-on-primary cursor-pointer">Guide</span>
        <span className="hover:text-text-on-primary cursor-pointer">About us</span>
        <span className="hover:text-text-on-primary cursor-pointer">FAQs</span>
      </div>
    </motion.div>
  );
};

export default Navbar;
