import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  createManualResume,
  deleteResume,
  getMyResumes,
} from "../api/resume.api";

const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80";

export default function ResumesPage() {
  const [loaded, setLoaded] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [title, setTitle] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const hasEnoughText = useMemo(() => originalText.trim().length >= 50, [originalText]);

  const loadResumes = async () => {
    setLoading(true);
    try {
      const items = await getMyResumes();
      setResumes(items);
      setStatus({ type: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to load resumes" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const onCreate = async (event) => {
    event.preventDefault();

    if (!hasEnoughText) {
      setStatus({ type: "error", message: "Resume text must be at least 50 characters" });
      return;
    }

    setSaving(true);
    try {
      const created = await createManualResume({
        title: title.trim() || "My Resume",
        originalText: originalText.trim(),
      });

      setResumes((prev) => [created, ...prev]);
      setTitle("");
      setOriginalText("");
      setStatus({ type: "success", message: "Resume created successfully" });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to create resume" });
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to delete resume" });
    }
  };

  return (
    <section className="page-wrap">
      <div className="feature-hero panel">
        <img
          src={HERO_IMAGE_URL}
          alt="Resume editing workspace"
          className={`feature-hero-image ${loaded ? "is-loaded" : ""}`}
          onLoad={() => setLoaded(true)}
        />
        <div className="feature-hero-overlay" />
        <div className="feature-hero-copy">
          <h1>Resumes</h1>
          <p>Create and manage resumes for AI interview and ATS generation.</p>
        </div>
      </div>

      <div className="panel mt-16">
        <h2>Create manual resume</h2>
        <form className="auth-form" onSubmit={onCreate}>
          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Frontend Developer Resume"
            />
          </label>

          <label>
            Resume text
            <textarea
              value={originalText}
              onChange={(event) => setOriginalText(event.target.value)}
              placeholder="Paste resume content (minimum 50 chars)"
              rows={7}
            />
          </label>

          <button type="submit" disabled={saving || !hasEnoughText}>
            {saving ? "Saving..." : "Create Resume"}
          </button>
        </form>

        {status.message && <p className={status.type === "error" ? "error-text" : "success-text"}>{status.message}</p>}
      </div>

      <div className="panel mt-16">
        <h2>My resumes</h2>
        {loading ? (
          <p className="muted">Loading resumes...</p>
        ) : resumes.length === 0 ? (
          <p className="muted">No resumes yet. Create your first one above.</p>
        ) : (
          <div className="resume-grid">
            {resumes.map((resume) => (
              <article className="resume-card" key={resume._id}>
                <h3>{resume.title || "Untitled Resume"}</h3>
                <p className="muted clamp-3">{resume.originalText}</p>

                <div className="resume-card-actions">
                  <Link to={`/resumes/${resume._id}`}>Open</Link>
                  <button type="button" className="ghost-btn" onClick={() => onDelete(resume._id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
