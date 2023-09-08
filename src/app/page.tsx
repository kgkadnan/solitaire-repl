'use client';

import LanguageSwitcher from '@/components/common/multi-lingual';
import ToastExample from '@/components/common/toast/example';
import TooltipExample from '@/components/common/tooltip/example';
import { ManageLocales } from '@/utils/translate';

export default function Home() {
  return (
    <>
      <h1
        style={{
          fontSize: '100px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '180px',
        }}
      >
        Welcome to KGK live 2.O
      </h1>
      <h1
        style={{
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        Bulding Digital diamond platform
      </h1>
      <h1>{ManageLocales('app.welcome')}</h1>
      <LanguageSwitcher />
    </>
  );
}
