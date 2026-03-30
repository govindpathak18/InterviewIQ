import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useLogin } from "../hooks/useLogin";

const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const onSubmit = async (values) => {
    try {
      await loginMutation.mutateAsync(values);
      toast.success("Signed in successfully");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to sign in right now";
      toast.error(message);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(61,217,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,122,89,0.12),transparent_28%)]" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
          Welcome Back
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Sign in to your workspace
        </h1>

        <p className="mt-3 text-sm leading-7 text-white/60">
          Access your resumes, ATS-ready drafts, and interview planning dashboard.
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

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
              <LockKeyhole size={18} className="text-white/40" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/60">
              <input type="checkbox" className="rounded border-white/20 bg-transparent" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-cyan-200 transition hover:text-cyan-100"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loginMutation.isPending ? "Signing In..." : "Sign In"}
            <ArrowRight size={16} className="text-black" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/55">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-cyan-200 hover:text-cyan-100">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
