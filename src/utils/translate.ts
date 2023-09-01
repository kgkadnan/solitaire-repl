// import en from '../locales/en/common.json';
// import fr from '../locales/fr/common.json';
// import { useSearchParams } from 'next/navigation';

// export function ManageLocales(key: string) {
//   const searchParams = useSearchParams();
//   const languageCode = searchParams.get('lang');

//   const locale: string = languageCode || 'en';
//   const translations: any = {
//     en,
//     fr,
//   };
//   return translations[locale][key] || key;
// }


import { useSelector } from 'react-redux';
import en from '../locales/en/common.json';
import fr from '../locales/fr/common.json';

export function ManageLocales(key: string) {
  // const locale:string = useSelector((state:any) => state.language?.selectedLanguage) || 'en';
  const locale: string =   'en';

  const translations: any = {
    en,
    fr,
  };
  return translations[locale][key] || key;
}
