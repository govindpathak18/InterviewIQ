import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Card = ({ className, children }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={cn('glass rounded-2xl p-5 shadow-2xl shadow-slate-900/30', className)}
  >
    {children}
  </motion.div>
);
