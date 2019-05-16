import {Role} from './role';

export interface User {
    id: number;
    email: string;
    username: string;
    roles?: Role[];
    likedSongsCount: number;
    addedSongsCount: number;
}

export class UserFilter {
    email?: string;
    username?: string;
    roles?: string;
    status?: string;
    page: 0;
    size: 10;
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
