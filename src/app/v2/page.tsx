'use client';
import CopyToShare from '@/components/v2/common/copy-and-share';
import Share from '@/components/v2/common/copy-and-share/share';
import StepperComponent from '@/components/v2/common/stepper';
import React from 'react';

const page = () => {
  return (
    <div>
      Dashboard
      <CopyToShare />
      <Share />
      <StepperComponent/>
    </div>
  );
};

export default page;
