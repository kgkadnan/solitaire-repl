'use client';
import CopyToShare from '@/components/v2/common/copy-and-share';
import Share from '@/components/v2/common/copy-and-share/share';
import React from 'react';

const page = () => {
  return (
    <div>
      Dashboard
      <CopyToShare />
      <Share
        products={[
          { stockNo: 1, shape: 'BR' },
          { stockNo: 2, shape: 'PR' }
        ]}
      />
    </div>
  );
};

export default page;
