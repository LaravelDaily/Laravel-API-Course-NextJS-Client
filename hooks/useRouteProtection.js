'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if (!token) {
            router.push('/login')
        }
    }, [router])
}

export function useGuest() {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if (token) {
            router.push('/protected')
        }
    }, [router])
}
