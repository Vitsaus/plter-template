import { IUser, ITokenData } from '@vitsaus/common';
import {Request} from 'express';

export type TShowUserRequest = Request<{
    username: string;
}>;

export type TCreateUserRequest = Request<{}, {}, {
    username: string;
    password: string;
}>;

export type TLoginRequest = Request<{}, {}, {
    username: string;
    password: string;
}>