'use client'

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useGuest} from "@/hooks/useRouteProtection";

export default function Register() {
    useGuest()

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async event => {
        event.preventDefault()

        setErrors([])

        try {
            const response = await fetch('http://demo.test/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
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
            setPasswordConfirmation('')
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <h1 className="">Register</h1>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="border"
                        onChange={event => setName(event.target.value)}
                    />
                    {errors.name &&
                        <div style={{color: "orangered"}}>{errors.name[0]}</div>
                    }
                </div>

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

                <div>
                    <label htmlFor="password_confirmation">Confirm password</label>
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="border"
                        value={passwordConfirmation}
                        onChange={event => setPasswordConfirmation(event.target.value)}
                    />
                </div>

                <button className="border bg-gray-200" type="submit">
                    Register
                </button>
            </div>
        </form>
    );
}