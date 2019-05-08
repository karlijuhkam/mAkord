import {User} from '../user/user';
import {Band} from '../band/band';

export interface Song {
    id: number;
    name: string;
    content: string;
    youtubeUrl: string;
    likeCount: number;
    band: Band;
    user: User;
}

export interface SongRequest {
    name?: string;
    content?: string;
    suggestedBand?: string;
    youtubeUrl?: string;
    band?: Band;
}
