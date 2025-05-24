import React from 'react';
import { Button } from '@/wm-ui';
import type { Route } from './+types/login';
import ToggleThemeButton from '~/components/ToggleThemeButton';

export default function Index() {
    return (
        <>
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
                <div className="hidden bg-slate-200 p-10 md:block dark:bg-slate-700">
                    <h1 className="text-4xl">
                        <span className="text-green-500">Water</span>
                        <span className="text-blue-500">Chat</span>
                    </h1>
                </div>
                <div className="p-20">登录</div>
            </div>
            <ToggleThemeButton style={{ position: 'absolute', top: 20, right: 20, zIndex: 9 }} />
        </>
    );
}
