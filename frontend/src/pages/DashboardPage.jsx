import { Link } from 'react-router-dom';
import { PlayCircle, UploadCloud } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/dashboard/StatCard';
import { ActivityList } from '../components/dashboard/ActivityList';
import { mockInterviews } from '../services/mockData';

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Welcome back, {user?.fullName?.split(' ')[0]} 👋</h1>
        <p className="mt-2 text-slate-300">Let's continue your interview preparation journey.</p>
        <div className="mt-4 flex gap-3">
          <Link to="/interview"><Button><PlayCircle className="h-4 w-4" /> Start Interview</Button></Link>
          <Link to="/resume-analyzer"><Button variant="secondary"><UploadCloud className="h-4 w-4" /> Upload Resume</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Interviews Taken" value="24" subtitle="+4 from last week" />
        <StatCard title="Avg Score" value="82%" subtitle="Strong consistency" />
        <StatCard title="Resume Score" value="74%" subtitle="Needs keyword optimization" />
      </div>

      <ActivityList items={mockInterviews} />
    </div>
  );
};
