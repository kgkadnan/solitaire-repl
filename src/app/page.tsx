import logger from 'logging/log-util';
import Dashboard from './v2/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Diamonds in Few Clicks | KGK Diamonds',
  description:
    'Simplify your diamond buying with KGK Diamonds. where you can manage your diamonds, orders, and preferences seamlessly.'
};



export default function Home() {
  logger.setLogLevel('debug');

  logger.info('This is an info message');
  return (
    <>
      <Dashboard />
    </>
  );
}
