import {Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from "class-validator";


export class LoginUserRequestDto {

    @Length(3, 250)
    username: string;

    @Length(3, 250)
    password: string;

}