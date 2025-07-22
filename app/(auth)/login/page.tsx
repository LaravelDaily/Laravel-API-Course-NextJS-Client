'use client'

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {useGuest} from "@/hooks/useRouteProtection";

export default function Login() {
    useGuest()

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async event => {
        event.preventDefault()

        setErrors([])

        try {
            const response = await fetch('http://demo.test/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('access_token', data.token);
                router.push('/protected')
            } else {
                setErrors(data.errors)
            }
        } catch (error) {
            console.log('Network error: ' + error)
        } finally {
            setPassword('')
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <h1 className="">Login</h1>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="border"
                        onChange={event => setEmail(event.target.value)}
                    />
                    {errors.email &&
                        <div style={{color: "orangered"}}>{errors.email[0]}</div>
                    }
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="border"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    {errors.password &&
                        <div style={{color: "orangered"}}>{errors.password[0]}</div>
                    }
                </div>

                <button className="border bg-gray-200" type="submit">
                    Login
                </button>
            </div>
        </form>
    );
}