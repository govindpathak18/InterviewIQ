import { Card } from '../ui/Card';
import { formatDate } from '../../utils/format';

export const ActivityList = ({ items }) => (
  <Card>
    <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
    {items.length === 0 ? (
      <p className="text-sm text-slate-400">No activity yet. Start your first interview to see analytics.</p>
    ) : (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 p-3">
            <p className="font-medium text-white">{item.role}</p>
            <p className="text-sm text-slate-400">Score: {item.score}% · {formatDate(item.createdAt)}</p>
          </div>
        ))}
      </div>
    )}
  </Card>
);
