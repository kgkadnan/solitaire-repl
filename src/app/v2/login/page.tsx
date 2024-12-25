import { Metadata } from 'next';
import Login from './component/main';

export const metadata: Metadata = {
  title: 'KGK - Login'
};
export default function MainLogin() {
  return (
    <>
      <Login />
    </>
  );
}
