import React from 'react';
import {TransparentButton, Button, DangerousButton, Frame} from '@/wm-ui';
import type { Route } from './+types/index';

export default function Index() {
    return (
        <div className="container mx-auto">
            <h1>Welcome!</h1>
            <Frame className="flex gap-2">
                <Button>Test</Button>
                <TransparentButton>Test</TransparentButton>
                <DangerousButton>Test</DangerousButton>
            </Frame>
        </div>
    );
}
