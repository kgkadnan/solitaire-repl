'use client';
import React from 'react';
import Collapsible from './collapsible';
import { Typography } from '@mui/material';
import { useGetAllFaqsQuery } from '@/features/api/faqs';
import ActionButton from '@/components/v2/common/action-button';

const FAQs = () => {
  const { data: faqData } = useGetAllFaqsQuery({});
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div
        className={`bg-cover ml-[-20px] mr-[-16px]  bg-no-repeat flex justify-center flex-col items-center h-[220px] gap-6 w-full rounded-[8px]`}
        style={{
          background: `
                  linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 40%, #FFF4E3 100%)
                `,
          backdropFilter: 'blur(40px)'
        }}
      >
        <div className="flex flex-col gap-3 justify-center text-center ">
          <p className="text-lRegular font-semiBold text-primaryMain">FAQs</p>
          <p className="text-headingXL font-semiBold text-neutral900">
            Frequently Asked Questions
          </p>
        </div>
        <p className="text-headingS text-neutral600">
          Have questions? We’re here to help.
        </p>
      </div>
      <div className="w-[900px] flex flex-col ">
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-4">
            {faqData?.map((faq: any, index: number) => {
              return (
                <div key={index} className="bg-neutral0 ">
                  <Collapsible title={faq?.question}>
                    <Typography>{faq?.answer}</Typography>
                  </Collapsible>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between px-[22px]">
            <div className="flex flex-col">
              <p className="text-neutral900 text-headingS">
                Still have questions?
              </p>
              <p className="text-neutral500 text-lRegular">
                Can’t find the answer you’re looking for? Reach out to our
                friendly team - we're here to help!
              </p>
            </div>
            <div className="flex items-end">
              <a
                href={`mailto:info@kgkdiamonds.com`}
                className="flex gap-2 items-center"
              >
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: 'Email Us Now',
                      handler: () => {}
                    }
                  ]}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
