import type Translations from '~/translation/lang-base';

export default {
    index: {
        'go to view components': '查看组件库',
        'go to login': '去登录',
        'welcome to water-chat': '欢迎来到 WaterChat！',
    },
    login: {
        'welcome to login water-chat': '欢迎登录 WaterChat',
        passport: '账号',
        password: '密码',
        login: '登录',
        'go to register': '去注册',
        'login success': '登录成功！',
    },
    register: {
        'welcome to register water-chat': '欢迎注册 WaterChat',
        passport: '账号',
        email: '邮箱',
        password: '密码',
        register: '注册',
        'register success': '注册成功！',
        'return to login': '返回登录',
    },
} satisfies Translations;
