'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Diamond from '@public/v3/timeline/diamond.svg';

import Phone from '@public/v3/contact/phone.svg';
import Mail from '@public/v3/contact/mail.svg';
import Copy from '@public/v3/contact/copy.svg';

import dynamic from 'next/dynamic';
import { useToast } from '@/components/v3/ui/use-toast';
import { isEmailValid } from '@/utils/validate-email';
import { isPhoneNumberValid } from '@/utils/validate-phone';
import { createContactUsEntry } from '@/features/v3/api/contact-us';
import LocationTab from '@/components/v3/location-tab';

import {
  HeadquaterLocation,
  WorldMapPointers
} from '@/constants/v3/headquater-location';
import { InputField } from '@/components/v3/input/input';
import { MobileInput } from '@/components/v3/input/mobile-input';
import { CommonButton } from '@/components/v3/button';
import WorldMap from '@public/v3/world-map.png';
// import Tooltip from '@/components/v2/common/tooltip';
import AnimationSection from '@/components/v3/animated-text/scroll';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';

const LocateUs = dynamic(() => import('../../../components/v3/locate-us'), {
  ssr: false
});

const preloadImages = (imageUrls: any[]): Record<string, string> => {
  const preloaded: Record<string, string> = {};

  imageUrls.forEach(url => {
    const img = new window.Image();
    img.src = url.src;
    preloaded[url.src] = url; // Store the URL as a key-value pair
  });

  return preloaded;
};

