import React from 'react';
import {Redirect} from 'react-router-dom';
import { useState } from 'react';
import {login, TApiLoginResponse} from '@vitsaus/api-client';
import {useHistory} from 'react-router-dom';

export function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    if (localStorage.getItem('token')) {
        return (
            <Redirect to={"/dashboard"} />
        )
    }

    return (
        <div>
            <form>
                <div>
                    <div>
                        Username
                    </div>
                    <div>
                        <input type="text" autoComplete="username" value={username} onChange={(e) => {
                            setUsername(e.target.value);
                        }} />
                    </div>
                </div>
                <div>
                    <div>
                        Password
                    </div>
                    <div>
                        <input type="password" autoComplete="current-password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </div>
                </div>
                <div>
                    <input type="submit" value="login" onClick={async (e) => {

                        e.preventDefault();

                        const result: TApiLoginResponse = await login({
                            username,
                            password,
                        });

                        console.log('got result', result);

                        if (result.type === 'error') {
                            console.log('got error!');
                        } else {
                            console.log(result.user.username);
                            localStorage.setItem('token', result.token);
                            history.push('/dashboard');
                        }
                        
                    }} />
                </div>
            </form>
        </div>
    )
}