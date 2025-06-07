import Reac from 'react';
import '../styles/Dialog.css';
import type { RefElement } from '../types';

export function Dialog({
    className = '',
    children,
    ...props
}: RefElement<HTMLDialogElement, React.DialogHTMLAttributes<HTMLDialogElement>>) {
    return (
        <dialog className={'wm-dialog ' + className} {...props}>
            {children}
        </dialog>
    );
}
