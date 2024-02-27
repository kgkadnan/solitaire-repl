import React from 'react';

export const Toast = ({ message, show }: any) => {
  // Dismiss the toast after 3 seconds

  if (!show) return null;

  return (
    <div className="fixed  w-[320px] bottom-[4px] left-1/2 transform -translate-x-1/2 bg-successSurface border-[1px] border-successBorder rounded-[8px] shadow-md text-mMedium medium p-4">
      {message}
    </div>
  );
};
