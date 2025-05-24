import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/index.tsx'),
    route('components', 'routes/components.tsx'),
    route('login', 'routes/login.tsx'),
    route('register', 'routes/register.tsx'),
] satisfies RouteConfig;
