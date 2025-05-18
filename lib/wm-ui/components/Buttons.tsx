import React from 'react';

export function TransparentButton({ className = "", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={"text-sky-500 border-0 m-2" + className} {...props} >
            {children}
        </button>
    );
}
