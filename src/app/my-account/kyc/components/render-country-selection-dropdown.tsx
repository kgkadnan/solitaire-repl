import { KYCForm } from '@/constants/kyc';
import { ManageLocales } from '@/utils/translate';
import Select from 'react-select';
import { colourStyles } from '../styles/select-style';
import { IErrorSetState } from '@/app/search/result/result-interface';
import { updateFormState } from '@/features/kyc/kyc';
import { useAppDispatch } from '@/hooks/hook';

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
    setSelectedCountry(selectedOption.value);
    dispatch(updateFormState({ name: 'country', value: selectedOption.value }));
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
