import {Role} from './role';
import {AbstractControl} from '@angular/forms';

export interface User {
    id: number;
    email: string;
    username: string;
    roles?: Role[];
    likedSongsCount: number;
    addedSongsCount: number;
}

export interface UserRequest {
    username?: string;
    status?: string;
    roles?: Role[];
    oldPassword?: string;
    newPassword?: string;
}

export class UserFilter {
    email?: string;
    username?: string;
    roles?: string;
    status?: string;
    page?: number;
    size?: number;
    sort?: string;
    sortDir?: string;

    getParams(): any {
        const params: any = {};

        if (this.email) {
            params.email = this.email;
        }

        if (this.username) {
            params.username = this.username;
        }

        if (this.roles) {
            params.roles = this.roles;
        }

        if (this.status) {
            if (this.status === 'all') {
                params.status = '';
            } else {
                params.status = this.status;
            }
        }

        if (this.page > 0) {
            params.page = this.page;
        }

        if (this.size > 0) {
            params.size = this.size;
        }

        if (this.sort) {
            params.sort = this.sort;
        }

        if (this.sortDir) {
            params.sortDir = this.sortDir;
        }
        return params;
    }
}

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('newPassword').value;
        const confirmPassword = AC.get('repeatPassword').value;
        if (password !== confirmPassword) {
            AC.get('repeatPassword').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}
