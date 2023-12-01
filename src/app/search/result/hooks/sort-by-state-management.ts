import React, { useState } from 'react';

export const useSortByStateManagement = () => {
  const [selectedCaratRadioValue, setSelectedCaratRadioValue] =
    useState<string>('');
  const [selectedClarityRadioValue, setSelectedClarityRadioValue] =
    useState<string>('');
  const [selectedPriceRadioValue, setSelectedPriceRadioValue] =
    useState<string>('');
  const [selectedDiscountRadioValue, setSelectedDiscountRadioValue] =
    useState<string>('');
  const [seletedTableInclusionRadioValue, setSeletedTableInclusionRadioValue] =
    useState<string>('');
  const [selectedFluorescenceRadioValue, setSelectedFluorescenceRadioValue] =
    useState<string>('');
  const [selectedBlackTableRadioValue, setSelectedBlackTableRadioValue] =
    useState<string>('');
  const [selectedSideBlackRadioValue, setSelectedSideBlackRadioValue] =
    useState<string>('');

  const [refetchDataToDefault, setRefetchDataToDefault] = useState(false);
  const [selectedDefaultValue, setSelectedDefaultValue] = useState<string>('');
  const [previousRadioState, setPreviousRadioState] = useState<any>(null);
  const [isSortBySliderOpen, setIsSortBySliderOpen] = useState(Boolean);

  return {
    sortByState: {
      selectedCaratRadioValue,
      selectedClarityRadioValue,
      selectedBlackTableRadioValue,
      selectedSideBlackRadioValue,
      selectedDefaultValue,
      selectedDiscountRadioValue,
      selectedFluorescenceRadioValue,
      seletedTableInclusionRadioValue,
      selectedPriceRadioValue,
      refetchDataToDefault,
      previousRadioState,
      isSortBySliderOpen,
    },

    sortBySetState: {
      setSelectedCaratRadioValue,
      setSelectedClarityRadioValue,
      setSelectedPriceRadioValue,
      setSelectedDiscountRadioValue,
      setSeletedTableInclusionRadioValue,
      setSelectedFluorescenceRadioValue,
      setSelectedBlackTableRadioValue,
      setSelectedSideBlackRadioValue,
      setRefetchDataToDefault,
      setSelectedDefaultValue,
      setPreviousRadioState,
      setIsSortBySliderOpen,
    },
  };
};
