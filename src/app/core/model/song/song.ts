import {User} from '../user/user';
import {Band} from '../band/band';

export interface Song {
    id: number;
    name: string;
    author: string;
    content: string;
    youtubeUrl: string;
    likeCount: number;
    createTime: Date;
    updateTime: Date;
    band: Band;
    user: User;
    status: string;
}

export interface SongRequest {
    name?: string;
    content?: string;
    author?: string;
    suggestedBand?: string;
    youtubeUrl?: string;
    band?: Band;
    status?: string;
}

export class SongFilter {
    name?: string;
    band?: string;
    author: string;
    suggestedBand?: string;
    user?: string;
    status?: string;
    page: number;
    size: number;
    sort?: string;
    sortDir?: string;

    getParams(): any {
        const params: any = {};

        if (this.name) {
            params.name = this.name;
        }

        if (this.band) {
            params.band = this.band;
        }

        if (this.author) {
            params.author = this.author;
        }

        if (this.suggestedBand) {
            params.suggestedBand = this.suggestedBand;
        }

        if (this.user) {
            params.user = this.user;
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
