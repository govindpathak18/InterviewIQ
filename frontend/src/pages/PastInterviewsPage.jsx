import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { mockInterviews } from '../services/mockData';
import { formatDate } from '../utils/format';

export const PastInterviewsPage = () => (
  <Card>
    <h1 className="text-xl font-bold">Past Interviews</h1>
    <div className="mt-4 space-y-3">
      {mockInterviews.map((interview) => (
        <Link key={interview.id} to={`/interview/${interview.id}`} className="block rounded-xl border border-white/10 p-3 hover:bg-white/5">
          <p className="font-medium">{interview.role}</p>
          <p className="text-sm text-slate-400">{formatDate(interview.createdAt)} · Score {interview.score}%</p>
        </Link>
      ))}
    </div>
  </Card>
);
