import logger from 'logging/log-util';
// import Dashboard from './v2/page';
import { Metadata } from 'next';
import LandingPage from './v3/page';

export const metadata: Metadata = {
  title: 'Buy Diamonds in Few Clicks | KGK Diamonds',
  description:
    'Simplify your diamond buying with KGK Diamonds. where you can manage your diamonds, orders, and preferences seamlessly.'
};
export default function Home() {
  logger.info('test log! pinotest stream from reactjs application.');

  return (
    <>
      <LandingPage />
    </>
  );
}
