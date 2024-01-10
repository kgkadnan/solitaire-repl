import { useState } from 'react';

export const useCountrySelectionStateManagement = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return {
    countryState: { selectedCountry },
    setCountryState: { setSelectedCountry }
  };
};
