import { cn } from '../../utils/cn';

export const Input = ({ icon: Icon, className, ...props }) => (
  <label className="relative block">
    {Icon ? <Icon className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" /> : null}
    <input
      className={cn(
        'w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/80',
        Icon && 'pl-10',
        className,
      )}
      {...props}
    />
  </label>
);
