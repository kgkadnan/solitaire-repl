import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CopyToShare from '@/components/v2/common/copy-and-share';

export default {
  title: 'Components/CopyToShare',
  component: CopyToShare
} as Meta;

const Template: Story = () => <CopyToShare />;

export const Default = Template.bind({});

// Adding an action log for the copy operation
const TemplateWithAction: Story = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      action('Copied to clipboard')(text);
    } catch (err) {
      console.error('Failed to copy:', err);
      action('Failed to copy')(err);
    }
  };

  return (
    <div>
      <button onClick={() => copyToClipboard('This is storybook')}>
        Copy to Clipboard
      </button>
      {copied && <span style={{ marginLeft: '0.5em' }}>Copied!</span>}
    </div>
  );
};

export const WithAction = TemplateWithAction.bind({});
