'use client';

import { createContext, useEffect, useState } from 'react';

import disableDevtool from 'disable-devtool';

export const SecurityContext = createContext(null);

export default function SecurityProvider({ children }: any) {
  const [devtoolsDisabler, setDevtoolsDisabler] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const result = disableDevtool({
        disableMenu: false
      });
      if (!result.success) {
        console.error(`Failed to Disable Devtools: ${result.reason}`);
      }
      setDevtoolsDisabler(result);
    }
  }, []);

  return (
    <SecurityContext.Provider value={devtoolsDisabler}>
      {children}
    </SecurityContext.Provider>
  );
}
