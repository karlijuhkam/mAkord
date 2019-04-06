import {User} from './user';

export class LoginRequest {

    constructor(
        public username: string,
        public password: string
    ) {}

}

export interface LoginResponse {
    token: Token;
    user: User;
}

export interface Token {
    id: string;
    username: string;
    expiry: Date;
}
