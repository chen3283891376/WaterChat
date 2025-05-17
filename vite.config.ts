import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig({
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'app'),
        },
    },
    server: {
        host: '127.0.0.1',
        port: 8991,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5000/',
                changeOrigin: true,
            },
        },
    },
});
