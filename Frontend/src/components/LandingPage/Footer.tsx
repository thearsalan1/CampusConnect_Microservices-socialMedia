import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { footer } from "../../data/footer";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full px-10 py-12 bg-card border border-border"
    >
      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="flex gap-12">

          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-1/3"
          >
            <motion.h1
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-primary text-heading text-2xl font-semibold cursor-default"
            >
              {footer.brand.name}
            </motion.h1>

            <p className="mt-2 max-w-xs text-text-secondary text-body text-xs leading-relaxed">
              {footer.brand.tagline}
            </p>
          </motion.div>

          {/* DIVIDER */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="w-[1px] bg-border rounded-full origin-top"
          />

          {/* LINKS */}
          <div className="flex-1 grid grid-cols-3 gap-10">
            {footer.columns.map((column, columnIndex) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + columnIndex * 0.12,
                }}
                className="flex flex-col gap-3"
              >
                <h2 className="text-heading text-text-primary font-medium text-sm">
                  {column.title}
                </h2>

                <div className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className="group w-fit text-text-secondary text-xs flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      {link.label}

                      <ArrowUpRight
                        size={12}
                        className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SOCIAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 pt-6 border-t border-border flex items-center justify-between"
        >
          <div className="flex gap-5">
            {footer.social.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{
                  y: -3,
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                className="text-text-muted hover:text-primary text-xs transition-colors"
              >
                {social.label}
              </motion.a>
            ))}
          </div>

          <p className="text-text-muted text-xs">
            {footer.bottomNote}
          </p>
        </motion.div>

        {/* COPYRIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-5 text-center"
        >
          <p className="text-text-muted text-[11px]">
            {footer.copyright}
          </p>
        </motion.div>

      </div>
    </motion.footer>
  );
};

export default Footer;