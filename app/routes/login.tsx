import React from 'react';
import { FormControl, FormGroup, FormLabel, Frame, LinkButton } from '@/wm-ui';
import ToggleThemeButton from '~/components/ToggleThemeButton';
import Translator from '~/translation/translator';
import type { Route } from './+types/login';

export default function Login() {
    const tr = Translator('login', 'zh');

    return (
        <>
            <div className="grid h-full grid-cols-1 md:grid-cols-2">
                <div className="hidden bg-slate-200 p-10 md:block dark:bg-slate-700">
                    <h1 className="text-4xl">
                        <span className="text-green-500">Water</span>
                        <span className="text-blue-500">Chat</span>
                    </h1>
                </div>
                <div className="flex flex-col">
                    <div
                        className="m-auto flex h-fit flex-col justify-between"
                        style={{ width: '90%', maxWidth: 400, minHeight: 300 }}
                    >
                        <h2 className="mb-2 text-2xl">{tr('welcome to login water-chat')}</h2>

                        <Frame className="flex flex-col gap-2 p-2">
                            <FormGroup>
                                <FormLabel htmlFor="name">{tr('passport')}</FormLabel>
                                <FormControl name="name" />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="password">{tr('password')}</FormLabel>
                                <FormControl name="password" type="password" />
                            </FormGroup>

                            <div className="mx-auto flex gap-4">
                                <LinkButton>{tr('login')}</LinkButton>
                                <LinkButton>{tr('go to register')}</LinkButton>
                            </div>
                        </Frame>
                    </div>
                </div>
            </div>
            <ToggleThemeButton style={{ position: 'absolute', top: 20, right: 20, zIndex: 9 }} />
        </>
    );
}
