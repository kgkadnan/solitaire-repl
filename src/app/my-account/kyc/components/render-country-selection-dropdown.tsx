import React from 'react';

import { ManageLocales } from '@/utils/translate';
import Select from 'react-select';
import { colourStyles } from '../styles/select-style';
import { IErrorSetState } from '@/app/search/result/result-interface';
import { updateFormState } from '@/features/kyc/kyc';
import { useAppDispatch } from '@/hooks/hook';
import { KYCForm } from '@/constants/kyc';

interface ICountrySelectionDropdown {
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  errorSetState: IErrorSetState;
  selectedCountry: any;
}
export const CountrySelectionDropdown = ({
  setSelectedCountry,
  errorSetState,
  selectedCountry
}: ICountrySelectionDropdown) => {
  const { setErrorText } = errorSetState;
  const dispatch = useAppDispatch();

  const handleSelectCountry = (selectedOption: any) => {
    setErrorText('');
    setSelectedCountry(selectedOption);
    dispatch(
      updateFormState({
        name: 'formState.country',
        value: selectedOption.value
      })
    );
    dispatch(
      updateFormState({
        name: 'formErrorState.online.sections',
        value: {
          personal_details: {},
          company_details: {},
          company_owner_details: {},
          banking_details: {}
        }
      })
    );
    dispatch(
      updateFormState({
        name: 'formErrorState.attachment',
        value: {}
      })
    );
    dispatch(
      updateFormState({
        name: 'formErrorState.attachment',
        value: {}
      })
    );
    dispatch(
      updateFormState({
        name: 'formErrorState.termAndCondition',
        value: false
      })
    );
  };

  const computeDropdownField = (countries: any) => {
    return countries.map(({ country }: any) => ({
      label: country.display,
      value: country.backend
    }));
  };

  return (
    <Select
      options={computeDropdownField(KYCForm)}
      onChange={handleSelectCountry}
      // defaultValue={{ value: 'Country', label: 'Country' }}
      value={selectedCountry}
      placeholder={ManageLocales('app.myProfile.kyc.country')}
      styles={colourStyles}
    />
  );
};
