import React from 'react';
import Form from './form/form';
import TopNavigationBar from '@/components/v2/common/top-navigation-bar';
import SideNavigationBar from '@/components/v2/common/side-navigation-bar';

const page = () => {
  return (
   
    <>
      <div>
        {/* <TopNavigationBar /> */}
        <div className='flex gap-[32px] l-[100px]'>
          
          {/* <SideNavigationBar /> */}
          <Form />
         
        </div>
      </div>
    </>
  );
};

export default page;
