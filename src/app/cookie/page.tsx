import { useEffect } from 'react';

export default function CookieDeclaration() {
  useEffect(() => {
    // Load the Cookiebot script only when the component mounts
    const script = document.createElement("script");
    script.src = "https://consent.cookiebot.com/86ce1cb4-4338-418c-acca-d54a1b81cccc/cd.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h1>Cookie Declaration</h1>
      <div id="CookieDeclaration" role="dialog" aria-label="Cookiebot Declaration"></div>
    </div>
  );
}
