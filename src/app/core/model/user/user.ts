import {Role} from './role';

export interface User {
    id: number;
    email: string;
    username: string;
    roles?: Role[];
    enabled?: boolean;
    passwordChanged?: boolean;
}
