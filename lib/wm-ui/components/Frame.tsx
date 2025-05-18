import React from 'react';

export function Frame({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={'rounded-md border border-black p-2 dark:border-white ' + className} {...props}>
            {children}
        </div>
    );
}
