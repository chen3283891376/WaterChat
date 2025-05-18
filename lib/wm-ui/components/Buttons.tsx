import React from 'react';

export function Button({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={
                'rounded-md border border-black px-2 py-1 text-black hover:bg-emerald-100 dark:border-white dark:text-white dark:hover:bg-emerald-900 ' +
                className
            }
            {...props}
        >
            {children}
        </button>
    );
}

export function TransparentButton({
    className = '',
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={
                'rounded-md border-0 px-2 py-1 text-black hover:bg-slate-100 hover:text-sky-500 dark:text-white dark:hover:bg-slate-900' +
                className
            }
            {...props}
        >
            {children}
        </button>
    );
}

export function DangerousButton({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={
                'rounded-md border border-black px-2 py-1 text-black hover:bg-red-500 hover:text-white dark:border-white dark:text-white' +
                className
            }
            {...props}
        >
            {children}
        </button>
    );
}

export function CircleButton({ radius = 20, className = '', style = {}, children, ...props }: { radius?: number } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    style.width = `${2 * radius}px`;
    style.height = `${2 * radius}px`;

    return (
        <button
            className={
                'rounded-full border border-black text-black hover:bg-teal-500 dark:border-white dark:text-white ' +
                className
            }
            style={style}
            {...props}
        >
            {children}
        </button>
    );
}
