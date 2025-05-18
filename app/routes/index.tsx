import React from 'react';
import {
    TransparentButton,
    Button,
    DangerousButton,
    Frame,
    FormControl,
    FormGroup,
    FormLabel,
    Progress,
    CircleButton,
} from '@/wm-ui';
import type { Route } from './+types/index';
import ToggleThemeButton from '~/components/ToggleThemeButton';

export default function Index() {
    return (
        <>
            <ToggleThemeButton  style={{ position: 'absolute', top: 20, right: 20, zIndex: 9 }} />

            <div className="container mx-auto flex flex-col gap-2 px-2">
                <h1>Welcome!</h1>
                <Frame className="flex gap-2">
                    <Button>Test</Button>
                    <TransparentButton onClick={() => alert("Hello!")}>Test</TransparentButton>
                    <DangerousButton>Test</DangerousButton>
                    <CircleButton>T</CircleButton>
                </Frame>
                <FormControl />
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl />
                </FormGroup>
                <Progress value={60} max={100} />
            </div>
        </>
    );
}
