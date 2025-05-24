import type Translations from '~/translation/lang-base';

import langEn from '~/translation/lang-en';
import langZh from '~/translation/lang-zh';

export type Languages = 'zh' | 'en';
const LanguagesMap: { [languages in Languages]: Translations } = {
    zh: langZh,
    en: langEn,
};

export type PageNames = keyof Translations;

export default function Translator<T extends PageNames>(pageName: T, lang: Languages) {
    const translate = function (message: keyof Translations[T]) {
        return translate.messages[message];
    };
    translate.pageName = pageName;
    translate.lang = lang;
    translate.messages = LanguagesMap[lang][pageName];
    return translate;
}
