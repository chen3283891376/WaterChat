import React from 'react';
import '../styles/Progress.css';

export function Progress({
    value = 60,
    max = 100,
    showText = true,
    className = '',
    ...props
}: { value?: number; max?: number; showText?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
    const width = Math.round((value / max) * 100);

    return (
        <div className={'wm-progress ' + className} {...props}>
            <div className="wm-progress-bar" style={{ width: `${width}%` }}>
                {showText ? `${width}%` : null}
            </div>
        </div>
    );
}
