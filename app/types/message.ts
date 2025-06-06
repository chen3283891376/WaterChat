import type { UserType } from '~/types/user';

export interface MessageDict {
    message: string;
    type: string;
    send_user: UserType;
    send_time: string;
}

export interface MessagePacket {
    room_id: number;
    type: string;
    message: string;
    from_user: UserType;
}

export enum MessageType {
    Text = 'text',
    Image = 'image',
    File = 'file',
}
