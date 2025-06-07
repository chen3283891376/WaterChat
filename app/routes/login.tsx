import React, { useState } from 'react';
import { DangerousAlert, FormControl, FormGroup, FormLabel, Frame, LinkButton, SuccessAlert } from '@/wm-ui';
import ToggleThemeButton from '~/components/ToggleThemeButton';
import Translator from '~/translation/translator';

import type { ErrorResponse } from '~/types/base';
import type { LoginResponse } from '~/types/user';
import type { Route } from './+types/login';

export default function Login() {
    const tr = Translator('login', 'zh');

    const [loginState, setLoginState] = useState('before');
    const [errorMessage, setErrorMessage] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const onClickLogin = async () => {
        const searchParams = new URLSearchParams({
            name: nameValue,
            password: passwordValue,
        });

        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: searchParams.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.ok) {
            const responseData: LoginResponse = await response.json();
            localStorage.setItem('access_token', responseData.access_token);
            setLoginState('success');

            setTimeout(() => {
                location.href = '/';
            }, 1000);
        } else {
            const responseData: ErrorResponse = await response.json();
            setErrorMessage(responseData.message);
            setLoginState('error');
        }
    };

    return (
        <div className="flex h-full flex-col bg-slate-100 dark:bg-slate-800">
            <div className="drag-area p-2">
                <div className="passport-title-bar flex gap-2">
                    <img src="/watermelon.png" alt="logo" style={{ height: '24px' }} />
                    <div>水瓜聊天</div>
                </div>
            </div>
            <div className="grid h-full grid-cols-1 md:grid-cols-3">
                <div className="drag-area hidden p-10 md:block">
                    <h1 className="text-4xl">
                        <span className="text-green-500">Water</span>
                        <span className="text-blue-500">Chat</span>
                    </h1>
                </div>
                <div className="col-span-2 flex flex-col rounded-t-xl bg-slate-200 md:rounded-tr-none dark:bg-slate-700">
                    <div className="m-auto flex h-fit flex-col" style={{ width: '90%', maxWidth: 400, minHeight: 300 }}>
                        <h2 className="mb-2 text-2xl">{tr('welcome to login water-chat')}</h2>

                        <SuccessAlert style={{ display: loginState === 'success' ? 'block' : 'none' }}>
                            {tr('login success')}
                        </SuccessAlert>
                        <DangerousAlert style={{ display: loginState === 'error' ? 'block' : 'none' }}>
                            {errorMessage}
                        </DangerousAlert>

                        <div className="flex-1">{/* 幽灵 div 实现中间留白 */}</div>

                        <Frame className="flex flex-col gap-2 p-2">
                            <FormGroup>
                                <FormLabel htmlFor="name">{tr('passport')}</FormLabel>
                                <FormControl
                                    name="name"
                                    value={nameValue}
                                    onChange={e => setNameValue(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel htmlFor="password">{tr('password')}</FormLabel>
                                <FormControl
                                    name="password"
                                    type="password"
                                    value={passwordValue}
                                    onChange={e => setPasswordValue(e.target.value)}
                                />
                            </FormGroup>

                            <div className="mx-auto flex gap-4">
                                <LinkButton onClick={onClickLogin}>{tr('login')}</LinkButton>
                                <LinkButton onClick={() => (location.href = '/register')}>
                                    {tr('go to register')}
                                </LinkButton>
                            </div>
                        </Frame>
                    </div>
                </div>
            </div>
            <ToggleThemeButton
                className="no-drag-area"
                style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 9 }}
            />
        </div>
    );
}
