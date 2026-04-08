import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useFakeLoading } from '../hooks/useFakeLoading';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loading, withLoading } = useFakeLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) return toast.error('Please fill all fields.');

    await withLoading(async () => {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    });
  };

  return (
    <div className="mx-auto mt-20 max-w-md px-4">
      <Card>
        <h1 className="text-2xl font-bold">Login to InterviewIQ</h1>
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <Input icon={Mail} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button className="w-full" loading={loading} type="submit">Sign In</Button>
        </form>
        <p className="mt-4 text-sm text-slate-400">No account? <Link to="/register" className="text-cyan-300">Register</Link></p>
      </Card>
    </div>
  );
};
