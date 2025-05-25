import React from 'react';
import '../styles/Tooltip.css';

export function Tooltip({
    tooltip,
    className = '',
    children,
    ...props
}: { tooltip: string | React.JSX.Element } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={'wm-tooltip flex ' + className} {...props}>
            {children}
            <div className={'wm-tooltip-text'}>{tooltip}</div>
        </div>
    );
}
