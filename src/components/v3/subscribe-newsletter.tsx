'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import RegisterNow from '@public/v3/home/register-now.svg';
import ShimmerButton from './animated-button';

// import ShimmerButton from './animated-button';
// import { InputField } from './input/input';
// import { useToast } from './ui/use-toast';
// import { isEmailValid } from '@/utils/validate-email';
// import { newsletterSubscribe } from '@/features/v3/api/newsletter-subscribe';

const SubscribeNewsLetter = () => {
  const router = useRouter();

  // const [email, setEmail] = useState<string>('');
  // const [emailError, setEmailError] = useState<string>('');
  // const { toast } = useToast();

  // const handleSubscribe = () => {
  //   let isValid = true;
  //   if (!email) {
  //     setEmailError('Email is required');
  //     isValid = false;
  //   } else if (!isEmailValid(email)) {
  //     setEmailError('Invalid email address');
  //     isValid = false;
  //   } else {
  //     setEmailError('');
  //   }
  //   if (isValid) {
  //     newsletterSubscribe(email).then(_res => {
  //       setEmail('');
  //       toast({
  //         description: 'Newsletter Subscribed'
  //       });
  //     });
  //   }
  // };
  return (
    <div className="flex w-full xl:px-[112px] lg:px-[32px] bg-[#F9FAFB] justify-between items-center py-4">
      <div className="flex flex-col gap-2">
        <p className="text-neutral900 text-[30px] font-bold">
          Haven't registered yet?
        </p>
        <p className="text-neutral700 text-headingS">
          Elevate Your Diamond Buying Experience with KGK Diamonds!{' '}
        </p>
      </div>
      {/* <div className="flex gap-4 items-center">
        <InputField
          label=""
          onChange={event => setEmail(event.target.value)}
          type="email"
          name="email"
          value={email}
          errorText={emailError}
          placeholder={'Enter your email'}
          styles={{
            inputMain: ' !w-[360px] mt-1',
            input: '!w-[360px] h-[48px]'
          }}
          autoComplete="none"
        />
        <CommonButton
          onClick={handleSubscribe}
          variant={'primary'}
          size={'custom'}
          className="rounded-[8px] w-[120px] h-[48px]"
        >
          Subscribe
        </CommonButton>
      </div> */}
      {/* <div className="mb-[-30px]">
        <Image
          src={RegisterNow}
          alt="register now"
          onClick={() => router.push('/v2/register')}
          className="cursor-pointer"
        />
      </div> */}
      <ShimmerButton
        className="!rounded-[8px] w-[200px] h-[44px]"
        onClick={() => router.push('/v2/register')}
      >
        Register Now
      </ShimmerButton>
    </div>
  );
};

export default SubscribeNewsLetter;
