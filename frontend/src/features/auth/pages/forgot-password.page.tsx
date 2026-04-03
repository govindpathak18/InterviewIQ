import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../app/providers/auth.provider'
import { authSchema } from '../schemas/auth.schema'

type ForgotPasswordForm = {
    email: string
}

export default function ForgotPasswordPage() {
    const { forgotPassword } = useAuth()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const { register, handleSubmit, formState } = useForm<ForgotPasswordForm>({
        resolver: zodResolver(authSchema.forgotPassword),
        mode: 'onBlur',
    })

    const onSubmit = async (values: ForgotPasswordForm) => {
        setError('')
        setMessage('')
        try {
            await forgotPassword(values)
            setMessage('Password reset email has been sent. Please check your inbox.')
        } catch (err) {
            setError((err as any)?.response?.data?.message || 'Unable to send reset link')
        }
    }

    return (
        <section className="page-wrap">
            <div className="panel mx-auto max-w-md">
                <h1>Forgot Password</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label>Email</label>
                        <input type="email" {...register('email')} className="input-field" />
                        {formState.errors.email && <p className="text-red-500">{formState.errors.email.message}</p>}
                    </div>
                    {message && <p className="text-green-500">{message}</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="classic-btn" disabled={formState.isSubmitting}>
                        {formState.isSubmitting ? 'Sending...' : 'Send reset link'}
                    </button>
                </form>
                <p className="mt-4"><Link to="/login" className="text-indigo-300">Back to login</Link></p>
            </div>
        </section>
    )
}
