import React from 'react';
import { Frame } from '@/wm-ui';

export default function BlankChatFrame() {
    return (
        <Frame className="flex h-full flex-col bg-white dark:bg-gray-950">
            <div className="m-auto text-center text-2xl text-gray-300 dark:text-gray-700">欢迎来到 WaterChat</div>
        </Frame>
    );
}
