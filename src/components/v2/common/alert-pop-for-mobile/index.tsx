'use client';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dialog, DialogContent } from '../../ui/dialog';
import appDownload from '@public/app-download.png';
import Image from 'next/image';
import playStore from '@public/play-store.svg';
import appleStore from '@public/apple-store.svg';

const AppDownloadPopup = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  if (!isMobile) return null;

  return (
    <>
      {/* Your popup content here */}

      <Dialog open={true} defaultOpen={true}>
        <DialogContent
          className={`max-w-[100%] min-h-[100%] bg-neutral25 max-h-[90%] flex flex-col overflow-y-auto align-center justify-center  p-[24px] items-center z-[999999]`}
          style={{
            background:
              'linear-gradient(135deg, #DBF2FC 0%, #E8E8FF 30%, #FFF4E3 100%)'
          }}
        >
          <div className="flex flex-col items-center justify-center text-center gap-2 max-w-[350px] min-w-[250px]">
            <p className="text-primaryPressed text-headingM font-semibold leading-[30px] w-[250px]">
              Search on the go, at your speed.
            </p>
            <p className="text-neutral700 medium text-mMedium min-w-[250px]">
              Redefines the B2B diamond buy process with intuitive design and
              seamless functionality
            </p>
            <Image
              alt="app-download"
              src={appDownload}
              height={400}
              width={196}
            />
            <div className="flex">
              <a
                href="https://play.google.com/store/apps/details?id=com.kgk.diamonds"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={playStore} alt="Download on Google Play" />
              </a>
              <a
                href="https://apps.apple.com/us/app/kgk-diamond/id6479595403"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2"
              >
                <Image src={appleStore} alt="Download on Apple Store" />
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Add your download links */}
    </>
  );
};

export default AppDownloadPopup;
