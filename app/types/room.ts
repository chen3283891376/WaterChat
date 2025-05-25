export interface RoomType {
    name: string;
    avatar: string;
    id: number;
    private: boolean;
    admin_id: number;
    friend_id?: number;
}
