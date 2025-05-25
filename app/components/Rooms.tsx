import React, { type MouseEvent } from 'react';
import { Button } from '@/wm-ui';
import type { RoomType } from '~/types/room';

export function OpenRoomButton({ info, onClick }: { info: RoomType; onClick: (event: MouseEvent) => void }) {
    return (
        <Button className="flex items-center gap-2 text-left" onClick={onClick}>
            <img src={info.avatar} width={32} height={32} alt={info.name} />
            <div className="text-lg">{info.name}</div>
        </Button>
    );
}

export function RoomList({
    infos,
    onClick,
}: {
    infos: RoomType[];
    onClick: (roomId: number, event: MouseEvent) => void;
}) {
    const buttons = infos.map((info: RoomType) => (
        <OpenRoomButton info={info} onClick={event => onClick(info.id, event)} key={info.id} />
    ));
    return <div className="flex flex-1 flex-col gap-1 p-1">{buttons}</div>;
}
