import { ManageLocales } from '@/utils/v2/translate';
import { useEffect, useState } from 'react';
import '../../../../privacy-policy/common-style.css';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';

const PrivacyPolicy = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState<any>();
  useEffect(() => {
    setIsloading(true);
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
        setIsloading(false);
      } catch (error) {
        // Handle any errors
        setIsloading(false);
        console.error('Error fetching data:', error);
      }
    };
    callAPi();
  }, []);
  let styling = `<style>
  .statiContentBox {
  div {
  all: revert;
  }
  h1 {
  all: revert;
  }
  h2 {
  all: revert;
  }
  h3 {
  all: revert;
  }
  h4 {
  all: revert;
  }
  h5 {
  all: revert;
  }
  h6 {
  all: revert;
  }
  p {
  all: revert;
  }
  ul {
  all: revert;
  padding-left: 15px;
  }
  ol {
  all: revert;
  }
  li {
  all: revert;
  }
  a {
  all: revert;
  }
  span {
  all: revert;
  }
  img {
  all: revert;
  }
  button {
  all: revert;
  }
  input {
  all: revert;
  }
  textarea {
  all: revert;
  }
  form {
  all: revert;
  }
  }
  </style>`;
  return (
    <div className="commonStyle">
      {isLoading && <CustomKGKLoader />}
      {data && (
        <>
          <h1 className="text-headingS font-medium text-neutral-900 my-3">
            {ManageLocales('app.myAccount.tabs.privacyPolicy')}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: styling + data }}
            className="text-neutral-900"
          />
        </>
      )}
    </div>
  );
};

export default PrivacyPolicy;
