import React from 'react';
import type { RefElement } from '../types';

export function Frame({ className = '', children, ...props }: RefElement<HTMLDivElement>) {
    return (
        <div className={'rounded-md border border-black dark:border-white ' + className} {...props}>
            {children}
        </div>
    );
}
