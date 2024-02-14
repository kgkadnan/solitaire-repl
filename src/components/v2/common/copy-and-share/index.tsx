import React, { useState } from 'react';

const CopyToShare = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div>
      <button onClick={() => copyToClipboard('Text to copy')}>
        Copy to Clipboard
      </button>
      {copied && <span style={{ marginLeft: '0.5em' }}>Copied!</span>}
    </div>
  );
};

export default CopyToShare;
