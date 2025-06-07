import Reac from 'react';
import '../styles/Dialog.css';
import type { RefElement } from '../types';
import React from 'react';
import { Button, DangerousButton } from '@/wm-ui';
import IconCross from '@/wm-ui/icons/IconCross';

export function Dialog({
    title = '水瓜聊天',
    className = '',
    children,
    ...props
}: RefElement<HTMLDialogElement, { title?: string } & React.DialogHTMLAttributes<HTMLDialogElement>>) {
    return (
        <dialog className={'wm-dialog ' + className} {...props}>
            <div className="flex h-full flex-col">
                <div className="wm-dialog-title-bar flex gap-2 p-1">
                    <img src="/watermelon.png" alt="logo" style={{ height: '24px' }} />
                    <div>{title}</div>
                    <div className="flex-1">{/* 幽灵 div 实现中间留白 */}</div>
                    <form method="dialog">
                        <DangerousButton style={{ padding: 4 }}>
                            <IconCross />
                        </DangerousButton>
                    </form>
                </div>
                <div className="wm-dialog-content flex-1 p-3">{children}</div>
            </div>
        </dialog>
    );
}
