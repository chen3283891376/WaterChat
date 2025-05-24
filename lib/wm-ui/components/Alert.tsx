import React from 'react';

export function Alert({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={'rounded-md border border-sky-500 bg-sky-200 p-2 dark:bg-sky-700 ' + className} {...props}>
            {children}
        </div>
    );
}

export function SuccessAlert({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={'rounded-md border border-green-500 bg-green-200 p-2 dark:bg-green-700 ' + className}
            {...props}
        >
            {children}
        </div>
    );
}

export function DangerousAlert({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={'rounded-md border border-red-500 bg-red-200 p-2 dark:bg-red-700 ' + className} {...props}>
            {children}
        </div>
    );
}
