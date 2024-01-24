import { AccordionComponent } from '@/components/v2/common/accordion';
import React from 'react';

export const Parameters = () => {
  return (
    <div id="Parameters">
      <AccordionComponent
        value="Parameters"
        isDisable={false}
        accordionContent={<>Hello</>}
        accordionTrigger={'Parameters'}
        hasError={false}
      />
    </div>
  );
};
