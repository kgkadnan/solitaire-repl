import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import FAQs from '@/app/v2/faqs/page';

const store = setupStore();

export default {
  title: 'Modules/FAQs/FAQs',
  component: FAQs,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ]
} as ComponentMeta<typeof FAQs>;

const Template: ComponentStory<typeof FAQs> = _args => <FAQs />;

export const faqs = Template.bind({});
faqs.args = {};
