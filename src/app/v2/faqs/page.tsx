'use client';
import React from 'react';
import Collapsible from './collapsible';
import { Typography } from '@mui/material';
import { useGetAllFaqsQuery } from '@/features/api/faqs';

const FAQs = () => {
  const { data: faqData } = useGetAllFaqsQuery({});
  return (
    <div>
      <div
        className={`bg-cover ml-[-20px] mr-[-16px]  bg-no-repeat flex justify-center flex-col items-center h-[220px] gap-5`}
        style={{
          background: `
                  linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 50%)
                `,
          backdropFilter: 'blur(40px)'
        }}
      >
        <p>FaQs</p>
        <p>Frequently Asked Questions</p>
      </div>
      <div>
        {faqData.map((faq: any, index: number) => {
          return (
            <div key={index}>
              <Collapsible title={faq?.question}>
                <Typography>{faq?.answer}</Typography>
              </Collapsible>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
