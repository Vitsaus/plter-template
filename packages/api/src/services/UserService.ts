import {Connection, getConnection} from "typeorm";
import {sign, verify} from 'jsonwebtoken';
import { UserEntity } from '../entities/UserEntity';
import { CreateUserRequestDto } from '../dtos/CreateUserRequest';
import {hash, compare} from 'bcrypt';
import { LoginUserRequestDto } from '../dtos/LoginUserRequest';
import { UserDto } from '../dtos/UserDto';
import { UserMapper } from '../mappers/UserMapper';
import { IUser, ITokenData } from '@vitsaus/common';

export class UserService {

    private key: string = 'helloWorld!';

    private dbConnection: Connection;

    constructor(
        dbConnection: Connection,
    ) {
        this.dbConnection = dbConnection;
    }

    public static async factory() {

        const dbConnection: Connection = await getConnection();

        const userService = new UserService(
            dbConnection,
        );

        return userService;

    }

    public findUserByUsername(username: string): Promise<UserEntity | undefined> {

        const userRepository = this.dbConnection.getRepository(UserEntity);

        return userRepository
            .createQueryBuilder("u")
            .where("u.username = :username", { username })
            .getOne();

    }

    public findById(id: number): Promise<UserEntity | undefined> {

        const userRepository = this.dbConnection.getRepository(UserEntity);

        return userRepository
            .createQueryBuilder("u")
            .where("u.id = :id", { id })
            .getOne();

    }

    public async register(
        dto: CreateUserRequestDto
    ): Promise<UserDto> {

        const userRepository = this.dbConnection.getRepository(UserEntity);

        const existingUser = await this.findUserByUsername(dto.username);

        if (existingUser) {
            throw 'user exists';
        }

        const userEntity = new UserEntity();

        userEntity.username = dto.username;
        userEntity.password = await this.createPassword(dto.password);
        
        const e = await userRepository.save(userEntity);

        return UserMapper.mapUserEntityToDto(e);

    }

    public async createPassword(password: string): Promise<string> {

        return new Promise((resolve, reject) => {

            hash(password, 10, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });

        });

    }

    public async login(dto: LoginUserRequestDto): Promise<UserDto> {

        const userRepository = this.dbConnection.getRepository(UserEntity);

        const user = await this.findUserByUsername(dto.username);

        if (!user) {
            throw 'user does not exists';
        }
        
        const passwordComparisonResult = await this.comparePassword(dto.password, user.password);

        if (!passwordComparisonResult) {
            throw 'password does not match'
        }

        return await UserMapper.mapUserEntityToDto(user);

    }

    public async comparePassword(inputPassword, hashedPassword): Promise<boolean> {

        return new Promise((resolve, reject) => {

            compare(inputPassword, hashedPassword, function(err, res) {
                if (err) {
                    return reject(err);
                }
                if(res) {
                    return resolve(true);
                } else {
                    return resolve(false);
                } 
            });

        });

    }

    public async createToken(user: IUser): Promise<string> {

        return new Promise((resolve, reject) => {
            
            sign({
                id: user.id,
                sub: user.username,
            }, this.key, function(err, token) {
                if (err) {
                    return reject(err);
                }
                return resolve(token);
            });

        });

    }

    public async decodeToken(token: string): Promise<ITokenData | null> {

        return new Promise((resolve, reject) => {

            verify(token, this.key, function(err, decoded) {
                if (err) {
                    console.log('authentication error', err);
                    return reject(null);
                }
                return resolve(decoded);
            });

        });

    }

}