'use client';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Dialog, DialogContent } from '../../ui/dialog';
import appDownload from '@public/app-download.svg';
import Image from 'next/image';
import playStore from '@public/play-store.svg';

const AppDownloadPopup = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  if (!isMobile) return null;

  return (
    <div className="app-download-popup">
      {/* Your popup content here */}

      <Dialog open={true} defaultOpen={true}>
        <DialogContent
          className={`max-w-[80%] min-h-[222px] bg-neutral25 max-h-[90%] flex flex-col overflow-y-auto  !rounded-[8px] p-[24px] items-center`}
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
            <Image alt="app-download" src={appDownload} />
            <a
              href="https://play.google.com/store/apps/details?id=com.kgk.diamonds"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={playStore} alt="Download on Google Play" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
      {/* Add your download links */}
    </div>
  );
};

export default AppDownloadPopup;
