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
}
export const CountrySelectionDropdown = ({
  setSelectedCountry,
  errorSetState
}: ICountrySelectionDropdown) => {
  const { setErrorText } = errorSetState;
  const dispatch = useAppDispatch();

  const handleSelectCountry = (selectedOption: any) => {
    setErrorText('');
    setSelectedCountry(selectedOption.value);
    dispatch(
      updateFormState({
        name: 'formState.country',
        value: selectedOption.value
      })
    );
  };

  const computeDropdownField = (countries: any) => {
    return countries.map(({ country }: any) => ({
      label: country.fullName,
      value: country.fullName
    }));
  };

  return (
    <Select
      options={computeDropdownField(KYCForm)}
      onChange={handleSelectCountry}
      // defaultValue={{ value: 'Country', label: 'Country' }}
      // value={{ value: s electedCountry, label: selectedCountry }}
      placeholder={ManageLocales('app.myProfile.kyc.country')}
      styles={colourStyles}
    />
  );
};
