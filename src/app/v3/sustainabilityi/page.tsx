'use client';

import MainLayout from '@/components/v3/scroller/main-layout';
import React from 'react';
import Landscape from '@public/v3/sustainability/landscape.png';
import Image from 'next/image';
import DownloadReport from '@public/v3/sustainability/download-report.png';
import Download from '@public/v3/icons/download.svg';
import { handleDownloadReport } from '@/utils/download-sustainability-report';
const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <MainLayout />;
      <div className="relative">
        <Image
          src={Landscape}
          alt="download report background"
          className="w-full "
        />
        <div
          className="absolute left-[38%] top-[15%] w-[350px] flex flex-col gap-2 text-neutral0 cursor-pointer"
          onClick={handleDownloadReport}
        >
          <Image src={DownloadReport} alt="download report" />
          <div className="ml-[25px] mt-[-40px]">
            <p className="text-[20px]">2024 Sustainability Report</p>
            <div className="flex gap-2">
              <p>Download</p>
              <Image src={Download} alt="download" />{' '}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>Read the Latest Sustainability News</p>
      </div>
    </div>
  );
};

export default App;
