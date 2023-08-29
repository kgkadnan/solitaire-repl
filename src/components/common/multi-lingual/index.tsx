// components/LanguageSwitcher.js
import { useRouter } from 'next/navigation';

function LanguageSwitcher() {
  const router = useRouter();

  const handleLanguageChange = (locale: any) => {
    router.push(`?lang=${locale}`);
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('fr')}>Français</button>
    </div>
  );
}

export default LanguageSwitcher;
