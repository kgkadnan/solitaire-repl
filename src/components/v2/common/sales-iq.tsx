// import React from 'react';

// const SalesIQWidget = () => {
//   console.log('called');
//   return (
//     <script
//       dangerouslySetInnerHTML={{
//         __html: `
//           window.$zoho = window.$zoho || {};
//           window.$zoho.salesiq = window.$zoho.salesiq || {
//             widgetcode: 'siq7b5017d0f4306a5933c325124d7b63bc87c3e317b901fc901e55322d5f5b8f6a'
//           };
//           var d = document;
//           s = d.createElement('script');
//           s.type = 'text/javascript';
//           s.id = 'zsiqscript';
//           s.defer = true;
//           s.src = 'https://salesiq.zoho.com/widget';
//           t = d.getElementsByTagName('script')[0];
//           t.parentNode.insertBefore(s, t);
//         `
//       }}
//     />
//   );
// };

// export default SalesIQWidget;

import React from 'react';
import Script from 'next/script';

export default class Salesiq extends React.Component {
  hasCode: any;
  constructor(props: any) {
    super(props);
    this.hasCode = props.hasOwnProperty('widgetCode');
  }

  render() {
    return (
      <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                    var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode:"siq7b5017d0f4306a5933c325124d7b63bc87c3e317b901fc901e55322d5f5b8f6a", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.com/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
                `
        }}
      />
    );
  }
}
