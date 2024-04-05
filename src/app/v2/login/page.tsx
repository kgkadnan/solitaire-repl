import { Metadata } from 'next';
import Login from './component/main';

export const metadata: Metadata = {
  title: 'Log in to Your KGK Diamonds Account',
  description:
    'Access your KGK Diamonds account to explore a world of exquisite diamonds and personalized services. Log in now!'
};
export default function MainLogin() {
  return (
    <>
      <Login />
    </>
  );
}
