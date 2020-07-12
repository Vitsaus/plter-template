import React, { useLayoutEffect } from 'react';
import {me, TMeResponse} from '@vitsaus/api-client';
import { useRecoilState } from 'recoil';
import {tokenState, userState} from '../../states/user';
import { useState } from 'react';
import { Page } from '../../components/Page/Page';

export function DashboardPage() {
    
    const [token] = useRecoilState(tokenState);
    const [user, setUser] = useRecoilState(userState);
    const [loading, setLoading] = useState(true);
    const [ok, setOk] = useState(false);

    useLayoutEffect(() => {

        async function fetchUser() {

            console.log('got token for page', token);
            
            const result: TMeResponse = await me({
                token: token as string
            });

            if (result.type === 'error') {
                console.log('user load failed?');
                setLoading(false);
                setOk(false);
            } else {
                setUser(result.user);
                setLoading(false);
                setOk(true);
            }

        }

        fetchUser();

    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!loading && !ok || !user) {
        return (
            <div>
                Load failed
            </div>
        )
    }

    return (
        <Page title={"Dashboard"}>
            Hello {user.username}!
        </Page>
    );

}