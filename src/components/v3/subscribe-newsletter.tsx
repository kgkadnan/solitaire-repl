'use client';
import React, { useState } from 'react';
import { CommonButton } from './button';
import { InputField } from './input/input';
import { useToast } from './ui/use-toast';
import { isEmailValid } from '@/utils/validate-email';
import { newsletterSubscribe } from '@/features/v3/api/newsletter-subscribe';

const SubscribeNewsLetter = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const { toast } = useToast();

  const handleSubscribe = () => {
    let isValid = true;
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isEmailValid(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (isValid) {
      newsletterSubscribe(email).then(_res => {
        setEmail('');
        toast({
          description: 'Newsletter Subscribed'
        });
      });
    }
  };
  return (
    <div className="flex w-full px-[112px] bg-[#F9FAFB] justify-between items-center py-4">
      <div className="flex flex-col gap-2">
        <p className="text-neutral900 text-[30px] font-bold">
          Join 2,000+ subscribers
        </p>
        <p className="text-neutral700 text-headingS">
          Stay in the loop with everything you need to know.
        </p>
      </div>
      <div className="flex gap-4 items-center">
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
      </div>
    </div>
  );
};

export default SubscribeNewsLetter;
