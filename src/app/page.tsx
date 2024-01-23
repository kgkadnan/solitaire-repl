'use client';

import logger from 'logging/log-util';

export default function Home() {
  logger.info('test log! pinotest stream from reactjs application.');

  return (
    <>
      {' '}
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
    </>
  );
}
