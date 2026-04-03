import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getResumeById, updateResume } from "../api/resume.api";

export default function ResumeDetailsPage() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);
  const [title, setTitle] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getResumeById(id);
        setResume(data);
        setTitle(data?.title || "");
        setOriginalText(data?.originalText || "");
      } catch (error) {
        setStatus({ type: "error", message: error.message || "Failed to load resume" });
      }
    };

    load();
  }, [id]);

  const onSave = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const updated = await updateResume(id, {
        title: title.trim(),
        originalText: originalText.trim(),
      });
      setResume(updated);
      setStatus({ type: "success", message: "Resume updated successfully" });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Failed to update resume" });
    } finally {
      setSaving(false);
    }
  };

  if (!resume && !status.message) {
    return (
      <section className="page-wrap">
        <div className="panel">
          <p className="muted">Loading resume details...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-wrap">
      <div className="panel">
        <h1>Edit resume</h1>
        <p className="muted">Resume ID: {id}</p>

        <form className="auth-form" onSubmit={onSave}>
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} required />
          </label>

          <label>
            Resume text
            <textarea
              value={originalText}
              onChange={(event) => setOriginalText(event.target.value)}
              rows={9}
              minLength={50}
              required
            />
          </label>

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>

        {status.message && <p className={status.type === "error" ? "error-text" : "success-text"}>{status.message}</p>}

        <p className="mt-16">
          <Link to="/resumes">← Back to resumes</Link>
        </p>
      </div>
    </section>
  );
}