const ContactUs = () => {
  const [selectedRegion, setSelectedRegion] = useState('ASIA PACIFIC');
  const [defaultCountry, setDefaultCountry] = useState('india');
  const { toast } = useToast();

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

  const { data: currentCountryCode } = useGetCountryCodeQuery({});
  const [selectedPointer, setSelectedPointer] = useState<any>({});
  const [officeCoords, setOfficeCoords] = useState<any>([]);
  const [, setTooltipData] = useState('KGK Office, BKC, Mumbai');

  const [headOfficeImages, setHeadOfficeImages] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const imagesToPreload = HeadquaterLocation.map(data =>
      data.location.map(i => i.flag)
    );
    const preloaded = preloadImages(imagesToPreload.flat());
    setHeadOfficeImages(preloaded);
  }, []);

  useEffect(() => {
    if (currentCountryCode?.country_name) {
      let country = currentCountryCode?.country_name.toLowerCase();
      // let country = 'thailand';
      setDefaultCountry(country);
      if (country === 'united arab emirates' || country === 'israel') {
        setSelectedRegion('MIDDLE EAST');
        setOfficeCoords([25.0743, 55.1314]); //final
        setTooltipData('36 J, Almas Tower, Cluster I, JLT, Dubai');
      } else if (country === 'united states') {
        setSelectedRegion('NORTH & SOUTH AMERICA');
        setOfficeCoords([40.7570481, -73.9846408]);
        setTooltipData('');
      } else if (country === 'belgium' || country === 'switzerland') {
        setSelectedRegion('EUROPE');
        setOfficeCoords([51.2158277, 4.4159125]); //final
      } else if (country === 'south africa') {
        setSelectedRegion('AFRICA');
        setOfficeCoords([-26.2053825, 28.0536787]); //final
      } else {
        setSelectedRegion('ASIA PACIFIC');
        if (country === 'china') {
          setOfficeCoords([22.3114479, 114.1873412]);
        } else if (country === 'japan') {
          setOfficeCoords([35.7083551, 139.7754062]);
        } else if (country === 'thailand') {
          setOfficeCoords([13.7236825, 100.3648119]);
        } else {
          setOfficeCoords([19.067, 72.8508]);
        }
      }
    }
  }, [currentCountryCode]);
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
          description:
            'Thank you for getting in touch! We have received your message, and our team will get back to you shortly.'
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

  useEffect(() => {
    if (defaultCountry) {
      const filteredPointers = WorldMapPointers.filter(data =>
        data.kam.country.toLowerCase().includes(defaultCountry.toLowerCase())
      );
      setSelectedPointer(filteredPointers);
    }
  }, [defaultCountry]);
  function adjustPosition(positionString: string) {
    // Extract left and top percentages using a regular expression
    const leftMatch = positionString.match(/left-\[(\d+)%\]/);
    const topMatch = positionString.match(/top-\[(\d+)%\]/);

    // Parse the percentages and add 2% to each
    const leftPercentage = parseInt(leftMatch![1]) - 10;
    const topPercentage = parseInt(topMatch![1]) + 3;

    // Return the modified style object
    return {
      left: `${leftPercentage}%`,
      top: `${topPercentage}%`,
      // position: 'absolute',
      boxShadow: 'var(--popups-shadow)',
      zIndex: 3
    };
  }

  return (
    <div>
      <div className="min-h-[800px] flex justify-center items-center xl:px-[112px] lg:px-[32px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <div className="min-h-[800px] flex items-center justify-center">
          <div className="flex flex-wrap flex-col gap-12 pt-[160px] pb-[80px] justify-between items-center">
            <div className=" text-neutral900 text-[96px] font-bold text-center items-center  line leading-[110px] flowy-animate px-10 w-[1100px]">
              <AnimationSection>
                {' '}
                We would love to hear from you
              </AnimationSection>
            </div>
            <div className="flex flex-col gap-3 px-[40px] items-center">
              <div className="text-neutral800 text-lRegular text-center w-[800px] content">
                <AnimationSection animationDelay={0.5}>
                  We value your feedback and inquiries. Whether you have a
                  question, need assistance, or want to learn more about our
                  services, our dedicated team is here to help. Please feel free
                  to reach out to our sales team closest to you through any of
                  the provided contact options.
                </AnimationSection>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center my-[50px] disable-custom-cursor gap-6">
        <div className="text-neutral900 text-headingL font-bold text-center">
          {' '}
          Global Sales Offices
        </div>
        <div className="relative w-[1300px]">
          <Image src={WorldMap} alt="all office location" className="w-full" />
          {selectedPointer.length > 0 && (
            <div
              className={`absolute bg-neutral0 rounded-[8px] p-[10px] w-[270px]`}
              style={adjustPosition(selectedPointer[0].coords)}
            >
              {/* Caret Notch */}
              <div className="absolute top-[-5px] left-[50%] transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[5px] border-b-neutral0"></div>
              </div>
              <div className="flex  text-neutral900">
                <div className="flex flex-col gap-2 ">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center">
                      <div
                        className="h-10 w-10 rounded-[50%] bg-primaryMain text-neutral0 text-[14px] border-[2px] border-neutral0 justify-center items-center flex"
                        style={{ boxShadow: 'var(--popups-shadow' }}
                      >
                        {selectedPointer[0].kam.initial}
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="font-semiBold text-[14px]">
                          {selectedPointer[0].kam.name}
                        </p>
                        <p className="text-[12px]">
                          {selectedPointer[0].kam.postion}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1  items-center">
                      <div className="w-[40px] flex justify-center">
                        <Image
                          src={
                            headOfficeImages[
                              selectedPointer[0].kam.countryFlag.src
                            ]
                          }
                          // src={selectedPointer[0].kam.countryFlag}
                          alt={`country flag image`}
                        />
                      </div>
                      <p className="font-semiBold text-[12px] text-[#344054]">
                        {selectedPointer[0].kam.location}
                      </p>
                    </div>
                  </div>
                  <hr />
                  {selectedPointer[0].kam.phone && (
                    <a
                      href={`tel:+${selectedPointer[0].kam.phone}`}
                      className="flex gap-1 items-center cursor-pointer"
                    >
                      <div className="w-10 flex justify-center">
                        <Image
                          src={Phone}
                          alt={'Phone'}
                          height={24}
                          width={24}
                        />
                      </div>
                      <p className=" text-sRegular text-neutral600">
                        {selectedPointer[0].kam.phone}
                      </p>
                    </a>
                  )}
                  <div className="flex gap-1 items-center cursor-pointer">
                    <a
                      href={`mailto:${selectedPointer[0].kam.email}`}
                      className="flex gap-1 items-center"
                    >
                      <div className="w-10 flex justify-center">
                        <Image src={Mail} alt={'Mail'} height={24} width={24} />
                      </div>
                      <p className=" text-sRegular text-neutral600">
                        {selectedPointer[0].kam.email}{' '}
                      </p>
                    </a>
                    <Image
                      src={Copy}
                      alt={'Copy'}
                      className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(selectedPointer[0].kam.email)
                          .then(() =>
                            toast({
                              description: 'Copied successfully'
                            })
                          );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {WorldMapPointers.map((pointer, index) => (
            <div
              key={pointer.coords} // Add a key to prevent React warnings
            >
              <div
                className={`absolute ${pointer.coords} z-2 cursor-pointer`}
                onMouseEnter={() => setSelectedPointer([pointer])}
              >
                <div className="relative">
                  <Image
                    src={Diamond}
                    alt={`diamond-${index}`}
                    height={20}
                    width={20}
                    className={`inset-0 !w-4 !h-4  rounded-full  cursor-pointer  `}
                  />

                  <div
                    className={`absolute w-[12px] h-[12px] top-[1px] left-[2px]  rounded-full ${
                      pointer.kam.country === selectedPointer[0]?.kam.country &&
                      'animate-pulse bg-animated-pulse'
                    } `}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
        <div className="flex flex-col gap-1 py-[32px] gap-[64px]  xl:px-[112px] lg:px-[32px]">
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
              className={`w-[70%]  flex flex-wrap flex-col gap-6 pb-[80px] ${
                selectedRegion === 'ASIA PACIFIC'
                  ? 'max-h-[720px]'
                  : 'max-h-[150px]'
              }`}
            >
              {HeadquaterLocation.filter(
                (loc: any) => loc.region === selectedRegion
              )[0].location.map((loc: any, index: number) => (
                <div key={`${loc.country}-${index}`}>
                  {/* <AnimationSection> */}
                  <div className="flex flex-col gap-[6px]">
                    <div className="flex gap-1">
                      <div className="w-10 flex items-center justify-center">
                        <Image
                          src={headOfficeImages[loc.flag.src]}
                          alt={loc.country}
                        />
                      </div>
                      <p className="font-semiBold text-headingS text-neutral600">
                        {loc.country}
                      </p>
                    </div>
                    <div className="flex gap-1 ">
                      {' '}
                      <div
                        className="h-10 w-10 rounded-[50%] bg-primaryMain text-neutral0 text-[14px] border-[2px] border-neutral0 justify-center items-center flex"
                        style={{ boxShadow: 'var(--popups-shadow' }}
                      >
                        {loc.initial}
                        {/* <Image
                          src={loc.image}
                          alt={loc.name}
                          className={`h-10 w-10  rounded-[50%]  bg-radial-grad-kam  pt-1 ${
                            loc.name === 'Maysey Isakov' ||
                            (loc.name === 'Jitendra Baid' && 'pt-[6px]')
                          }`}
                         
                        /> */}
                      </div>
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
                        <div className="w-10 flex items-center justify-center">
                          <Image
                            src={Phone}
                            alt={'Phone'}
                            height={24}
                            width={24}
                          />
                        </div>
                        <p className="text-neutral600 text-sRegular">
                          {loc.phone}
                        </p>
                      </a>
                    )}
                    <div className="flex gap-1 items-center">
                      <a
                        href={`mailto:${loc.email}`}
                        className="flex gap-1 items-center"
                      >
                        {' '}
                        <div className="w-10 flex items-center justify-center">
                          <Image
                            src={Mail}
                            alt={'Mail'}
                            height={24}
                            width={24}
                          />
                        </div>
                        <p className="text-neutral600 text-sRegular">
                          {loc.email}{' '}
                        </p>
                      </a>
                      <Image
                        src={Copy}
                        alt={'Copy'}
                        className="cursor-pointer"
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
                  {/* </AnimationSection> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 py-[80px] xl:px-[112px] lg:px-[32px]">
        <div className="text-neutral900 text-headingL font-semiBold">
          Nearest office from your location
        </div>
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
                    label="Last Name*"
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
                  label={'Contact Number'}
                  onChange={(event: any) =>
                    setPhoneNumber(prev => ({
                      ...prev,
                      phone: event.target.value
                    }))
                  }
                  // type="nustrimber"
                  errorText={phoneNumberError}
                  placeholder={'Enter contact number'}
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
                  placeholder="Enter your message here..."
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
          <div className="!w-[27%] rounded-[12px]">
            {' '}
            {officeCoords.length > 0 && <LocateUs position={officeCoords} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
