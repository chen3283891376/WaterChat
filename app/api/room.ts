import type { ErrorResponse, SuccessResponse } from '~/types/base';
import type { UserType } from '~/types/user';
import type { RoomType } from '~/types/room';

export class Room {
    public isLoadedInfo = false;

    public id: number = 999999999;
    public name: string = '不存在的房间';
    public avatar: string = 'https://livefile.xesimg.com/programme/python_assets/e6f6b37815399773a2f7365cf805077f.png';
    public private: boolean = false;
    public admin_id: number | undefined;
    public friend_id: number | undefined;

    private client: undefined; // for later use

    constructor(roomId: number, client: undefined = undefined) {
        this.id = roomId;
        this.client = client;
    }

    toString() {
        if (this.isLoadedInfo) {
            return `<Room ${this.name} id=${this.id} private=${this.private} />`;
        }
        return '<Room [not loaded info]>';
    }

    loadByObject(data: RoomType) {
        this.id = data.id;
        this.name = data.name;
        this.avatar = data.avatar;
        this.private = data.private;
        this.admin_id = data.admin_id;
        this.friend_id = data.friend_id;
    }

    async load() {
        const response = await fetch(
            '/api/room/get?' +
                new URLSearchParams({
                    id: this.id.toString(),
                }).toString(),
        );

        if (!response.ok) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const info: SuccessResponse<RoomType> = await response.json();

        this.name = info.data.name;
        this.avatar = info.data.avatar;
        this.private = info.data.private;
        this.isLoadedInfo = true;
    }
}
