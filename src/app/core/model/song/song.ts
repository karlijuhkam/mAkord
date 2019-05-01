import {User} from '../user/user';
import {Band} from '../band/band';

export interface Song {
    id: number;
    name: string;
    content: string;
    likeCount: number;
    band: Band;
    user: User;
}
