// AccordionComponent.stories.tsx

import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
  AccordionComponent,
  IAccordionCompProps
} from '@/components/v2/common/accordion';

export default {
  title: 'Components/AccordionComponent',
  component: AccordionComponent
} as Meta;

const Template: Story<IAccordionCompProps> = args => (
  <AccordionComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {
  accordionContent: <div>Accordion Content</div>,
  accordionTrigger: 'Accordion Trigger',
  value: 'default'
};

export const Disabled = Template.bind({});
Disabled.args = {
  accordionContent: <div>Accordion Content</div>,
  accordionTrigger: 'Accordion Trigger',
  value: 'default',
  isDisable: true
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  accordionContent: <div>Accordion Content</div>,
  accordionTrigger: 'Accordion Trigger',
  value: 'default',
  hasError: true
};

export const CustomDefaultValue = Template.bind({});
CustomDefaultValue.args = {
  accordionContent: <div>Accordion Content</div>,
  accordionTrigger: 'Accordion Trigger',
  value: 'default',
  defaultValue: 'customDefault'
};
