import React from 'react';
import type { RefElement } from '../types';

export function TextArea({
    className = '',
    children,
    ...props
}: RefElement<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>) {
    return (
        <textarea
            className={
                'rounded-md border border-b-2 border-black border-b-sky-500 px-1 text-black focus-visible:border-b-sky-600 focus-visible:outline dark:border-white dark:border-b-sky-500 dark:text-white ' +
                className
            }
            {...props}
        >
            {children}
        </textarea>
    );
}
