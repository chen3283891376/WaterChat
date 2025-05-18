import React from 'react';

export function BaseButton({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={'rounded-md px-2 py-1 ' + className} {...props}>
            {children}
        </button>
    );
}

export function Button({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <BaseButton className={'border-black border text-black hover:bg-emerald-100' + className} {...props}>
            {children}
        </BaseButton>
    );
}

export function TransparentButton({
    className = '',
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <BaseButton className={'border-0 text-black hover:bg-slate-100 hover:text-sky-500 ' + className} {...props}>
            {children}
        </BaseButton>
    );
}

export function DangerousButton({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <BaseButton className={'border-black border text-black hover:bg-red-500 hover:text-white' + className} {...props}>
            {children}
        </BaseButton>
    );
}
