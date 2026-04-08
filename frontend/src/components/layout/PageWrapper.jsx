import { motion } from 'framer-motion';

export const PageWrapper = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.35 }}
    className="mx-auto w-full max-w-7xl flex-1 px-4 py-8"
  >
    {children}
  </motion.main>
);
