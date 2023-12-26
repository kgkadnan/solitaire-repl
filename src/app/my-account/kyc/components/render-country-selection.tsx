import { KYCForm } from '@/constants/kyc';
import { ManageLocales } from '@/utils/translate';
import Select from 'react-select';
import { colourStyles } from '../styles/select-style';

export const CountrySelection = ({ setSelectedCountry }: any) => {
  const handleFancyFilterChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption.value);
  };

  const computeDropdownField = (countries: any) => {
    return countries.map(({ country }: any) => ({
      label: country.fullName,
      value: country.shortName
    }));
  };

  return (
    <Select
      options={computeDropdownField(KYCForm)}
      onChange={handleFancyFilterChange}
      placeholder={ManageLocales('app.myProfile.kyc.country')}
      styles={colourStyles}
    />
  );
};
