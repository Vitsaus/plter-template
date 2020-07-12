import {IResponseType} from '../types';

export interface IErrorResponse extends IResponseType {
    type: 'error',
    msg: string;
};