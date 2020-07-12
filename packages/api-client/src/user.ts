import {apiUrl} from './config';
import {IErrorResponse, ILoginResponse, IShowUserResponse} from '@vitsaus/common';

export type TApiLoginRequest = {
    username: string;
    password: string;
}

export type TApiLoginResponse = ILoginResponse | IErrorResponse;

export async function login(data: TApiLoginRequest): Promise<TApiLoginResponse> {

    const result = await fetch(`${apiUrl}/api-users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password,
        }),
    });

    return await result.json();

}

export type TMeRequest = {
    token: string;
}

export type TMeResponse = IShowUserResponse | IErrorResponse;

export async function me(data: TMeRequest): Promise<TMeResponse> {

    const result = await fetch(`${apiUrl}/api-users/me`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': data.token
        }
    });

    return await result.json();

}