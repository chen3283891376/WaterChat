import type { ErrorResponse, SuccessResponse } from '~/types/base';
import type { UserType } from '~/types/user';
import type { RoomType } from '~/types/room';

export class User {
    public isLoadedInfo = false;

    public name: string = '不存在的用户';
    public id: number = 999999999;
    public avatar: string = 'https://livefile.xesimg.com/programme/python_assets/e6f6b37815399773a2f7365cf805077f.png';
    public avatar_base64: string = 'e6f6b37815399773a2f7365cf805077f.png';

    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    toString() {
        if (this.isLoadedInfo) {
            return `<User ${this.name} id=${this.id} />`;
        }
        return '<User [not loaded info]>';
    }

    async loadInfo() {
        const response = await fetch(
            '/api/user/account_info?' +
                new URLSearchParams({
                    access_token: this.token,
                }).toString(),
        );

        if (!response.ok) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const info: SuccessResponse<UserType> = await response.json();

        this.id = info.data.id;
        this.name = info.data.name;
        this.avatar = info.data.avatar;
        this.avatar_base64 = info.data.avatar.split('/')[-1];
        this.isLoadedInfo = true;
    }

    async getPublicRooms() {
        const response = await fetch(
            '/api/room/has?' +
                new URLSearchParams({
                    access_token: this.token,
                }).toString(),
        );

        if (!response.ok) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const data: SuccessResponse<RoomType[]> = await response.json();

        return data.data;
    }

    async getPrivateRooms() {
        const response = await fetch(
            '/api/room/private?' +
                new URLSearchParams({
                    access_token: this.token,
                }).toString(),
        );

        if (!response.ok) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const data: SuccessResponse<RoomType[]> = await response.json();

        return data.data;
    }
}
