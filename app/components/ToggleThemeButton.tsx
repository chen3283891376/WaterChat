import React, { type MouseEvent, useState } from 'react';
import { CircleButton } from '@/wm-ui';
import IconSun from '~/icons/IconSun';
import IconMoon from '~/icons/IconMoon';

export default function ToggleThemeButton({
    radius = 20,
    className = '',
    style,
}: { radius?: number } & React.HTMLAttributes<HTMLDivElement>) {
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
        <CircleButton style={style} className={className} onClick={toggleTheme} radius={radius}>
            <div className="m-auto w-fit">{darkState ? <IconSun size={24} /> : <IconMoon size={24} />}</div>
        </CircleButton>
    );
}
