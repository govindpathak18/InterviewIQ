import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../app/providers/auth.provider'
import { authSchema } from '../schemas/auth.schema'

type ResetPasswordForm = {
  newPassword: string
}

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const { resetPassword } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const { register, handleSubmit, formState } = useForm<ResetPasswordForm>({
    resolver: zodResolver(authSchema.resetPassword),
    mode: 'onBlur',
  })

  const onSubmit = async (values: ResetPasswordForm) => {
    setError('')
    try {
      await resetPassword({ token, newPassword: values.newPassword })
      navigate('/login')
    } catch (err) {
      setError((err as any)?.response?.data?.message || 'Reset failed')
    }
  }

  return (
    <section className="page-wrap">
      <div className="panel mx-auto max-w-md">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>New Password</label>
            <input type="password" {...register('newPassword')} className="input-field" />
            {formState.errors.newPassword && <p className="text-red-500">{formState.errors.newPassword.message}</p>}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="classic-btn" disabled={formState.isSubmitting || !token}>
            {formState.isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        <p className="mt-4">Have a token? Update URL ?token=<em>your-token</em></p>
        <p className="mt-2"><Link to="/login" className="text-indigo-300">Back to login</Link></p>
      </div>
    </section>
  )
}
