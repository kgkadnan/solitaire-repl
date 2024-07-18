import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
import '../../../../privacy-policy/common-style.css';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';

const TermAndCondtions = () => {
  const [activeTab, setActiveTab] = useState<string>('KGK Website');
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState<any>();
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const handleTabs = async ({ tab, url }: { tab: string; url: string }) => {
    setIsloading(true);
    setActiveTab(tab);
    try {
      // Place your async logic here
      const response = await fetch(`${apiURL}public/page/${url}`, {
        headers: {
          Accept: 'text/html'
        }
      });
      setIsloading(false);
      const data = await response.text();
      setData(data);
    } catch (error) {
      // Handle any errors
      setIsloading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setIsloading(true);
    const callAPi = async () => {
      try {
        // Place your async logic here
        const response = await fetch(
          `${apiURL}public/page/terms-and-condition-kgk-website`,
          {
            headers: {
              Accept: 'text/html'
            }
          }
        );
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

  const renderCotent = () => {
    switch (activeTab) {
      case 'KGK Website':
        return (
          <>
            {data && (
              <div
                dangerouslySetInnerHTML={{ __html: styling + data }}
                className="text-neutral-900"
              />
            )}
          </>
        );

      case 'KGK Diamonds BV':
        return (
          <>
            {data && (
              <div
                dangerouslySetInnerHTML={{ __html: styling + data }}
                className="text-neutral-900"
              />
            )}
          </>
        );

      case 'SPV T&C':
        return (
          <>
            {data && (
              <div
                dangerouslySetInnerHTML={{ __html: styling + data }}
                className="text-neutral-900"
              />
            )}
          </>
        );
    }
  };

  return (
    <div className="flex flex-col gap-[16px] mt-[16px] commonStyle">
      {isLoading && <CustomKGKLoader />}
      <h1 className="text-headingS font-medium text-neutral-900">
        {ManageLocales('app.myAccount.tabs.termsAndConditions')}
      </h1>

      <div className="flex flex-col gap-[16px]">
        <div className="rounded-[8px]  w-[385px]">
          <button
            className={`px-[16px] py-[8px] rounded-l-[8px] ${
              activeTab === 'KGK Website'
                ? ' border-[1px] border-primaryMain bg-primaryMain text-neutral25'
                : 'text-neutral600 border-[1px] border-neutral-200'
            }`}
            key={'KGK Website'}
            onClick={() =>
              handleTabs({
                tab: 'KGK Website',
                url: 'terms-and-condition-kgk-website'
              })
            }
          >
            {'KGK Website'}
          </button>
          <button
            className={`px-[16px] py-[8px] ${
              activeTab === 'KGK Diamonds BV'
                ? ' border-[1px] border-primaryMain bg-primaryMain text-neutral25'
                : 'text-neutral600 border-[1px] border-neutral-200'
            }`}
            key={'KGK Diamonds BV'}
            onClick={() =>
              handleTabs({
                tab: 'KGK Diamonds BV',
                url: 'terms-and-condition-kgk-diamonds-bv'
              })
            }
          >
            {'KGK Diamonds BV'}
          </button>
          <button
            className={`px-[16px] py-[8px] rounded-r-[8px] ${
              activeTab === 'SPV T&C'
                ? ' border-[1px] border-primaryMain bg-primaryMain text-neutral25'
                : 'text-neutral600 border-[1px] border-neutral-200'
            }`}
            key={'SPV T&C'}
            onClick={() =>
              handleTabs({
                tab: 'SPV T&C',
                url: 'terms-and-condition-spv-term-and-condition'
              })
            }
          >
            {'SPV T&C'}
          </button>
        </div>

        <div>{renderCotent()}</div>
      </div>
    </div>
  );
};

export default TermAndCondtions;
