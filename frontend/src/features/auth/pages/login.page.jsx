import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../core/hooks/useAuth";
import { loginUser } from "../api/auth.api";
import AuthHeroImage from "../components/auth-hero-image";
import ThemeToggle from "../../../shared/components/ui/theme-toggle";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", rememberMe: true });
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await loginUser({ email: form.email, password: form.password });
      const response = await loginUser(form);
      setUser(response?.data?.user || response?.user || { email: form.email, role: "user" });
      navigate("/dashboard", { replace: true });
    } catch (submitError) {
      setError(submitError.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-layout auth-layout-modern">
      <AuthHeroImage />

      <div className="auth-form-panel panel glass-panel">
        <div className="auth-panel-top">
          <div>
            <p className="eyebrow">InterviewIQ</p>
            <h1>Welcome back</h1>
          </div>
          <ThemeToggle />
        </div>

        <p className="muted">Sign in to continue with your interview preparation workspace.</p>
    <section className="auth-layout">
      <AuthHeroImage />

      <div className="auth-form-panel panel">
        <h1>Welcome back</h1>
        <p className="muted">Sign in to continue your InterviewIQ journey.</p>

        <form onSubmit={onSubmit} className="auth-form">
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              required
            />
          </label>

          <div className="row-between">
            <label className="checkbox-inline">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={onChange}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="link-subtle">
              Forgot password?
            </Link>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="muted center-text mt-16">
        <p className="muted">
          New here? <Link to="/register">Create account</Link>
        </p>
      </div>
    </section>
  );
}
