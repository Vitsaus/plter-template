import React from 'react';
import {Redirect} from 'react-router-dom';
import { useState } from 'react';
import {register, TApiRegisterResponse} from '@vitsaus/api-client';
import {useHistory} from 'react-router-dom';
import { Page } from '../../components/Page/Page';

export function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    if (localStorage.getItem('token')) {
        return (
            <Redirect to={"/dashboard"} />
        )
    }

    return (
        <Page title={"Register"}>
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
                    <input type="submit" value="register" onClick={async (e) => {

                        e.preventDefault();

                        const result: TApiRegisterResponse = await register({
                            username,
                            password,
                        });

                        if (result.type === 'error') {
                            console.log('error happened!');
                        } else {
                            localStorage.setItem('token', result.token);
                            history.push('/dashboard');
                        }
                        
                    }} />
                </div>
            </form>
        </Page>
    )
}