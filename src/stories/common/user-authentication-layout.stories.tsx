import React from 'react';
import { Story, Meta } from '@storybook/react';
import UserAuthenticationLayout, {
  IUserAuthenticationLayoutProps
} from '@/components/v2/common/user-authentication-layout';

// This is the metadata for your story
export default {
  title: 'Components/UserAuthenticationLayout',
  component: UserAuthenticationLayout
} as Meta;

// This is the template for your story
const Template: Story<IUserAuthenticationLayoutProps> = args => (
  <UserAuthenticationLayout {...args} />
);

// This is the default story
export const Default = Template.bind({});
Default.args = {
  formData: (
    <div>
      {/* Insert your form component or any other content here */}
      <p>Insert your form component here</p>
    </div>
  ),
  screen: 'default'
};
