import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { TextArea } from '../components/ui/TextArea';
import { Loader } from '../components/ui/Loader';
import { generateInterviewPlan } from '../services/interviewService';
import { useFakeLoading } from '../hooks/useFakeLoading';

export const CreateInterviewPage = () => {
  const navigate = useNavigate();
  const { loading, withLoading } = useFakeLoading();
  const [form, setForm] = useState({ selfDescription: '', jobDescription: '', role: 'Frontend Engineer', difficulty: 'Medium' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await withLoading(async () => {
      const response = await generateInterviewPlan(form);
      toast.success('Interview plan generated!');
      navigate(`/interview/${response.data.id}`);
    });
  };

  return (
    <Card>
      <h1 className="text-2xl font-bold">Create Interview</h1>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <TextArea rows={4} placeholder="Describe yourself, your experience, and goals..." value={form.selfDescription} onChange={(e) => setForm((s) => ({ ...s, selfDescription: e.target.value }))} />
        <div className="rounded-xl border border-dashed border-white/20 bg-slate-900/40 p-6 text-center text-sm text-slate-300">Drag & drop resume here, or click to upload</div>
        <TextArea rows={4} placeholder="Paste job description..." value={form.jobDescription} onChange={(e) => setForm((s) => ({ ...s, jobDescription: e.target.value }))} />
        <div className="grid gap-3 md:grid-cols-2">
          <select className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3" value={form.role} onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}>
            <option>Frontend Engineer</option><option>Backend Engineer</option><option>Full Stack Engineer</option>
          </select>
          <select className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3" value={form.difficulty} onChange={(e) => setForm((s) => ({ ...s, difficulty: e.target.value }))}>
            <option>Easy</option><option>Medium</option><option>Hard</option>
          </select>
        </div>
        {loading ? <Loader label="AI is crafting your interview roadmap..." /> : null}
        <Button type="submit" loading={loading}>Generate Interview Plan</Button>
      </form>
    </Card>
  );
};
