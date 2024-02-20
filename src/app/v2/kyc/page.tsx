'use client';
import React, { useState } from 'react';
import CountrySelection from './components/country-selection';
import { useAppDispatch } from '@/hooks/hook';
import { updateFormState } from '@/features/kyc/kyc';
import SubmissionOption from './components/submission-option';

const KYC = () => {
  const [currentState, setCurrentState] = useState('country_selection');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSubmissionOption, setSelectedSubmissionOption] = useState('');

  const dispatch = useAppDispatch();

  const handleCountrySelection = (country: string) => {
    setSelectedCountry(country);
    setCurrentState('submission_option');
    dispatch(
      updateFormState({
        name: 'formState.country',
        value: country
      })
    );
  };

  const handleSubmissionOptionClick = (selection: string) => {
    setSelectedSubmissionOption(selection);
    dispatch(
      updateFormState({
        name: 'formState.offline',
        value: selection === 'online' ? false : true
      })
    );
  };

  const handleBack = (currentState: string) => {
    setCurrentState(currentState);
  };

  const renderContent = () => {
    switch (currentState) {
      case 'country_selection':
        return (
          <CountrySelection
            handleCountrySelection={handleCountrySelection}
            selectedCountry={selectedCountry}
          />
        );
      case 'submission_option':
        return (
          <SubmissionOption
            handleSubmissionOptionClick={handleSubmissionOptionClick}
            selectedSubmissionOption={selectedSubmissionOption}
            handleBack={handleBack}
          />
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default KYC;
