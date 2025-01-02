import { Metadata } from 'next';
import Register from './component/main';

export const metadata: Metadata = {
  title: 'KGK - Register'
};
export default function MainRegister() {
  return (
    <>
      <Register />
    </>
  );
}
