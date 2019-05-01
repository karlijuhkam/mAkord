import {User} from './user';

export class LoginRequest {

    constructor(
        public email: string,
        public password: string
    ) {}

}

export class RegisterRequest {

    constructor(
        public username: string,
        public password: string,
        public email: string
    ) {}

}

export interface LoginResponse {
    token: Token;
    user: User;
}

export interface Token {
    id: string;
    email: string;
    expiry: Date;
}
