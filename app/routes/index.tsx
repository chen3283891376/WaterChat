import React from 'react';
import { Button } from '@/wm-ui';
import type { Route } from './+types/index';

export default function Index() {
    return (
        <div className="container mx-auto">
            <h1>Welcome to WaterChat!</h1>
            <Button onClick={() => (location.href = '/components')}>Go to view Components</Button>
            <Button onClick={() => (location.href = '/login')}>Go to login</Button>
        </div>
    );
}
