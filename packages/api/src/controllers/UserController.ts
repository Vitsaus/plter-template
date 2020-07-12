
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { UserMapper } from '../mappers/UserMapper';
import { CreateUserRequestDto } from '../dtos/CreateUserRequest';
import { UserEntity } from '../entities/UserEntity';
import { LoginUserRequestDto } from '../dtos/LoginUserRequest';
import { UserDto } from '../dtos/UserDto';
import { ILoginResponse, IErrorResponse, ICreateUserResponse, IShowUserResponse, ITokenData, IUser } from '@vitsaus/common';
import { authenticationCheck } from '../middlewares/authentication';
import { TLoginRequest, TCreateUserRequest, TShowUserRequest } from '../types/user';

@Controller('api-users')
export class UserController  {

    private userService: UserService;

    constructor(
        userService: UserService,
    ) {
        this.userService = userService;
    }

    @Get('me')
    @Middleware([authenticationCheck])
    private async showMe(req: Request, res: Response<IShowUserResponse | IErrorResponse>) {

        try {

            const token = req.get('Authorization') as string;
            const tokenData: ITokenData = await this.userService.decodeToken(token) as ITokenData;
            const userEntity: UserEntity = await this.userService.findById(tokenData.id) as UserEntity;
            const user: IUser = await UserMapper.mapUserEntityToDto(userEntity);

            res.status(200).json({
                type: 'result',
                user
            });

        } catch(e) {

            console.log('me error', e);
            
            res.status(400).json({
                type: 'error',
                msg: 'error happened'
            });

        }

    }

    @Get('user/:username')
    @Middleware([authenticationCheck])
    private async showUser(req: TShowUserRequest, res: Response<IShowUserResponse | IErrorResponse>) {

        try {

            const {
                username
            } = req.params;

            console.log('got username', username);

            const user = await this.userService.findUserByUsername(username);

            console.log('found user', user);

            if (!user) {
                return res.status(400).json({
                    type: 'error',
                    msg: 'not found'
                });
            }
        
            return res.status(200).json({
                type: 'result',
                user: await UserMapper.mapUserEntityToDto(user),
            });

        } catch(e) {

            console.log(e);

            return res.status(400).json({
                type: 'error',
                msg: 'error happened'
            });

        }

    }

    @Post('register')
    private async createUser(req: TCreateUserRequest, res: Response<ICreateUserResponse | IErrorResponse>) {
        
        try {

            const dto: CreateUserRequestDto = await UserMapper.mapRequestToCreateUserDto(req);

            const user: UserDto = await this.userService.register(dto);
            const token: string = await this.userService.createToken(user);

            return res.status(200).json({
                type: 'result',
                token,
                user
            });

        } catch(e) {

            console.log(e);

            return res.status(400).json({
                type: 'error',
                msg: 'error happened'
            });

        }

    }

    @Post('login')
    private async loginUser(req: TLoginRequest, res: Response<ILoginResponse | IErrorResponse>) {
        
        try {

            const dto: LoginUserRequestDto = await UserMapper.mapRequestToLoginUserDto(req);

            const user: UserDto = await this.userService.login(dto);
            const token: string = await this.userService.createToken(user);

            return res.status(200).json({
                type: 'result',
                token,
                user
            });

        } catch(e) {

            console.log(e);

            return res.status(400).json({
                type: 'error',
                msg: 'error happened'
            });

        }

    }

}