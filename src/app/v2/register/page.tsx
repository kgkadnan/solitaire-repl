import { Metadata } from 'next';
import Register from './component/main';

export const metadata: Metadata = {
  title: 'Register for Exclusive Access | KGK Diamonds',
  description:
    'Sign up to unlock exclusive features and benefits at KGK Diamonds, a trusted name in the diamond industry since 1905. Join today!'
};
export default function MainRegister() {
  return (
    <>
      <Register />
    </>
  );
}
