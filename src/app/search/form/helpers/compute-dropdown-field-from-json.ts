export const computeDropdownFieldFromJson = (fieldData: string[]) => {
  return fieldData.map(data => {
    return { value: data, label: data };
  });
};
