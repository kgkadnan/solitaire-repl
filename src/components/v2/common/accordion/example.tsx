import React from 'react';
import { AccordionComponent } from '.';

const ExampleAccordion = () => {
  return (
    <div>
      {' '}
      <AccordionComponent
        value="shape"
        isDisable={true}
        accordionContent={<>Hello</>}
        accordionTrigger={'shape'}
        hasError={false}
      />
      <AccordionComponent
        value="parameter"
        isDisable={false}
        accordionContent={<>Hello</>}
        accordionTrigger={'parameter'}
        hasError={false}
      />
    </div>
  );
};

export default ExampleAccordion;
