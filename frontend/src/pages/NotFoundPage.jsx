import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => (
  <div className="mx-auto mt-20 max-w-lg text-center">
    <h1 className="text-5xl font-bold">404</h1>
    <p className="mt-3 text-slate-400">Page not found.</p>
    <Link to="/" className="mt-5 inline-block"><Button>Back Home</Button></Link>
  </div>
);
