import { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const callAPi = async () => {
      try {
        // Place your async logic here
        const response = await fetch(
          'https://medusa-test.kgkit.net/public/page/privacy-policy',
          {
            headers: {
              Accept: 'text/html'
            }
          }
        );
        const data = await response.text();
        setData(data);
      } catch (error) {
        // Handle any errors
        console.error('Error fetching data:', error);
      }
    };
    callAPi();
  }, []);
  return (
    <>
      {data && (
        <div
          dangerouslySetInnerHTML={{ __html: data }}
          className="text-neutral-900"
        />
      )}
    </>
  );
};

export default PrivacyPolicy;
