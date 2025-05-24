import React, { forwardRef } from 'react';

export function FormGroup({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={'flex gap-2 rounded-md border border-black pl-2 dark:border-white ' + className} {...props}>
            {children}
        </div>
    );
}

export function FormLabel({ className = '', children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label className={'text-black dark:text-white ' + className} {...props}>
            {children}
        </label>
    );
}

export const FormControl = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className = '', children, ...props }, ref) => {
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
    },
);
