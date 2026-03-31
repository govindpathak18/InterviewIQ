import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRegister } from "../hooks/useRegister";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
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
      await registerMutation.mutateAsync(values);
      toast.success("Account created successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to create account right now";
      toast.error(message);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,255,96,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(61,217,255,0.12),transparent_28%)]" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.3em] text-lime-200/80">
          Join InterviewIQ
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Create your account
        </h1>

        <p className="mt-3 text-sm leading-7 text-white/60">
          Start building resumes, planning interviews, and improving job-fit with AI.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Full name
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
              <User2 size={18} className="text-white/40" />
              <input
                type="text"
                placeholder="Govind Pathak"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/30"
                {...register("fullName")}
              />
            </div>

            {errors.fullName ? (
              <p className="mt-2 text-sm text-red-300">{errors.fullName.message}</p>
            ) : null}
          </div>

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
                placeholder="Create a strong password"
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

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="btn-3d btn-3d-light inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {registerMutation.isPending ? "Creating..." : "Create Account"}
            <ArrowRight size={16} className="text-black" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/55">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-200 hover:text-cyan-100">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
