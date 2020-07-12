import {atom, RecoilState} from 'recoil';
import {IUser} from '@vitsaus/common';

export const tokenState: RecoilState<string | null> = atom<string | null>({
    key: 'token',
    default: null,
});

export const userState: RecoilState<IUser | null> = atom<IUser | null>({
    key: 'user',
    default: null,
});

