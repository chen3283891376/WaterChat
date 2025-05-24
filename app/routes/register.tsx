import React, { useState } from 'react';
import { DangerousAlert, FormControl, FormGroup, FormLabel, Frame, LinkButton, SuccessAlert } from '@/wm-ui';
import ToggleThemeButton from '~/components/ToggleThemeButton';
import Translator from '~/translation/translator';

import type { ErrorResponse } from '~/types/base';
import type { RegisterResponse } from '~/types/user';
import type { Route } from './+types/register';

export default function Register() {
    const tr = Translator('register', 'zh');

    const [loginState, setLoginState] = useState('before');
    const [errorMessage, setErrorMessage] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailValue, setEmailValue] = useState('');

    const onClickLogin = async () => {
        const searchParams = new URLSearchParams({
            name: nameValue,
            password: passwordValue,
            email: emailValue,
        });

        const response = await fetch('/api/user/register', {
            method: 'POST',
            body: searchParams.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.ok) {
            const responseData: RegisterResponse = await response.json();
            localStorage.setItem('access_token', responseData.access_token);
            setLoginState('success');
        } else {
            const responseData: ErrorResponse = await response.json();
            setErrorMessage(responseData.message);
            setLoginState('error');
        }
    };

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
                    <div className="m-auto flex h-fit flex-col" style={{ width: '90%', maxWidth: 400, minHeight: 300 }}>
                        <h2 className="mb-2 text-2xl">{tr('welcome to register water-chat')}</h2>

                        <SuccessAlert style={{ display: loginState === 'success' ? 'block' : 'none' }}>
                            {tr('register success')}
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
                                <FormLabel htmlFor="email">{tr('email')}</FormLabel>
                                <FormControl
                                    name="email"
                                    value={emailValue}
                                    onChange={e => setEmailValue(e.target.value)}
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
                                <LinkButton onClick={onClickLogin}>{tr('register')}</LinkButton>
                                <LinkButton onClick={() => (location.href = '/login')}>
                                    {tr('return to login')}
                                </LinkButton>
                            </div>
                        </Frame>
                    </div>
                </div>
            </div>
            <ToggleThemeButton style={{ position: 'absolute', top: 20, right: 20, zIndex: 9 }} />
        </>
    );
}
