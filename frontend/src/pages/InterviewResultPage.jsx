import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { getInterviewById } from '../services/interviewService';

export const InterviewResultPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(0);

  useEffect(() => {
    getInterviewById(id).then((response) => setData(response.data));
  }, [id]);

  if (!data) {
    return <div className="space-y-4"><Skeleton className="h-40" /><Skeleton /><Skeleton /></div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold">Match Score</h2>
        <div className="mt-4 flex h-36 w-36 items-center justify-center rounded-full border-8 border-cyan-400/60 text-3xl font-bold text-cyan-300">{data.matchScore}%</div>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Questions</h2>
        <div className="space-y-2">
          {data.questions.map((question, index) => (
            <div key={question.question} className="overflow-hidden rounded-xl border border-white/10">
              <button onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)} className="flex w-full items-center justify-between p-3 text-left">
                <span>{question.question}</span>
                <ChevronDown className={`h-4 w-4 transition ${openQuestion === index ? 'rotate-180' : ''}`} />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openQuestion === index ? 'auto' : 0, opacity: openQuestion === index ? 1 : 0 }}
                className="px-3"
              >
                <p className="pb-3 text-sm text-slate-400">Type: {question.type} · Difficulty: {question.difficulty}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="font-semibold text-rose-300">Skill Gap Analysis</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {data.skillGap.weakAreas.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>
        <Card>
          <h3 className="font-semibold text-cyan-300">Roadmap</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {data.preparationPlan.map((step) => <li key={step.day}><span className="font-semibold">Day {step.day}:</span> {step.focus}</li>)}
          </ul>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button>Generate ATS Resume</Button>
        <Button variant="secondary">Start Mock Interview</Button>
      </div>
    </div>
  );
};
