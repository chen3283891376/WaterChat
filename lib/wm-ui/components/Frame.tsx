import React from 'react';

export function Frame({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={'rounded-md p-2 border ' + className} {...props}>
            {children}
        </button>
    );
}