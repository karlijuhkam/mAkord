import {User} from './user';

export class LoginRequest {

    constructor(
        public username: string,
        public password: string
    ) {}

}

export class RegisterRequest {

    constructor(
        public username: string,
        public password: string,
        public email: string,
        public firstName: string,
        public lastName: string
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
