'use client';
import { useEffect } from 'react';

export default function CookieDeclaration() {
  useEffect(() => {
    // Load the Cookiebot script only when the component mounts
    const script = document.createElement('script');
    script.src =
      'https://consent.cookiebot.com/86ce1cb4-4338-418c-acca-d54a1b81cccc/cd.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }, []);

  return (
    <div className=" max-w-4xl mx-auto flex flex-col gap-[16px] mt-[16px] commonStyle">
      <div className="flex w-full items-center flex-col">
        <h1 className="text-headingS font-medium text-neutral-900">
          Cookie Declaration
        </h1>
        <div
          id="CookieDeclaration"
          role="dialog"
          aria-label="Cookiebot Declaration"
        ></div>
      </div>
    </div>
  );
}
