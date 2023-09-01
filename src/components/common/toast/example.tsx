import React, { useState } from 'react';
import { CustomToast } from '.';

const ToastExample = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => {
          setShowToast(!showToast);
        }}
      >
        click
      </button>
      {showToast && <CustomToast message="test" />}
    </>
  );
};

export default ToastExample;
