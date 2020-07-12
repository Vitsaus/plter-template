import React, { useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../states/user';
import { Redirect } from 'react-router-dom';
import { ReactNode } from 'react';

export type TRequireAuthenticationProps = {
    children: ReactNode;
}

export function RequireAuthentication(props: TRequireAuthenticationProps) {
    
    const [token, setToken] = useRecoilState(tokenState);
    const [initialized, setInitialized] = useState(false);
    const [ok, setOk] = useState(false);

    useLayoutEffect(() => {

        if (!token) {

            const tokenFromLocalStorage = localStorage.getItem('token');

            if (tokenFromLocalStorage) {

                setToken(tokenFromLocalStorage);
                setInitialized(true);
                setOk(true);

            } else {

                setInitialized(true);
                setOk(false);

            }

        } else {

            setInitialized(true);
            setOk(false);

            console.log('no token found');

        }

    }, []);

    if (!initialized) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!ok) {
        console.log('initialization failed');
        return (
            <Redirect to="/" />
        )
    }

    console.log('got token', token);

    return (
        <>
            {props.children}
        </>
    )
}