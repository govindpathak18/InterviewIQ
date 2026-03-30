import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { authApi } from "../api/auth.api";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    if (!token) {
      toast.error("Reset token is missing");
      return;
    }

    try {
      await authApi.resetPassword({
        token,
        password: values.password,
      });

      toast.success("Password reset successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to reset password";
      toast.error(message);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,255,96,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(61,217,255,0.12),transparent_28%)]" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.3em] text-lime-200/80">
          Set New Password
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Create a new password
        </h1>

        <p className="mt-3 text-sm leading-7 text-white/60">
          Choose a strong password to secure your InterviewIQ account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              New password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
              <LockKeyhole size={18} className="text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="text-white/45 transition hover:text-white/80"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password ? (
              <p className="mt-2 text-sm text-red-300">{errors.password.message}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Confirm password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
              <LockKeyhole size={18} className="text-white/40" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="text-white/45 transition hover:text-white/80"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.confirmPassword ? (
              <p className="mt-2 text-sm text-red-300">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Updating..." : "Reset Password"}
            <ArrowRight size={16} className="text-black" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/55">
          Back to{" "}
          <Link to="/login" className="text-cyan-200 hover:text-cyan-100">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
