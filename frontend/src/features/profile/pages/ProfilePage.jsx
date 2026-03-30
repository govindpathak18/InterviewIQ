import { Globe, LockKeyhole, MapPin, PencilLine } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import ProfileAvatarUploader from "../components/ProfileAvatarUploader";
import { uploadImageToCloudinary } from "../../../lib/utils/cloudinary";
import { useProfile } from "../hooks/useProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { profileApi } from "../api/profile.api";

export default function ProfilePage() {
  const { data, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const [isUploading, setIsUploading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    headline: "",
    bio: "",
    location: "",
    websiteUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    profilePhoto: "",
    skills: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const profile = data?.data;

  useEffect(() => {
    if (!profile) return;

    setFormData({
      fullName: profile.fullName || "",
      headline: profile.headline || "",
      bio: profile.bio || "",
      location: profile.location || "",
      websiteUrl: profile.websiteUrl || "",
      linkedinUrl: profile.linkedinUrl || "",
      githubUrl: profile.githubUrl || "",
      profilePhoto: profile.profilePhoto || "",
      skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : "",
    });
  }, [profile]);

  const initials = useMemo(() => {
    const fullName = formData.fullName || profile?.fullName || "";

    return (
      fullName
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"
    );
  }, [formData.fullName, profile?.fullName]);

  const handleFieldChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handlePasswordFieldChange = (field) => (event) => {
    setPasswordForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadImageToCloudinary(file);

      setFormData((current) => ({
        ...current,
        profilePhoto: imageUrl,
      }));

      toast.success("Profile photo uploaded");
    } catch (error) {
      toast.error(error.message || "Unable to upload image");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        headline: formData.headline.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        websiteUrl: formData.websiteUrl.trim(),
        linkedinUrl: formData.linkedinUrl.trim(),
        githubUrl: formData.githubUrl.trim(),
        profilePhoto: formData.profilePhoto.trim(),
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      await updateProfileMutation.mutateAsync(payload);
      toast.success("Profile updated successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to update profile right now";
      toast.error(message);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password must match");
      return;
    }

    try {
      setIsChangingPassword(true);

      await profileApi.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("Password updated successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to change password right now";
      toast.error(message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const skillCount = formData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean).length;

  if (isLoading) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <p className="text-sm tracking-wide text-white/60">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel glow-ring rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6">
            <div className="flex flex-col items-center text-center">
              <ProfileAvatarUploader
                imageUrl={formData.profilePhoto}
                initials={initials}
                isUploading={isUploading}
                onFileChange={handleAvatarChange}
              />

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white">
                {formData.fullName || "User"}
              </h1>

              <p className="mt-2 text-sm text-cyan-200/85">
                {formData.headline || "Add a professional headline"}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  {profile?.role || "user"}
                </span>

                {profile?.isEmailVerified ? (
                  <span className="rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-xs font-medium text-lime-100">
                    Email Verified
                  </span>
                ) : (
                  <span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1 text-xs font-medium text-orange-100">
                    Email Not Verified
                  </span>
                )}
              </div>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                {formData.bio || "Add a short professional bio to personalize your workspace."}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Profile Settings
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
              Manage your public identity and workspace details.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/62 sm:text-base">
              Update your professional summary, skills, links, and profile image so the
              rest of the platform reflects who you are and what you want to build.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Skills
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white">{skillCount}</h3>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Profile State
                </p>
                <h3 className="mt-2 text-3xl font-semibold text-white">
                  {profile?.isActive ? "Active" : "Inactive"}
                </h3>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Last Login
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {profile?.lastLoginAt
                    ? new Date(profile.lastLoginAt).toLocaleDateString()
                    : "No record"}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/6 text-cyan-200">
              <PencilLine size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Edit Profile
              </p>
              <h2 className="mt-1 text-2xl font-semibold">Personal information</h2>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="mt-6 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Full name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={handleFieldChange("fullName")}
                  className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Headline
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={handleFieldChange("headline")}
                  className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Bio
              </label>
              <textarea
                rows={5}
                value={formData.bio}
                onChange={handleFieldChange("bio")}
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Location
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                  <MapPin size={18} className="text-white/40" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={handleFieldChange("location")}
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Website
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
                  <Globe size={18} className="text-white/40" />
                  <input
                    type="text"
                    value={formData.websiteUrl}
                    onChange={handleFieldChange("websiteUrl")}
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={formData.linkedinUrl}
                  onChange={handleFieldChange("linkedinUrl")}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/80">
                  GitHub
                </label>
                <input
                  type="text"
                  value={formData.githubUrl}
                  onChange={handleFieldChange("githubUrl")}
                  placeholder="https://github.com/your-profile"
                  className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Profile image URL
              </label>
              <input
                type="text"
                value={formData.profilePhoto}
                onChange={handleFieldChange("profilePhoto")}
                placeholder="Cloudinary image URL"
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Skills
              </label>
              <textarea
                rows={3}
                value={formData.skills}
                onChange={handleFieldChange("skills")}
                placeholder="React, TypeScript, Tailwind, Node.js"
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
              />
            </div>

            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-zinc-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {updateProfileMutation.isPending ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </article>

        <div className="space-y-6">
          <article className="glass-panel rounded-[2rem] p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/6 text-lime-200">
                <LockKeyhole size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Security
                </p>
                <h2 className="mt-1 text-2xl font-semibold">Change password</h2>
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
              <input
                type="password"
                placeholder="Current password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordFieldChange("currentPassword")}
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
              />
              <input
                type="password"
                placeholder="New password"
                value={passwordForm.newPassword}
                onChange={handlePasswordFieldChange("newPassword")}
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordFieldChange("confirmPassword")}
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
              />

              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isChangingPassword ? "Updating..." : "Update Password"}
              </button>
            </form>
          </article>

          <article className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Connected Links
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Professional profiles</h2>

            <div className="mt-6 space-y-3">
              {[
                formData.linkedinUrl || "LinkedIn not added",
                formData.githubUrl || "GitHub not added",
                formData.websiteUrl || "Portfolio website not added",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/72"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
