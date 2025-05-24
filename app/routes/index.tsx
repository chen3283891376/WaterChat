import React from 'react';
import { Button, Frame } from '@/wm-ui';
import Translator from '~/translation/translator';
import type { Route } from './+types/index';
import ToggleThemeButton from '~/components/ToggleThemeButton';

export default function Index() {
    const tr = Translator('index', 'zh');

    return (
        <div className="flex flex-col h-full p-2 gap-2">
            <div className="flex gap-2">
                <div>水瓜聊天</div>
                <div className="flex-1">{/* 幽灵 div 实现中间留白 */}</div>
                <div>欢迎您，******</div>
            </div>
            <div className="flex-1 flex gap-2">
                <div className="flex flex-col gap-2" style={{ width: 45 }}>
                    <Button>feat</Button>
                    <Button>feat</Button>
                    <Button>feat</Button>
                    <Button>feat</Button>

                    <div className="flex-1">{/* 幽灵 div 实现中间留白 */}</div>
                    <ToggleThemeButton />
                    <Button>feat</Button>
                </div>
                <Frame className="flex flex-col" style={{ width: 150 }}>
                    Middle
                    <hr />
                    <div className="flex-1">List</div>
                </Frame>
                <div className="flex-1">
                    <Frame className="h-full">
                        欢迎来到 WaterChat
                    </Frame>
                </div>
            </div>
        </div>
    );
}
