import React, { useEffect, useState } from 'react';
import { Button, Frame, LinkButton } from '@/wm-ui';
import Translator from '~/translation/translator';
import type { Route } from './+types/index';
import ToggleThemeButton from '~/components/ToggleThemeButton';
import IconSettings from '~/icons/IconSettings';
import IconFriend from '~/icons/IconFriend';
import IconChat from '~/icons/IconChat';
import IconAddFriend from '~/icons/IconAddFriend';
import IconCreateRoom from '~/icons/IconCreateRoom';
import type { SuccessResponse } from '~/types/base';
import type { RoomType } from '~/types/room';
import { getAccessToken } from '~/utils';
import { RoomList } from '~/components/Rooms';
import { Tooltip } from '@/wm-ui/components/Tooltip';

export default function Index() {
    const tr = Translator('index', 'zh');
    const [currentPage, setCurrentPage] = useState(1);
    const [rooms, setRooms] = useState<RoomType[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                '/api/check' +
                    '?' +
                    new URLSearchParams({
                        access_token: getAccessToken(),
                    }).toString(),
            );

            if (!response.ok) {
                localStorage.removeItem('access_token');
                location.href = '/login';
                return;
            }
            await getRooms('public');
        })();
    }, []);

    const getRooms = async (type: 'public' | 'private') => {
        const typeMap = {
            public: '/api/room/has',
            private: '/api/room/private',
        };

        const response = await fetch(
            typeMap[type] +
                '?' +
                new URLSearchParams({
                    access_token: getAccessToken(),
                }).toString(),
        );

        const responseJson: SuccessResponse<RoomType[]> = await response.json();
        console.log(responseJson);
        setRooms(responseJson.data);
    };

    return (
        <div className="flex h-full flex-col gap-2 bg-slate-100 p-2 dark:bg-slate-800">
            <div className="flex gap-2">
                <div>水瓜聊天</div>
                <div className="flex-1">{/* 幽灵 div 实现中间留白 */}</div>
                <div>欢迎您，******</div>
            </div>
            <div className="flex flex-1 gap-2">
                <div className="flex flex-col gap-2" style={{ width: 44 }}>
                    <Tooltip tooltip="群组">
                        <LinkButton
                            className={'py-2 hover:bg-slate-200' + (currentPage === 1 ? ' bg-slate-200 dark:bg-slate-700' : '')}
                            onClick={() => {
                                setCurrentPage(1);
                                getRooms('public');
                            }}
                        >
                            <IconChat size="100%" />
                        </LinkButton>
                    </Tooltip>

                    <Tooltip tooltip="好友">
                        <LinkButton
                            className={'py-2 hover:bg-slate-200' + (currentPage === 2 ? ' bg-slate-200 dark:bg-slate-700' : '')}
                            onClick={() => {
                                setCurrentPage(2);
                                getRooms('private');
                            }}
                        >
                            <IconFriend size="100%" />
                        </LinkButton>
                    </Tooltip>

                    <Tooltip tooltip="添加好友">
                        <LinkButton className="py-2 hover:bg-slate-200">
                            <IconAddFriend size="100%" />
                        </LinkButton>
                    </Tooltip>

                    <Tooltip tooltip="创建房间">
                        <LinkButton className="py-2 hover:bg-slate-200">
                            <IconCreateRoom size="100%" />
                        </LinkButton>
                    </Tooltip>

                    <div className="flex-1">{/* 幽灵 div 实现中间留白 */}</div>
                    <ToggleThemeButton className="text-2xl" radius={22} />

                    <Tooltip className="wm-tooltip-top-right" tooltip="设置">
                        <LinkButton className="py-2 hover:bg-slate-200">
                            <IconSettings size="100%" />
                        </LinkButton>
                    </Tooltip>
                </div>
                <Frame className="flex flex-col bg-white dark:bg-gray-950" style={{ width: 150 }}>
                    <h1 className="p-1 text-2xl">{currentPage === 1 ? '群组' : '私聊'}</h1>
                    <hr />
                    <RoomList infos={rooms} onClick={roomId => console.log('打开房间', roomId)} />
                </Frame>
                <div className="flex-1 bg-white dark:bg-gray-950">
                    <Frame className="flex h-full flex-col">
                        <div className="m-auto text-center text-2xl text-gray-300 dark:text-gray-700">
                            欢迎来到 WaterChat
                        </div>
                    </Frame>
                </div>
            </div>
        </div>
    );
}
