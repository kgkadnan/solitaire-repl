import React from 'react';

const SideNavigationBar = () => {
  return (
    <div
      style={{
        width: '84px',
        height: '100vh',
        background: '#333',
        position: 'fixed',
        top: '60px',
        overflow: 'hidden',
        zIndex:10
      }}
    >
      {/* Your sidebar content goes here */}
      <div style={{ padding: '16px', color: '#fff', textAlign: 'center' }}>
        <p>Logo</p>
        <p>Item 1</p>
        <p>Item 2</p>
        {/* Add more sidebar items as needed */}
      </div>
    </div>
  );
};

export default SideNavigationBar;
