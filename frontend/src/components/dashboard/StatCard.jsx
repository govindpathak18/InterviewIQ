import { Card } from '../ui/Card';

export const StatCard = ({ title, value, subtitle }) => (
  <Card>
    <p className="text-xs uppercase tracking-wider text-slate-400">{title}</p>
    <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
    <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
  </Card>
);
