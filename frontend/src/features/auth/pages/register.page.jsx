import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../core/hooks/useAuth";
import { registerUser } from "../api/auth.api";
import AuthHeroImage from "../components/auth-hero-image";
import ThemeToggle from "../../../shared/components/ui/theme-toggle";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await registerUser(form);
      setUser(response?.data || response?.user || { email: form.email, fullName: form.fullName, role: "user" });
      navigate("/dashboard", { replace: true });
    } catch (submitError) {
      setError(submitError.message || "Registration failed");
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
            <h1>Create account</h1>
          </div>
          <ThemeToggle />
        </div>

    <section className="auth-layout">
      <AuthHeroImage />

      <div className="auth-form-panel panel">
        <h1>Create account</h1>
        <p className="muted">Start building your AI-powered interview preparation plan.</p>

        <form onSubmit={onSubmit} className="auth-form">
          <label>
            Full name
            <input
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={onChange}
              placeholder="John Doe"
              required
            />
          </label>

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
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="muted center-text mt-16">
        <p className="muted">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
