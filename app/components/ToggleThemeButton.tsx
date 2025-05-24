import React, { type MouseEvent, useState } from 'react';
import { CircleButton } from '@/wm-ui';

export default function ToggleThemeButton({ className = '', style }: React.HTMLAttributes<HTMLDivElement>) {
    const [darkState, setDarkState] = useState(false);

    const toggleTheme = (event: MouseEvent) => {
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        let isDark: boolean;

        const transition = document.startViewTransition(() => {
            const root = document.documentElement;
            isDark = root.classList.contains('dark');
            root.classList.remove(isDark ? 'dark' : 'light');
            root.classList.add(isDark ? 'light' : 'dark');
            setDarkState(!isDark);
        });

        transition.ready.then(() => {
            const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
            document.documentElement.animate(
                {
                    clipPath: isDark ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 400,
                    easing: 'ease-in',
                    pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
                },
            );
        });
    };

    return (
        <CircleButton style={style} className={className} onClick={toggleTheme}>
            {darkState ? '☀️' : '🌙'}
        </CircleButton>
    );
}
