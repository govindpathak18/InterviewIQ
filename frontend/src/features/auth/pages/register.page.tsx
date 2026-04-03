import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../app/providers/auth.provider'
import { authSchema } from '../schemas/auth.schema'

type RegisterForm = {
  name: string
  email: string
  password: string
}

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const { register, handleSubmit, formState } = useForm<RegisterForm>({
    resolver: zodResolver(authSchema.register),
    mode: 'onBlur',
  })

  const onSubmit = async (values: RegisterForm) => {
    setError('')
    try {
      await registerUser(values)
      navigate('/dashboard')
    } catch (err) {
      setError((err as any)?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <section className="page-wrap">
      <div className="panel mx-auto max-w-md">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Name</label>
            <input {...register('name')} className="input-field" />
            {formState.errors.name && <p className="text-red-500">{formState.errors.name.message}</p>}
          </div>
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
            {formState.isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4">Already have an account? <Link to="/login" className="text-indigo-300">Sign in</Link></p>
      </div>
    </section>
  )
}
