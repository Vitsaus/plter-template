import {IResponseType} from '../types';

export interface IUser {
    id: number | undefined;
    username: string | undefined;
}

export interface ITokenData {
    id: number;
    sub: string;
}

export interface IApiResponse<T> extends IResponseType {
    data: T;
}

export interface ILoginResponse extends IResponseType {
    user: IUser;
    token: string;
}

export interface ICreateUserResponse extends IResponseType {
    user: IUser;
    token: string;
}

export interface IShowUserResponse extends IResponseType {
    user: IUser;
}