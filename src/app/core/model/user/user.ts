import {Role} from './role';

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    roles?: Role[];
    picture?: string;
    pictureThumb?: string;
    noticeEmail?: string;
    noticeFrequency?: number;
    lang?: string;
    enabled?: boolean;
    passwordChanged?: boolean;
}