import React from 'react';

const SalesIQWidget = () => {
  console.log('called');
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.$zoho = window.$zoho || {};
          window.$zoho.salesiq = window.$zoho.salesiq || {
            widgetcode: 'siq7b5017d0f4306a5933c325124d7b63bc87c3e317b901fc901e55322d5f5b8f6a'
          };
          var d = document;
          s = d.createElement('script');
          s.type = 'text/javascript';
          s.id = 'zsiqscript';
          s.defer = true;
          s.src = 'https://salesiq.zoho.com/widget';
          t = d.getElementsByTagName('script')[0];
          t.parentNode.insertBefore(s, t);
        `
      }}
    />
  );
};

export default SalesIQWidget;
