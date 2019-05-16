export interface Role {
    id: number;
    name: string;
}

export enum RoleType {
    user = 'user',
    moderator = 'moderator',
    admin = 'admin'
}
