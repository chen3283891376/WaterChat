import React from 'react';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import type { Route } from './+types/root';
import './styles/app.css';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>WaterChat</title>
            <link rel="icon" href="/watermelon.png" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <meta name="description" content="A chat software looks like water. :D" />
            <meta
                name="theme-color"
                media="(prefers-color-scheme: light)"
                content="#f1f5f9"
            />
            <meta
                name="theme-color"
                media="(prefers-color-scheme: dark)"
                content="#1d293d"
            />
            <script src="/registerSW.js" />
            <link rel="manifest" href="/manifest.json" />
            <Meta />
            <Links />
        </head>
        <body className="text-color-auto" style={{ zoom: '1' }}>
        <div id="app">{children}</div>
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="container mx-auto p-4 pt-16">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full overflow-x-auto p-4">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
