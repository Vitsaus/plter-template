import {Request, Response, NextFunction} from 'express';
import { IErrorResponse, ITokenData } from '@vitsaus/common';
import { UserService } from '../services/UserService';


export async function authenticationCheck(req: Request, res: Response<IErrorResponse>, next: NextFunction) {

    try {

        const userService: UserService = await UserService.factory();

        const token = req.get('Authorization');

        if (!token) {
            throw 'token not found';
        }

        const result: ITokenData | null = await userService.decodeToken(token);

        console.log('got token', token);
        console.log('got result', result);

        if (result === null) {
            throw 'authentication failed';
        }

        return next();

    } catch(e) {

        console.log('authentication error', e);

        return res.status(400).json({
            type: 'error',
            msg: 'authentication failed',
        });

    }

}