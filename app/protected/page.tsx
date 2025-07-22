'use client'

import {useEffect, useState} from 'react';
import {useAuth} from "@/hooks/useRouteProtection";

export default function Protected(){
    useAuth()

    const [user, setUser] = useState({})

    async function getUser() {
        fetch('http://demo.test/api/user', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
        })
            .then(response => response.json())
            .then(data => {
                setUser(data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getUser()
    }, []);

    return (
        <div>
            <div>This page is protected by auth.</div>

            <div>Current user is: <strong>{user.name}</strong></div>
        </div>
    );
}
