'use client';

import logger from 'logging/log-util';
import Dashboard from './v2/page';

export default function Home() {
  logger.info('test log! pinotest stream from reactjs application.');

  return (
    <>
      <Dashboard />
    </>
  );
}
