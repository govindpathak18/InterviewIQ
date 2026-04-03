import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../../../app/providers/auth.provider'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const { verifyEmail } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState('pending')
  const [error, setError] = useState('')

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token) {
        setError('Verification token missing')
        setStatus('failed')
        return
      }

      try {
        await verifyEmail({ token })
        setStatus('success')
        setTimeout(() => navigate('/login'), 3000)
      } catch (err) {
        setStatus('failed')
        setError((err as any)?.response?.data?.message || 'Verification failed')
      }
    }
    confirmEmail()
  }, [token, verifyEmail, navigate])

  return (
    <section className="page-wrap">
      <div className="panel mx-auto max-w-md text-center">
        {status === 'pending' && <p>Verifying your email...</p>}
        {status === 'success' && <p className="text-green-500">Email verified! Redirecting to login...</p>}
        {status === 'failed' && <p className="text-red-500">{error}</p>}
        <p className="mt-4"><Link to="/login" className="text-indigo-300">Back to Login</Link></p>
      </div>
    </section>
  )
}
