import React, { useEffect, useState } from 'react';
import { useLazyGetPublicDataQuery } from '@/features/api/public';

const TermAndCondtions = () => {
  const [activeTab, setActiveTab] = useState<string>('KGK Website');
  const [tiriggerPublicData] = useLazyGetPublicDataQuery({});

  const handleTabs = ({ tab, url }: { tab: string; url: string }) => {
    setActiveTab(tab);
    tiriggerPublicData({ query: url }).then(res => {
      console.log(res);
      setData(data);
    });
  };

  const [data, setData] = useState();

  useEffect(() => {
    tiriggerPublicData({ query: 'terms-and-condition-kgk-website' })
      .unwrap()
      .then(res => {
        console.log(res);
        setData(data);
      });
  }, []);

  const renderCotent = () => {
    switch (activeTab) {
      case 'KGK Website':
        return <>{data}</>;

      case 'KGK Diamonds BV':
        return <>{data}</>;

      case 'SPV T&C':
        return <>{data}</>;
    }
  };

  return (
    <div className="flex flex-col gap-[16px] mt-[16px]">
      <h1 className="text-headingS font-medium text-neutral-900">
        Terms and Conditions
      </h1>

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
  );
};

export default TermAndCondtions;
