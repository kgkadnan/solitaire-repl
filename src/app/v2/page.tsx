import React from 'react';
import Form from './form/form';
import { SliderWithInputExample } from '@/components/v2/common/slider-with-min-max/example';
import { MinMaxExample } from '@/components/v2/common/min-max-input/example';
import { FormToggle } from '@/components/v2/common/toggle/example';

const page = () => {
  return (
    <>
      {/* <FormToggle />
      <SliderWithInputExample />
      <MinMaxExample /> */}
      <Form />
    </>
  );
};

export default page;
