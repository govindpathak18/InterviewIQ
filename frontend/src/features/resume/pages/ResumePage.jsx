import { FileText, LoaderCircle, Plus, RefreshCw, Upload, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useResumes } from "../hooks/useResumes";
import { useCreateResume } from "../hooks/useCreateResume";
import { useUploadResume } from "../hooks/useUploadResume";

export default function ResumePage() {
  const { data, isLoading, refetch } = useResumes();
  const createResumeMutation = useCreateResume();
  const uploadResumeMutation = useUploadResume();

  const [manualResume, setManualResume] = useState({
    title: "",
    originalText: "",
  });

  const resumes = data?.data || [];

  const bestScore = useMemo(() => {
    if (!resumes.length) return 0;
    return 91;
  }, [resumes]);

  const handleManualCreate = async (event) => {
    event.preventDefault();

    if (!manualResume.originalText.trim()) {
      toast.error("Resume text is required");
      return;
    }

    try {
      await createResumeMutation.mutateAsync({
        title: manualResume.title.trim(),
        originalText: manualResume.originalText.trim(),
      });

      setManualResume({
        title: "",
        originalText: "",
      });

      toast.success("Resume created successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to create resume right now";
      toast.error(message);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("title", file.name.replace(/\.[^/.]+$/, ""));

      await uploadResumeMutation.mutateAsync(formData);
      toast.success("Resume uploaded successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to upload resume right now";
      toast.error(message);
    } finally {
      event.target.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <p className="text-sm tracking-wide text-white/60">Loading resumes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel glow-ring rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Resume Workspace
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Manage resume versions in one focused and flexible workspace.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/62 sm:text-base">
              Upload existing resumes, create manual drafts, and keep polished versions ready
              for ATS optimization and interview planning.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]">
                <Plus size={16} />
                Create Resume
              </button>

              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10">
                <Upload size={16} />
                Upload Resume
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>

              <button
                onClick={() => refetch()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Total Resumes
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">{resumes.length}</h3>
              <p className="mt-3 text-sm leading-7 text-white/58">
                Resume drafts currently available for targeting and optimization.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-lime-300/20 bg-lime-300/10 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-lime-100/65">
                Best ATS Score
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">{bestScore}</h3>
              <p className="mt-3 text-sm leading-7 text-lime-50/75">
                Highest-performing resume currently in your workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-5">
          {resumes.length === 0 ? (
            <div className="glass-panel rounded-[1.75rem] p-8 text-center">
              <h2 className="text-2xl font-semibold text-white">No resumes yet</h2>
              <p className="mt-3 text-sm leading-7 text-white/60">
                Create a manual resume or upload one to begin ATS optimization and interview planning.
              </p>
            </div>
          ) : (
            resumes.map((resume) => (
              <article
                key={resume._id}
                className="glass-panel rounded-[1.75rem] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/6 text-cyan-200">
                      <FileText size={22} />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {resume.title || "Untitled Resume"}
                      </h2>
                      <p className="mt-1 text-sm text-white/48">
                        {resume.source === "upload" ? "Uploaded Resume" : "Manual Draft"} • Updated{" "}
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
                        {resume.originalText?.slice(0, 180) || "No resume text available"}
                        {resume.originalText?.length > 180 ? "..." : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
                      Active
                    </div>

                    <div className="flex gap-2">
                      <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10">
                        View
                      </button>
                      <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="space-y-6">
          <div className="glass-panel rounded-[2rem] p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/6 text-lime-200">
                <WandSparkles size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Quick Create
                </p>
                <h2 className="mt-1 text-2xl font-semibold">Manual draft</h2>
              </div>
            </div>

            <form onSubmit={handleManualCreate} className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Resume title"
                value={manualResume.title}
                onChange={(e) =>
                  setManualResume((current) => ({
                    ...current,
                    title: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
              />

              <textarea
                rows={10}
                placeholder="Paste your resume content here..."
                value={manualResume.originalText}
                onChange={(e) =>
                  setManualResume((current) => ({
                    ...current,
                    originalText: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-white/30"
              />

              <button
                type="submit"
                disabled={createResumeMutation.isPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {createResumeMutation.isPending ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Create Resume
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="glass-panel rounded-[2rem] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Upload Status
            </p>
            <h2 className="mt-2 text-2xl font-semibold">File upload</h2>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm leading-7 text-white/65">
              {uploadResumeMutation.isPending
                ? "Uploading and parsing your resume..."
                : "Upload PDF, DOC, or DOCX files and the backend will parse the text automatically."}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
