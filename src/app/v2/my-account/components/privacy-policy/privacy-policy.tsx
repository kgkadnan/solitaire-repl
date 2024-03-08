import { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState<any>();
  useEffect(() => {
    const callAPi = async () => {
      try {
        // Place your async logic here
        const response = await fetch(`${apiURL}public/page/privacy-policy`, {
          headers: {
            Accept: 'text/html'
          }
        });
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
