import React from 'react';
import { Button } from '@/wm-ui';
import Translator from '~/translation/translator';
import type { Route } from './+types/index';

export default function Index() {
    const tr = Translator('index', 'zh');

    return (
        <div className="container mx-auto">
            <h1>{tr('welcome to water-chat')}</h1>
            <Button onClick={() => (location.href = '/components')}>{tr('go to view components')}</Button>
            <Button onClick={() => (location.href = '/login')}>{tr('go to login')}</Button>
        </div>
    );
}
