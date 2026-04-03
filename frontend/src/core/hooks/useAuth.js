import { useAuth as useAuthContext } from '../../app/providers/auth.provider'

export default function useAuth() {
  return useAuthContext()
}
