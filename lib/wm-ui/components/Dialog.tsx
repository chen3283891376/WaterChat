import React, { forwardRef } from 'react';
import '../styles/Dialog.css';

export const Dialog = forwardRef<HTMLDialogElement, React.DialogHTMLAttributes<HTMLDialogElement>>(
    ({ className = '', children, ...props }, ref) => {
        return (
            <dialog className={'wm-dialog ' + className} {...props} ref={ref}>
                {children}
            </dialog>
        );
    },
);
