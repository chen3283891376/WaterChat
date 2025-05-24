import React, { useRef } from 'react';
import {
    LinkButton,
    Button,
    DangerousButton,
    Frame,
    FormControl,
    FormGroup,
    FormLabel,
    Progress,
    CircleButton,
    Dialog,
    Alert,
    SuccessAlert,
    DangerousAlert,
} from '@/wm-ui';
import type { Route } from './+types/components';
import ToggleThemeButton from '~/components/ToggleThemeButton';

export default function Components() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <>
            <ToggleThemeButton style={{ position: 'absolute', top: 20, right: 20, zIndex: 9 }} />

            <div className="container mx-auto flex flex-col gap-2 px-2">
                <h1>Welcome!</h1>
                <Frame className="flex gap-2 p-2">
                    <Button>Test</Button>
                    <LinkButton
                        onClick={() => {
                            dialogRef.current?.showModal();
                        }}
                    >
                        Open Dialog
                    </LinkButton>
                    <DangerousButton>Test</DangerousButton>
                    <CircleButton>T</CircleButton>
                </Frame>
                <FormControl />
                <FormGroup>
                    <FormLabel>Name</FormLabel>
                    <FormControl />
                </FormGroup>
                <Progress value={60} max={100} />
                <Alert>Hello</Alert>
                <SuccessAlert>Hello</SuccessAlert>
                <DangerousAlert>Hello</DangerousAlert>
            </div>

            <Dialog ref={dialogRef}>
                <h1>Test</h1>
                <form method="dialog">
                    <Button>OK</Button>
                </form>
            </Dialog>
        </>
    );
}
