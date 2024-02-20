'use client';
import React, { useState } from 'react';
import CountrySelection from './components/country-selection';
import { useAppDispatch } from '@/hooks/hook';
import { updateFormState } from '@/features/kyc/kyc';

const KYC = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const dispatch = useAppDispatch();

  const handleCountrySelection = (country: string) => {
    setSelectedCountry(country);
    dispatch(
      updateFormState({
        name: 'formState.country',
        value: country
      })
    );
  };
  return (
    <div>
      <CountrySelection
        handleCountrySelection={handleCountrySelection}
        selectedCountry={selectedCountry}
      />
    </div>
  );
};

export default KYC;
