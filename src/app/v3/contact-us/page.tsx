'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import Phone from '@public/v3/contact/phone.svg';
import Mail from '@public/v3/contact/mail.svg';
import Copy from '@public/v3/contact/copy.svg';

import dynamic from 'next/dynamic';
import { useToast } from '@/components/v3/ui/use-toast';
import { isEmailValid } from '@/utils/validate-email';
import { isPhoneNumberValid } from '@/utils/validate-phone';
import { createContactUsEntry } from '@/features/v3/api/contact-us';
import LocationTab from '@/components/v3/location-tab';
import { HeadquaterLocation } from '@/constants/v3/headquater-location';
import { InputField } from '@/components/v3/input/input';
import { MobileInput } from '@/components/v3/input/mobile-input';
import { CommonButton } from '@/components/v3/button';
const WorldMap = dynamic(() => import('../../../components/v3/world-map'), {
  ssr: false
});
const LocateUs = dynamic(() => import('../../../components/v3/locate-us'), {
  ssr: false
});
const ContactUs = () => {
  const [selectedRegion, setSelectedRegion] = useState('ASIA PACIFIC');
  const { toast } = useToast();

  // const locations = [
  //   { position: { lat: 51.505, lng: -0.09 }, name: 'Location 1' },
  //   { position: { lat: 51.515, lng: -0.1 }, name: 'Location 2' },
  //   { position: { lat: 51.525, lng: -0.11 }, name: 'Location 3' }
  // ];
  // const locateUs = [
  //   { position: { lat: 51.505, lng: -0.09 }, name: 'Location 1' }
  // ];

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<{
    iso: string;
    countryCode: string;
    phone: string;
  }>({ iso: 'IN', countryCode: '91', phone: '' });
  const [message, setMessage] = useState<string>('');

  const [firstNameError, setFirstNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleSend = () => {
    let isValid = true;

    if (!firstName) {
      setFirstNameError('First name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      setLastNameError('Last name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!isEmailValid(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (phoneNumber.phone && !isPhoneNumberValid(phoneNumber.phone)) {
      setPhoneNumberError('Invalid phone number');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    if (isValid) {
      // Handle the form submission
      createContactUsEntry(
        firstName,
        lastName,
        email,
        `${phoneNumber.countryCode}-${phoneNumber.phone}`,
        message
      ).then(_res => {
        toast({
          description: 'Form sent successfully'
        });
        // Reset the form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber(prev => ({ ...prev, phone: '' }));
        setMessage('');
      });
    }
  };
  return (
    <div>
      <div className="min-h-[300px] flex items-center px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
        <div className="min-h-[300px] flex items-center px-[112px]">
          <div className="flex flex-wrap min-h-[160px] gap-[24px] justify-between">
            <div className="w-[600px] text-neutral900 text-headingXL font-bold">
              We’d love to hear from you
            </div>
            <div className="flex gap-3 flex-col w-[600px]">
              <p className="text-neutral900 text-headingS font-bold">
                We're Here to Assist You
              </p>
              <p className="text-neutral800 text-lRegular">
                At KGK Diamonds, we value your feedback and inquiries. Whether
                you have a question, need assistance, or want to learn more
                about our services, our dedicated team is here to help. Please
                feel free to reach out to us through any of the provided contact
                methods, and we will respond promptly to ensure your
                satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-h-[400px] px-[112px]">
        <WorldMap />
      </div>
      <div className="bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
        <div className="flex flex-col gap-1 py-[32px] gap-[64px]  px-[112px]">
          <div className="flex justify-center">
            <LocationTab
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
            />
          </div>
          <div className="flex ">
            <div className="w-[30%]">
              <p className="text-neutral800 text-lRegular font-semiBold">
                Our location
              </p>
              <p className="text-neutral900 text-headingL font-semiBold">
                Head Office{' '}
              </p>
            </div>
            <div
              className={`w-[70%]  flex flex-wrap flex-col gap-4 ${
                selectedRegion === 'ASIA PACIFIC'
                  ? 'max-h-[780px]'
                  : 'max-h-[150px]'
              }`}
            >
              {HeadquaterLocation.filter(
                (loc: any) => loc.region === selectedRegion
              )[0].location.map((loc: any) => (
                <div className="flex flex-col gap-[6px]" key={loc.country}>
                  <div className="flex gap-3">
                    <Image src={loc.flag} alt={loc.country} />

                    <p className="font-semiBold text-headingS text-neutral600">
                      {loc.country}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {' '}
                    <Image src={loc.image} alt={loc.name} />
                    <div className="flex flex-col justify-center">
                      {' '}
                      <p className="text-mMedium font-semiBold text-neutral600">
                        {loc.name}
                      </p>{' '}
                      <p className="text-mRegular text-neutral600">
                        {loc.office}
                      </p>
                    </div>
                  </div>
                  {loc.phone && (
                    <a
                      href={`tel:${loc.phone}`}
                      className="flex gap-1 items-center"
                    >
                      <Image src={Phone} alt={'Phone'} height={24} width={24} />
                      <p className="text-neutral600 font-sRegular">
                        {loc.phone}
                      </p>
                    </a>
                  )}
                  <div className="flex gap-1 items-center">
                    <a
                      href={`mailto:${loc.email}`}
                      className="flex gap-1 items-center"
                    >
                      <Image src={Mail} alt={'Mail'} height={24} width={24} />
                      <p className="text-neutral600 font-sRegular">
                        {loc.email}{' '}
                      </p>
                    </a>
                    <Image
                      src={Copy}
                      alt={'Copy'}
                      onClick={() => {
                        navigator.clipboard.writeText(loc.email).then(() =>
                          toast({
                            description: 'Copied successfully'
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 py-[80px] px-[112px]">
        <p className="text-neutral900 text-headingL font-semiBold">
          Nearest office from your location
        </p>
        <div className="flex justify-between w-full">
          <div className="w-[48%]">
            <div className="flex flex-col rounded-[12px] border-[1px] border-neutral200 p-8 gap-5">
              <div>
                <p className="text-neutral900 text-headingL font-semiBold">
                  Get in touch
                </p>
                <p className="text-neutral600 text-headingS">
                  Our friendly team would love to hear from you.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <InputField
                    label="First Name*"
                    onChange={e => setFirstName(e.target.value)}
                    type="text"
                    name="firstName"
                    value={firstName}
                    errorText={firstNameError}
                    placeholder={'Enter first name'}
                    styles={{ inputMain: 'h-[64px]' }}
                    autoComplete="none"
                  />
                  <InputField
                    label="last Name*"
                    onChange={event => setLastName(event.target.value)}
                    type="text"
                    name="lastName"
                    value={lastName}
                    errorText={lastNameError}
                    placeholder={'Enter last name'}
                    styles={{ inputMain: 'h-[64px]' }}
                    autoComplete="none"
                  />
                </div>
                <InputField
                  label="Email*"
                  onChange={event => setEmail(event.target.value)}
                  type="email"
                  name="email"
                  value={email}
                  errorText={emailError}
                  placeholder={'Enter email id'}
                  styles={{ inputMain: 'h-[64px]' }}
                  autoComplete="none"
                />
                <MobileInput
                  label={'Mobile Number'}
                  onChange={(event: any) =>
                    setPhoneNumber(prev => ({
                      ...prev,
                      phone: event.target.value
                    }))
                  }
                  // type="nustrimber"
                  errorText={phoneNumberError}
                  placeholder={'Enter mobile Number'}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
                <textarea
                  value={message}
                  name="textarea"
                  rows={7}
                  className="w-full bg-neutral0 text-neutral900 rounded-[4px] resize-none focus:outline-none p-2 border-neutral-200 border-[1px] mt-2"
                  style={{ boxShadow: 'var(--input-shadow) inset' }}
                  onChange={e => setMessage(e.target.value)}
                />
                <CommonButton
                  onClick={handleSend}
                  variant={'primary'}
                  size={'custom'}
                  className="rounded-[4px] w-[100%] h-[40px]"
                >
                  Send Message
                </CommonButton>
              </div>
            </div>
          </div>
          <div className="!w-[30%] !max-h-[400px] rounded-[12px]">
            <LocateUs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
