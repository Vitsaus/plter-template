import {Request} from 'express';
import { CreateUserRequestDto } from '../dtos/CreateUserRequest';
import { domainToASCII } from 'url';
import { validate, ValidationError } from 'class-validator';
import { LoginUserRequestDto } from '../dtos/LoginUserRequest';
import { UserEntity } from '../entities/UserEntity';
import { UserDto } from '../dtos/UserDto';
import { TLoginRequest, TCreateUserRequest } from '../types/user';

export class UserMapper {

    public static async mapRequestToCreateUserDto(req: TCreateUserRequest): Promise<CreateUserRequestDto> {

        const dto = new CreateUserRequestDto();

        console.log('got body', req.body);

        dto.username = req.body.username;
        dto.password = req.body.password;
        
        const errors: ValidationError[] = await validate(dto);

        if (errors.length > 0) {
            console.log('got errors!', errors);
            throw 'validation error';
        }

        return dto;

    }

    public static async mapRequestToLoginUserDto(req: TLoginRequest): Promise<LoginUserRequestDto> {

        const dto = new LoginUserRequestDto();

        console.log('got body', req.body);

        dto.username = req.body.username;
        dto.password = req.body.password;
        
        const errors: ValidationError[] = await validate(dto);

        if (errors.length > 0) {
            console.log('got errors!', errors);
            throw 'validation error';
        }

        return dto;

    }

    public static async mapUserEntityToDto(entity: UserEntity): Promise<UserDto> {

        const dto = new UserDto();

        dto.id = entity.id;
        dto.username = entity.username;

        return dto;

    }

}