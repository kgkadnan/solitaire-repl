'use client';
import React, { useEffect } from 'react';
import Collapsible from './collapsible';
import { Skeleton, Typography } from '@mui/material';
import { useGetAllFaqsQuery } from '@/features/api/faqs';
import ActionButton from '@/components/v2/common/action-button';
import {
  Tracking_Dashboard,
  Tracking_Dashboard_Destination_Page
} from '@/constants/funnel-tracking';

const FAQs = () => {
  const { data: faqData } = useGetAllFaqsQuery({});

  const customerData = JSON.parse(localStorage.getItem('user')!);

  useEffect(() => {
    const sourcePage = sessionStorage.getItem('source_page');
    const isSideNavigationBar = JSON.parse(
      sessionStorage.getItem('is_side_navigation_bar') || 'false'
    );

    console.log('sourcePage', sourcePage, isSideNavigationBar);

    const pushToDataLayer = (
      event: string,
      destinationPage: string,
      isSideNavigationBar: boolean
    ) => {
      if (window?.dataLayer) {
        window.dataLayer.push({
          event,
          source_page: sourcePage || 'unknown', // Fallback to 'unknown' if not set
          user_id: customerData?.customer?.id,

          destination_page: destinationPage,
          side_navigation: isSideNavigationBar
        });
        sessionStorage.removeItem('source_page');
        sessionStorage.removeItem('is_side_navigation_bar');
      } else {
        console.error('DataLayer is not defined.');
      }
    };

    if (sourcePage === 'dashboard') {
      pushToDataLayer(
        Tracking_Dashboard.click_faqs,
        Tracking_Dashboard_Destination_Page.faqs,
        isSideNavigationBar
      );
    }
  }, []);

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
        <div className="flex flex-col gap-3 items-center justify-center text-center ">
          {faqData === undefined ? (
            <Skeleton
              variant="rectangular"
              height={'24px'}
              width={'50px'}
              animation="wave"
              className="rounded-[4px]"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
          ) : (
            <p className="text-lRegular font-semiBold text-primaryMain">FAQs</p>
          )}

          {faqData === undefined ? (
            <Skeleton
              variant="rectangular"
              height={'72px'}
              width={'644px'}
              animation="wave"
              className="rounded-[4px]"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
          ) : (
            <p className="text-headingXL font-semiBold text-neutral900">
              Frequently Asked Questions
            </p>
          )}
        </div>
        {faqData === undefined ? (
          <Skeleton
            variant="rectangular"
            height={'30px'}
            width={'347px'}
            animation="wave"
            className="rounded-[4px]"
            sx={{ bgcolor: 'var(--neutral-200)' }}
          />
        ) : (
          <p className="text-headingS text-neutral600">
            Have questions? We’re here to help.
          </p>
        )}
      </div>
      <div className="w-[900px] flex flex-col ">
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-4">
            {faqData !== undefined ? (
              <>
                {faqData?.map((faq: any, index: number) => {
                  return (
                    <div key={index} className="bg-neutral0 ">
                      <Collapsible title={faq?.question}>
                        <Typography>{faq?.answer}</Typography>
                      </Collapsible>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="border-b-[2px] border-[#E4E7EC] px-[22px] py-[9px]">
                  <div className="flex items-center cursor-pointer justify-between min-h-[76px]">
                    <div>
                      <Skeleton
                        variant="rectangular"
                        height={'24px'}
                        width={'500px'}
                        animation="wave"
                        className="rounded-[4px]"
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                      />
                    </div>
                    <div>
                      {' '}
                      <Skeleton
                        variant="rectangular"
                        height={'40px'}
                        width={'40px'}
                        animation="wave"
                        className="rounded-[4px]"
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="border-b-[2px] border-[#E4E7EC] px-[22px] py-[9px]">
                  <div className="flex items-center cursor-pointer justify-between min-h-[76px]">
                    <div>
                      <Skeleton
                        variant="rectangular"
                        height={'24px'}
                        width={'500px'}
                        animation="wave"
                        className="rounded-[4px]"
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                      />
                    </div>
                    <div>
                      {' '}
                      <Skeleton
                        variant="rectangular"
                        height={'40px'}
                        width={'40px'}
                        animation="wave"
                        className="rounded-[4px]"
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="border-b-[2px] border-[#E4E7EC] px-[22px] py-[9px]">
                  <div className="flex items-center cursor-pointer justify-between min-h-[76px]">
                    <div>
                      <Skeleton
                        variant="rectangular"
                        height={'24px'}
                        width={'500px'}
                        animation="wave"
                        className="rounded-[4px]"
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                      />
                    </div>
                    <div>
                      {' '}
                      <Skeleton
                        variant="rectangular"
                        height={'40px'}
                        width={'40px'}
                        animation="wave"
                        className="rounded-[4px]"
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {/*  */}
          </div>
          <div className="flex justify-between px-[22px]">
            {faqData === undefined ? (
              <div className="flex flex-col gap-1">
                <Skeleton
                  variant="rectangular"
                  height={'30px'}
                  width={'100px'}
                  animation="wave"
                  className="rounded-[4px]"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                />
                <Skeleton
                  variant="rectangular"
                  height={'30px'}
                  width={'697px'}
                  animation="wave"
                  className="rounded-[4px]"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="text-neutral900 text-headingS">
                  Still have questions?
                </p>
                <p className="text-neutral500 text-lRegular">
                  Can’t find the answer you’re looking for? Reach out to our
                  friendly team - we're here to help!
                </p>
              </div>
            )}

            <div className="flex items-end">
              {faqData === undefined ? (
                <Skeleton
                  variant="rectangular"
                  height={'40px'}
                  width={'126px'}
                  animation="wave"
                  className="rounded-[4px]"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                />
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
