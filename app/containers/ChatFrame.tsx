import React from 'react';
import { Frame, LinkButton, TextArea } from '@/wm-ui';
import { Room } from '~/api/room';
import IconThreeDots from '~/icons/IconThreeDots';

export default function ChatFrame({ room }: { room: Room }) {
    return (
        <div className="flex h-full flex-col gap-2">
            <Frame className="flex bg-white p-1 dark:bg-gray-950">
                <div>{room.name}</div>
                <div className="flex-1">{/* 幽灵 div 实现中间留白 */}</div>
                <LinkButton style={{ padding: '0 10px' }}>
                    <IconThreeDots />
                </LinkButton>
            </Frame>
            <Frame className="flex-1 bg-white p-1 dark:bg-gray-950">Messages</Frame>
            <Frame className="flex flex-col bg-white p-1 dark:bg-gray-950" style={{ height: '170px' }}>
                <div>test</div>
                <TextArea className="flex-1 resize-none" />
            </Frame>
        </div>
    );
}
