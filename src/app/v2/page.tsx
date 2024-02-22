'use client';
import CopyToShare from '@/components/v2/common/copy-and-share';
import Share from '@/components/v2/common/copy-and-share/share';
import React from 'react';

const page = () => {
  return (
    <div>
      Dashboard
      <CopyToShare />
      <Share />
    </div>
  );
};

export default page;
