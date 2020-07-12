import {IErrorResponse, ILoginResponse, IShowUserResponse} from '@vitsaus/common';

const apiUrl = 'http://localhost:3030'

type TApiLoginRequest = {
    username: string;
    password: string;
}

export async function login(data: TApiLoginRequest): Promise<ILoginResponse | IErrorResponse> {

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

type TMeRequest = {
    token: string;
}

export async function me(data: TMeRequest): Promise<IShowUserResponse | IErrorResponse> {

    const result = await fetch(`${apiUrl}/api-users/me`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'authorization': data.token
        }
    });

    return await result.json();

}