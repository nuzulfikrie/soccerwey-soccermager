'use client'

import { useSession } from "next-auth/react"

export interface User {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

export function useCurrentUser() {
  const { data: session, status } = useSession()

  return {
    user: session?.user as User | null,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated"
  }
}

// Optional: Create a hook that requires authentication
export function useRequireAuth() {
  const { user, isLoading, isAuthenticated } = useCurrentUser()

  // You can add router push to login here if needed
  // const router = useRouter()
  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push('/login')
  //   }
  // }, [isLoading, isAuthenticated, router])

  return {
    user,
    isLoading,
    isAuthenticated
  }
}