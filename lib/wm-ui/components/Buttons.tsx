import React from 'react';
import type { RefElement } from '../types';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = '', children, ...props }: RefElement<HTMLButtonElement, ButtonProps>) {
    return (
        <button
            className={
                'rounded-md border border-black bg-white px-2 py-1 text-black transition hover:bg-slate-200 active:bg-slate-300 dark:border-white dark:bg-gray-950 dark:text-white dark:hover:bg-slate-800 dark:active:bg-slate-700 ' +
                className
            }
            {...props}
        >
            {children}
        </button>
    );
}

export function LinkButton({ className = '', children, ...props }: RefElement<HTMLButtonElement, ButtonProps>) {
    return (
        <button
            className={
                'rounded-md border-0 px-2 py-1 text-black transition hover:bg-slate-100 hover:text-sky-500 active:bg-slate-200 dark:text-white dark:hover:bg-slate-900 dark:active:bg-slate-800 ' +
                className
            }
            {...props}
        >
            {children}
        </button>
    );
}

export function DangerousButton({ className = '', children, ...props }: RefElement<HTMLButtonElement, ButtonProps>) {
    return (
        <button
            className={
                'rounded-md border border-black px-2 py-1 text-black transition hover:bg-red-500 hover:text-white active:bg-red-600 dark:border-white dark:text-white ' +
                className
            }
            {...props}
        >
            {children}
        </button>
    );
}

export function CircleButton({
    radius = 20,
    className = '',
    style = {},
    children,
    ...props
}: { radius?: number } & RefElement<HTMLButtonElement, ButtonProps>) {
    return (
        <button
            className={
                'rounded-full border border-black bg-white text-black transition hover:bg-slate-200 active:bg-slate-300 dark:border-white dark:bg-gray-950 dark:text-white dark:hover:bg-slate-700 dark:active:bg-slate-600 ' +
                className
            }
            style={{ ...style, width: 2 * radius, height: 2 * radius }}
            {...props}
        >
            {children}
        </button>
    );
}
