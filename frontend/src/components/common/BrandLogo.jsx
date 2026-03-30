// src/components/common/BrandLogo.jsx
export default function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-sm font-black text-white shadow-[0_0_30px_rgba(61,217,255,0.2)]">
        IQ
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-300/80">
          Career Intelligence
        </p>
        <h1 className="text-lg font-semibold tracking-tight text-white">
          InterviewIQ
        </h1>
      </div>
    </div>
  );
}
