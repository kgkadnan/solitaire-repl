'use client';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { ManageLocales } from '@/utils/v2/translate';
import { useEffect, useState } from 'react';
import './common-style.css';
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
    <>
      {data ? (
        <>
          <div className=" max-w-4xl mx-auto flex flex-col gap-[16px] mt-[16px] commonStyle">
            <div className="flex w-full items-center flex-col">
              <h1 className="text-headingS font-medium text-neutral-900">
                {' '}
                {ManageLocales('app.myAccount.tabs.privacyPolicy')}
              </h1>
              <div
                dangerouslySetInnerHTML={{ __html: styling + data }}
                className="text-neutral-900"
              />
            </div>
          </div>
        </>
      ) : (
        <CustomKGKLoader />
      )}
    </>
  );
};

export default PrivacyPolicy;
