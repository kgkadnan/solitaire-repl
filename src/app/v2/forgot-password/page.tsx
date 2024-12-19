import { Metadata } from 'next';
import ForgotPassword from '.';

export const metadata: Metadata = {
  title: 'KGK - Forgot Password'
};
export default function MainForgotPassword() {
  return (
    <>
      <ForgotPassword />
    </>
  );
}
