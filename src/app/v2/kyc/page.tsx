'use client';
import React, { useState } from 'react';
import CountrySelection from './components/country-selection';
import { useAppDispatch } from '@/hooks/hook';
import { updateFormState } from '@/features/kyc/kyc';
import SubmissionOption from './components/submission-option';
import CompanyOwnerDetail from './components/company-owner-detail';
import { useSelector } from 'react-redux';
import BankingDetails from './components/banking-details';
import PersonalDetail from './components/personal-detail';

const KYC = () => {
  const { formState, formErrorState } = useSelector((state: any) => state.kyc);
  const [currentState, setCurrentState] = useState('personal_details');
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
        value: selection !== 'online'
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

      case 'company_owner_detail':
        return (
          <CompanyOwnerDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
          />
        );
      case 'banking_details':
        return (
          <BankingDetails
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            country={'India'}
          />
        );
      case 'personal_details':
        return (
          <PersonalDetail
            formErrorState={formErrorState}
            formState={formState}
            dispatch={dispatch}
            country={'India'}
          />
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default KYC;
