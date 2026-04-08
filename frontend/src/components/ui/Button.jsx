import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Button = ({ children, className, loading, variant = 'primary', ...props }) => {
  const variants = {
    primary:
      'bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-white shadow-glow hover:brightness-110',
    secondary: 'glass text-slate-100 hover:bg-white/10',
    ghost: 'text-slate-300 hover:bg-white/10',
    danger: 'bg-rose-500/90 text-white hover:bg-rose-500',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {children}
    </motion.button>
  );
};
