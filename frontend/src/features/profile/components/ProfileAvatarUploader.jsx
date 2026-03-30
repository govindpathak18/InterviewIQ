import { Camera, LoaderCircle } from "lucide-react";

export default function ProfileAvatarUploader({
  imageUrl,
  initials = "U",
  isUploading = false,
  onFileChange,
}) {
  return (
    <div className="relative">
      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Profile"
            className="h-28 w-28 rounded-[2rem] border border-white/10 object-cover shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/10" />
        </div>
      ) : (
        <div className="grid h-28 w-28 place-items-center rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-300/25 via-white/10 to-lime-300/20 text-3xl font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          {initials}
        </div>
      )}

      <label className="absolute -bottom-2 -right-2 grid h-11 w-11 cursor-pointer place-items-center rounded-2xl border border-white/10 bg-black/60 text-white/85 shadow-xl backdrop-blur-xl transition hover:scale-[1.03] hover:bg-black/80">
        {isUploading ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <Camera size={18} />
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
    </div>
  );
}
