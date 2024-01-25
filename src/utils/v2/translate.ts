import en from '../../locales/en/v2/common.json';
import fr from '../../locales/fr/v2/common.json';

interface ITranslations {
  en: Record<string, string>;
  fr: Record<string, string>;
}

const computeTransalation = (key: string, locale: string) => {
  let translations: string;
  const allTranslations: ITranslations = {
    en,
    fr
  };

  if (locale === 'en') {
    translations = allTranslations.en[key] || key;
  } else if (locale === 'fr') {
    translations = allTranslations.fr[key] || key;
  } else {
    translations = key;
  }

  return translations;
};

export function ManageLocales(key: string, locale?: string) {
  return computeTransalation(key, locale || 'en');
}
