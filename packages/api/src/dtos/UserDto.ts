import {IUser} from '@vitsaus/common';

export class UserDto implements IUser {
    id: number | undefined;
    username: string | undefined;
}
