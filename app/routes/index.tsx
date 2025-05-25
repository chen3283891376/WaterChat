import React from 'react';
import { Button, Frame } from '@/wm-ui';
import Translator from '~/translation/translator';
import type { Route } from './+types/index';
import ToggleThemeButton from '~/components/ToggleThemeButton';
import IconSettings from '~/icons/IconSettings';
import IconFriend from '~/icons/IconFriend';
import IconChat from '~/icons/IconChat';
import IconAddFriend from '~/icons/IconAddFriend';
import IconCreateRoom from '~/icons/IconCreateRoom';

export default function Index() {
    const tr = Translator('index', 'zh');

    return (
        <div className="flex h-full flex-col gap-2 bg-slate-100 p-2 dark:bg-slate-800">
            <div className="flex gap-2">
                <div>水瓜聊天</div>
                <div className="flex-1">{/* 幽灵 div 实现中间留白 */}</div>
                <div>欢迎您，******</div>
            </div>
            <div className="flex flex-1 gap-2">
                <div className="flex flex-col gap-2" style={{ width: 44 }}>
                    <Button className="py-2">
                        <IconChat size="100%" />
                    </Button>
                    <Button className="py-2">
                        <IconFriend size="100%" />
                    </Button>
                    <Button className="py-2">
                        <IconAddFriend size="100%" />
                    </Button>
                    <Button className="py-2">
                        <IconCreateRoom size="100%" />
                    </Button>

                    <div className="flex-1">{/* 幽灵 div 实现中间留白 */}</div>
                    <ToggleThemeButton className="text-2xl" radius={22} />
                    <Button className="py-2">
                        <IconSettings size="100%" />
                    </Button>
                </div>
                <Frame className="flex flex-col bg-white dark:bg-gray-950" style={{ width: 150 }}>
                    <h1 className="p-1 text-2xl">Title</h1>
                    <hr />
                    <div className="flex flex-1 flex-col gap-1 p-1">
                        <Frame className="p-1">朋友1号</Frame>
                        <Frame className="p-1">朋友2号</Frame>
                        <Frame className="p-1">朋友3号</Frame>
                    </div>
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
