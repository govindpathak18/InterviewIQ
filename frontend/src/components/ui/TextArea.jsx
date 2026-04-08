import { cn } from '../../utils/cn';

export const TextArea = ({ className, ...props }) => (
  <textarea
    className={cn(
      'w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/80',
      className,
    )}
    {...props}
  />
);
