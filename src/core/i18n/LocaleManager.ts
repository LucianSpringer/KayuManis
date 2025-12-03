import { EN_US } from './locales/en';
import { ID_ID } from './locales/id';

type Locale = 'en' | 'id';
type TranslationKey = keyof typeof EN_US;

export class LocaleManager {
    private static instance: LocaleManager;
    private currentLocale: Locale = 'en';
    private dictionary = { en: EN_US, id: ID_ID };

    private constructor() { }

    public static getInstance(): LocaleManager {
        if (!LocaleManager.instance) LocaleManager.instance = new LocaleManager();
        return LocaleManager.instance;
    }

    public setLocale(locale: Locale) {
        this.currentLocale = locale;
    }

    public t(key: string): string {
        const k = key as TranslationKey;
        return this.dictionary[this.currentLocale][k] || key;
    }
}
