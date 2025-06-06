import React from 'react';
import type { RefElement } from '../types';

export function Alert({ className = '', children, ...props }: RefElement<HTMLDivElement>) {
    return (
        <div className={'rounded-md border border-sky-500 bg-sky-200 p-2 dark:bg-sky-700 ' + className} {...props}>
            {children}
        </div>
    );
}

export function SuccessAlert({ className = '', children, ...props }: RefElement<HTMLDivElement>) {
    return (
        <div
            className={'rounded-md border border-green-500 bg-green-200 p-2 dark:bg-green-700 ' + className}
            {...props}
        >
            {children}
        </div>
    );
}

export function DangerousAlert({ className = '', children, ...props }: RefElement<HTMLDivElement>) {
    return (
        <div className={'rounded-md border border-red-500 bg-red-200 p-2 dark:bg-red-700 ' + className} {...props}>
            {children}
        </div>
    );
}
