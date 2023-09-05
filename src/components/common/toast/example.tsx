import React, { useState } from 'react';
import { CustomToast } from '.';

const ToastExample = () => {
  const [showToast, setShowToast] = useState<any>(['false']);
  return (
    <>
      <button
        onClick={() => {
          setShowToast(!showToast);
        }}
      >
        click
      </button>
      {showToast.length > 0 && <CustomToast message="test" />}
      <CustomToast message="testss" />
      <CustomToast message="test" />
    </>
  );
};

export default ToastExample;
