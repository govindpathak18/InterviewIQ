import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  FileText,
  LoaderCircle,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useResumes } from "../../resume/hooks/useResumes";
import { useGenerateInterviewPack } from "../../ai/hooks/useGenerateInterviewPack";
import { useGenerateAts } from "../../ai/hooks/useGenerateAts";

export default function InterviewPlanPage() {
  const { data: resumesResponse, isLoading: isLoadingResumes } = useResumes();
  const generateInterviewPackMutation = useGenerateInterviewPack();
  const generateAtsMutation = useGenerateAts();

  const resumes = resumesResponse?.data || [];

  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [interviewPack, setInterviewPack] = useState(null);
  const [atsResumeHtml, setAtsResumeHtml] = useState("");

  useEffect(() => {
    if (!selectedResumeId && resumes.length > 0) {
      setSelectedResumeId(resumes[0]._id);
    }
  }, [resumes, selectedResumeId]);

  const selectedResume = useMemo(
    () => resumes.find((resume) => resume._id === selectedResumeId) || null,
    [resumes, selectedResumeId]
  );

  const matchScore = interviewPack?.matchScore ?? 0;
  const questions = interviewPack?.questions || [];
  const skillGap = interviewPack?.skillGap || {
    missingSkills: [],
    weakAreas: [],
    strengths: [],
  };
  const preparationPlan = interviewPack?.preparationPlan || [];

  const handleGenerateInterviewPlan = async () => {
    if (!selectedResumeId) {
      toast.error("Please select a resume first");
      return;
    }

    if (!jobDescription.trim() || jobDescription.trim().length < 50) {
      toast.error("Job description must be at least 50 characters");
      return;
    }

    try {
      const response = await generateInterviewPackMutation.mutateAsync({
        resumeId: selectedResumeId,
        jdText: jobDescription.trim(),
        selfDescription: selfDescription.trim(),
      });

      setInterviewPack(response?.data || response);
      toast.success("Interview plan generated successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to generate interview plan";
      toast.error(message);
    }
  };

  const handleGenerateAtsResume = async () => {
    if (!selectedResumeId) {
      toast.error("Please select a resume first");
      return;
    }

    if (!jobDescription.trim() || jobDescription.trim().length < 50) {
      toast.error("Job description must be at least 50 characters");
      return;
    }

    try {
      const response = await generateAtsMutation.mutateAsync({
        resumeId: selectedResumeId,
        jdText: jobDescription.trim(),
      });

      setAtsResumeHtml(response?.data?.html || response?.html || "");
      toast.success("ATS-friendly resume generated");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to generate ATS resume";
      toast.error(message);
    }
  };

  if (isLoadingResumes) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <p className="text-sm tracking-wide text-white/60">Loading interview workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel glow-ring rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Interview Plan Workspace
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Turn a resume and job description into a focused interview strategy.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/62 sm:text-base">
              This workspace combines your selected resume, target role context, ATS
              optimization, and interview preparation into one connected flow.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">
                Match Score
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">
                {matchScore || "--"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-cyan-50/75">
                Overall alignment between your selected resume and target role.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-lime-300/20 bg-lime-300/10 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-lime-100/70">
                ATS Resume
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">
                {atsResumeHtml ? "Ready" : "--"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-lime-50/75">
                Generate an ATS-friendly version once your JD is ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr_0.85fr]">
        <div className="space-y-6">
          <article className="glass-panel rounded-[2rem] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/6 text-cyan-200">
                <FileText size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Resume
                </p>
                <h2 className="mt-1 text-xl font-semibold">Select source resume</h2>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {resumes.length === 0 ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm text-white/60">
                  No resumes found. Create or upload one first.
                </div>
              ) : (
                resumes.map((resume) => {
                  const isActive = selectedResumeId === resume._id;

                  return (
                    <button
                      key={resume._id}
                      type="button"
                      onClick={() => setSelectedResumeId(resume._id)}
                      className={[
                        "w-full rounded-[1.5rem] border p-4 text-left transition",
                        isActive
                          ? "border-cyan-300/30 bg-cyan-300/10"
                          : "border-white/10 bg-white/6 hover:bg-white/8",
                      ].join(" ")}
                    >
                      <h3 className="text-base font-medium text-white">
                        {resume.title || "Untitled Resume"}
                      </h3>
                      <p className="mt-1 text-sm text-white/50">
                        {resume.source === "upload" ? "Uploaded Resume" : "Manual Draft"}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/62">
                        {resume.originalText?.slice(0, 100) || "No resume preview available"}
                        {resume.originalText?.length > 100 ? "..." : ""}
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </article>

          <article className="glass-panel rounded-[2rem] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/6 text-orange-200">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Job Description
                </p>
                <h2 className="mt-1 text-xl font-semibold">Paste target role context</h2>
              </div>
            </div>

            <textarea
              rows={11}
              placeholder="Paste the target job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="mt-5 w-full rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-white/30"
            />

            <textarea
              rows={5}
              placeholder="Optional: add a short self description or target context for more personalized guidance."
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              className="mt-4 w-full rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-white/30"
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleGenerateInterviewPlan}
                disabled={generateInterviewPackMutation.isPending}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {generateInterviewPackMutation.isPending ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Plan
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleGenerateAtsResume}
                disabled={generateAtsMutation.isPending}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {generateAtsMutation.isPending ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Building ATS...
                  </>
                ) : (
                  <>
                    <WandSparkles size={16} />
                    Generate ATS Resume
                  </>
                )}
              </button>
            </div>
          </article>
        </div>

        <div className="space-y-6">
          <article className="glass-panel rounded-[2rem] p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/6 text-lime-200">
                <BrainCircuit size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  AI Summary
                </p>
                <h2 className="mt-1 text-2xl font-semibold">Interview readiness overview</h2>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-cyan-300/15 bg-cyan-300/10 p-5">
              <p className="text-sm leading-8 text-cyan-50/85">
                {interviewPack?.summary ||
                  "Generate an interview plan to see a personalized summary, role match quality, and prep direction."}
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Strengths
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {skillGap.strengths.length ? (
                    skillGap.strengths.map((item) => <li key={item}>{item}</li>)
                  ) : (
                    <li>No strengths generated yet</li>
                  )}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Weak Areas
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {skillGap.weakAreas.length ? (
                    skillGap.weakAreas.map((item) => <li key={item}>{item}</li>)
                  ) : (
                    <li>No weak areas generated yet</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Missing Skills
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skillGap.missingSkills.length ? (
                  skillGap.missingSkills.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1.5 text-sm text-orange-100"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-white/60">No missing skills generated yet</span>
                )}
              </div>
            </div>
          </article>

          <article className="glass-panel rounded-[2rem] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Interview Questions
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Generated prompts</h2>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/6 px-3 py-1.5 text-sm text-white/70">
                {questions.length} questions
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {questions.length ? (
                questions.map((question, index) => (
                  <div
                    key={`${question.question}-${index}`}
                    className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                      {question.type || "Question"} • {question.difficulty || "medium"}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/72">
                      {question.question}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4 text-sm text-white/60">
                  Generate an interview plan to see questions here.
                </div>
              )}
            </div>
          </article>
        </div>

        <div className="space-y-6">
          <article className="glass-panel rounded-[2rem] p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/6 text-cyan-200">
                <WandSparkles size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  ATS Resume
                </p>
                <h2 className="mt-1 text-xl font-semibold">AI output panel</h2>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
              {atsResumeHtml ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-lime-300/20 bg-lime-300/10 px-3 py-2 text-sm text-lime-100">
                    ATS resume generated successfully
                  </div>

                  <div className="max-h-[22rem] overflow-auto rounded-2xl border border-white/10 bg-white/6 p-4 text-sm leading-7 text-white/70">
                    <pre className="whitespace-pre-wrap break-words font-sans">
                      {atsResumeHtml.slice(0, 1800)}
                      {atsResumeHtml.length > 1800 ? "..." : ""}
                    </pre>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-7 text-white/60">
                  Generate an ATS-friendly resume to preview the raw HTML output here.
                </p>
              )}
            </div>
          </article>

          <article className="glass-panel rounded-[2rem] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Preparation Timeline
            </p>
            <h2 className="mt-2 text-xl font-semibold">Day-wise plan</h2>

            <div className="mt-5 space-y-4">
              {preparationPlan.length ? (
                preparationPlan.map((item, index) => (
                  <div
                    key={`${item.day}-${index}`}
                    className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">
                      Day {item.day}
                    </p>
                    <h3 className="mt-2 text-base font-medium text-white">
                      {item.focus}
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-white/65">
                      {(item.tasks || []).map((task) => (
                        <li key={task}>{task}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm text-white/60">
                  Generate an interview plan to see a preparation timeline.
                </div>
              )}
            </div>
          </article>

          <article className="glass-panel rounded-[2rem] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Current Selection
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              {selectedResume?.title || "No resume selected"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              {selectedResume?.originalText?.slice(0, 160) ||
                "Select a resume to use it as the source document for interview planning."}
              {selectedResume?.originalText?.length > 160 ? "..." : ""}
            </p>

            <button
              type="button"
              onClick={handleGenerateInterviewPlan}
              disabled={generateInterviewPackMutation.isPending}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {generateInterviewPackMutation.isPending ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Run Full Analysis
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}
