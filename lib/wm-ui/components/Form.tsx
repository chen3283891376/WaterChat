import React from 'react';
import type { RefElement } from '../types';

export function FormGroup({ className = '', children, ...props }: RefElement<HTMLDivElement>) {
    return (
        <div className={'flex gap-2 rounded-md border border-black pl-2 dark:border-white ' + className} {...props}>
            {children}
        </div>
    );
}

export function FormLabel({ className = '', children, ...props }: RefElement<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>) {
    return (
        <label className={'text-black dark:text-white ' + className} {...props}>
            {children}
        </label>
    );
}

export function FormControl({ className = '', children, ...props }: RefElement<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>) {
    return (
        <input
            className={
                'flex-1 rounded-md border border-b-2 border-black border-b-sky-500 px-1 text-black focus-visible:border-b-sky-600 focus-visible:outline dark:border-white dark:border-b-sky-500 dark:text-white ' +
                className
            }
            {...props}
        >
            {children}
        </input>
    );
}
