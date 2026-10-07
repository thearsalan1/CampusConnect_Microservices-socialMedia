import { Heart, Plus, User } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-6 py-1">
      {/* Left side: search + logo + badge */}
      <div className="flex items-center justify-between gap-6 w-full">
        <input
          type="text"
          className="bg-background w-72 px-4 py-2 rounded-xl border border-accent outline-none focus:border-primary focus:ring-2 focus:ring-primary placeholder:text-text-muted text-text-muted text-body transition"
          placeholder="Search friend"
        />

        <h1 className="text-logo text-4xl text-primary uppercase tracking-tight">
          Campus Connect
        </h1>

        {/* Badge with blinking dot using Motion */}
        <div className="flex items-center gap-2 text-xs text-primary bg-background px-3 py-1 rounded-2xl border border-accent">
          <motion.span
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-text-muted">B Tech</span>
        </div>
      </div>

      {/* Right side: icons */}
      <div className="flex gap-5 items-center justify-evenly w-60 ml-6">
        <Plus className="text-text-muted hover:cursor-pointer hover:text-primary" />
        <Heart className="text-text-muted hover:cursor-pointer hover:text-primary" />
        <div className="bg-background rounded-full h-12 w-12 flex items-center justify-center cursor-pointer border border-accent hover:border-primary hover:scale-105 transition">
          <User className="text-accent" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
