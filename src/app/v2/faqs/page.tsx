import { Metadata } from 'next';

import FAQs from '.';

export const metadata: Metadata = {
  title: 'KGK - FAQs'
};
export default function MainFaqs() {
  return (
    <>
      <FAQs />
    </>
  );
}
