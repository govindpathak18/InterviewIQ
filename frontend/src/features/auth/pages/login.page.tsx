import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../app/providers/auth.provider'
import { authSchema } from '../schemas/auth.schema'

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const { register, handleSubmit, formState } = useForm<LoginForm>({
    resolver: zodResolver(authSchema.login),
    mode: 'onBlur',
  })

  const onSubmit = async (values: LoginForm) => {
    setError('')
    try {
      await login(values)
      navigate('/dashboard')
    } catch (err) {
      setError((err as any)?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <section className="page-wrap">
      <div className="panel mx-auto max-w-md">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Email</label>
            <input type="email" {...register('email')} className="input-field" />
            {formState.errors.email && <p className="text-red-500">{formState.errors.email.message}</p>}
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...register('password')} className="input-field" />
            {formState.errors.password && <p className="text-red-500">{formState.errors.password.message}</p>}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="classic-btn" disabled={formState.isSubmitting}>
            {formState.isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="mt-4">Forgot password? <Link to="/forgot-password" className="text-indigo-300">Reset</Link></p>
        <p className="mt-2">No account? <Link to="/register" className="text-indigo-300">Create one</Link></p>
      </div>
    </section>
  )
}
