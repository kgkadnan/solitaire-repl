export const computeCountryDropdownField = (countryCode: any) => {
  return countryCode?.countries?.map(({ code }: any) => ({
    label: code,
    value: code
  }));
};
