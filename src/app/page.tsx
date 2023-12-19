'use client';

import FileAttachements from '@/components/common/file-attachment';

// import { getLogger } from 'logging/log-util';

export default function Home() {
  // const logger = getLogger('home');
  // logger.error('a error message from _app');
  // logger.debug('a debug message from _app');
  // logger.info('a info message from _app');

  return (
    <>
      <h1
        style={{
          fontSize: '100px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '180px'
        }}
      >
        Welcome to KGK live 2.O
      </h1>
      <h1
        style={{
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px'
        }}
      >
        Building Digital Diamond Platform
      </h1>
      <FileAttachements lable="Pan Card" />
    </>
  );
}
