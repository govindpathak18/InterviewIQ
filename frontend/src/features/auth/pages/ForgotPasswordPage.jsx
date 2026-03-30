import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { authApi } from "../api/auth.api";

const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await authApi.forgotPassword(values);
      toast.success("If the account exists, a reset link has been sent");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to process your request";
      toast.error(message);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(61,217,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,122,89,0.12),transparent_28%)]" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
          Password Recovery
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Reset your password
        </h1>

        <p className="mt-3 text-sm leading-7 text-white/60">
          Enter your email address and we&apos;ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Email address
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
              <Mail size={18} className="text-white/40" />
              <input
                type="email"
                placeholder="govind@example.com"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                {...register("email")}
              />
            </div>

            {errors.email ? (
              <p className="mt-2 text-sm text-red-300">{errors.email.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
            <ArrowRight size={16} className="text-black" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/55">
          Remembered your password?{" "}
          <Link to="/login" className="text-cyan-200 hover:text-cyan-100">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
