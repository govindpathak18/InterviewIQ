export const Loader = ({ label = 'Thinking...' }) => (
  <div className="flex items-center gap-2 text-sm text-cyan-300">
    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:120ms]" />
    <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:240ms]" />
    <span>{label}</span>
  </div>
);
