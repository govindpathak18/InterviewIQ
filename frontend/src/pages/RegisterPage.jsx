import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useFakeLoading } from '../hooks/useFakeLoading';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { loading, withLoading } = useFakeLoading();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.fullName || !form.email || !form.password) return toast.error('Please fill all fields.');

    await withLoading(async () => {
      await register(form);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    });
  };

  return (
    <div className="mx-auto mt-20 max-w-md px-4">
      <Card>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <Input icon={User} placeholder="Full name" value={form.fullName} onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))} />
          <Input icon={Mail} placeholder="Email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
          <Input icon={Lock} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))} />
          <Button className="w-full" loading={loading} type="submit">Create Account</Button>
        </form>
        <p className="mt-4 text-sm text-slate-400">Already have an account? <Link to="/login" className="text-cyan-300">Login</Link></p>
      </Card>
    </div>
  );
};
