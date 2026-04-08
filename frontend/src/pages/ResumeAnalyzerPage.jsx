import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { analyzeResume } from '../services/resumeService';

export const ResumeAnalyzerPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const response = await analyzeResume();
    setAnalysis(response.data);
    setLoading(false);
  };

  return (
    <div className="space-y-5">
      <Card>
        <h1 className="text-xl font-bold">Resume Analyzer</h1>
        <p className="mt-2 text-sm text-slate-300">Upload your resume and get ATS score + keyword suggestions.</p>
        <div className="mt-4 rounded-xl border border-dashed border-white/20 p-8 text-center text-slate-400">Drag & drop resume file here</div>
        <Button className="mt-4" onClick={handleAnalyze}>Analyze Resume</Button>
        {loading ? <div className="mt-3"><Loader label="Analyzing resume with AI..." /></div> : null}
      </Card>

      {analysis ? (
        <Card>
          <h2 className="font-semibold">ATS Score: {analysis.atsScore}%</h2>
          <div className="mt-4 space-y-3">
            {analysis.keywordCoverage.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm"><span>{item.label}</span><span>{item.value}%</span></div>
                <div className="h-2 rounded-full bg-slate-800"><div className="h-2 rounded-full bg-cyan-400" style={{ width: `${item.value}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
};
