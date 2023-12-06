import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { ManageLocales } from '@/utils/translate';
import React, { Dispatch, SetStateAction } from 'react';
import styles from '../search-results.module.scss';
import { CustomSlider } from '@/components/common/slider';
import Image from 'next/image';
import sortOutline from '@public/assets/icons/sort-outline.svg';
import { RadioButton } from '@/components/common/custom-input-radio';
import { sortProducts } from '../helpers/sort-produts';
import { ISortBySetState, ISortByState, Product } from '../result-interface';

interface ISrotByProps {
  rows: Product[];
  setRows: Dispatch<SetStateAction<Product[]>>;
  sortByState: ISortByState;
  sortBySetState: ISortBySetState;
}

const SortBy: React.FC<ISrotByProps> = ({
  rows,
  setRows,
  sortByState,
  sortBySetState
}) => {
  const {
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
    isSortBySliderOpen
  } = sortByState;

  const {
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
    setIsSortBySliderOpen
  } = sortBySetState;

  /**
   * The above code defines multiple functions to handle radio button changes and update corresponding
   * state values.
   * @param {string} radioValue - The `radioValue` parameter is a string that represents the selected
   * value of a radio button.
   */
  const handleCaratRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedCaratRadioValue(radioValue);
  };
  const handleClarityRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedClarityRadioValue(radioValue);
  };
  const handlePriceRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedPriceRadioValue(radioValue);
  };
  const handleDiscountRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedDiscountRadioValue(radioValue);
  };
  const handleTableInclusionRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSeletedTableInclusionRadioValue(radioValue);
  };
  const handleFluorescenceRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedFluorescenceRadioValue(radioValue);
  };
  const handleBlackTableRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedBlackTableRadioValue(radioValue);
  };
  const handleSideBlackRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedSideBlackRadioValue(radioValue);
  };
  const handleDefaultRadioChange = (radioValue: string) => {
    setSelectedCaratRadioValue('');
    setSelectedSideBlackRadioValue('');
    setSelectedBlackTableRadioValue('');
    setSeletedTableInclusionRadioValue('');
    setSelectedDiscountRadioValue('');
    setSelectedFluorescenceRadioValue('');
    setSelectedPriceRadioValue('');
    setSelectedClarityRadioValue('');
    setSelectedDefaultValue(radioValue);
  };

  /* The above code is defining an array of radio button data for sorting options. Each radio button data
object contains properties such as name, onChange event handler, id, value, label, and checked
status. These properties are used to render and handle the radio buttons in a React component. The
code also combines all the radio button data arrays into a single array called RadioData. */

  const DefaultRadioData = [
    {
      name: 'Default',
      onChange: handleDefaultRadioChange,
      id: '1',
      value: 'Default',
      label: 'Default',
      checked: selectedDefaultValue == 'Default'
    }
  ];
  const carartRadioData = [
    {
      name: 'carat',
      onChange: handleCaratRadioChange,
      id: '1',
      value: 'Carat - Low to High',
      label: 'Carat - Low to High',
      checked: selectedCaratRadioValue === 'Carat - Low to High'
    },
    {
      name: 'carat',
      onChange: handleCaratRadioChange,
      id: '2',
      value: 'Carat - High to Low',
      label: 'Carat - High to Low',
      checked: selectedCaratRadioValue === 'Carat - High to Low'
    }
  ];
  const clarityRadioData = [
    {
      name: 'clarity',
      onChange: handleClarityRadioChange,
      id: '1',
      value: 'Clarity - Low to High',
      label: 'Clarity - (FL - I3)',
      checked: selectedClarityRadioValue == 'Clarity - Low to High'
    },
    {
      name: 'clarity',
      onChange: handleClarityRadioChange,
      id: '2',
      value: 'Clarity - High to Low',
      label: 'Clarity - (I3 - FL)',
      checked: selectedClarityRadioValue == 'Clarity - High to Low'
    }
  ];
  const priceRadioData = [
    {
      name: 'price',
      onChange: handlePriceRadioChange,
      id: '1',
      value: 'Price - Low to High',
      label: 'Price - Low to High',
      checked: selectedPriceRadioValue == 'Price - Low to High'
    },
    {
      name: 'price',
      onChange: handlePriceRadioChange,
      id: '2',
      value: 'Price - High to Low',
      label: 'Price - High to Low',
      checked: selectedPriceRadioValue == 'Price - High to Low'
    }
  ];
  const discountRadioData = [
    {
      name: 'discount',
      onChange: handleDiscountRadioChange,
      id: '1',
      value: 'Discount - Low to High',
      label: 'Discount - Low to High',
      checked: selectedDiscountRadioValue == 'Discount - Low to High'
    },
    {
      name: 'discount',
      onChange: handleDiscountRadioChange,
      id: '2',
      value: 'Discount - High to Low',
      label: 'Discount - High to Low',
      checked: selectedDiscountRadioValue == 'Discount - High to Low'
    }
  ];
  const tableInclusionRadioData = [
    {
      name: 'Table Inclusion',
      onChange: handleTableInclusionRadioChange,
      id: '1',
      value: 'Table_Inclusion - Low to High',
      label: 'Table Inclusion - (T0 - T3)',
      checked:
        seletedTableInclusionRadioValue == 'Table_Inclusion - Low to High'
    },
    {
      name: 'Table Inclusion',
      onChange: handleTableInclusionRadioChange,
      id: '2',
      value: 'Table_Inclusion - High to Low',
      label: 'Table Inclusion - (T3 - T0)',
      checked:
        seletedTableInclusionRadioValue == 'Table_Inclusion - High to Low'
    }
  ];
  const fluorescenceRadioData = [
    {
      name: 'Fluorescence',
      onChange: handleFluorescenceRadioChange,
      id: '1',
      value: 'Fluorescence - Low to High',
      label: 'Fluorescence - (None - Very Strong) ',
      checked: selectedFluorescenceRadioValue == 'Fluorescence - Low to High',
    },
    {
      name: 'Fluorescence',
      onChange: handleFluorescenceRadioChange,
      id: '2',
      value: 'Fluorescence - High to Low',
      label: 'Fluorescence - (Very Strong - None) ',
      checked: selectedFluorescenceRadioValue == 'Fluorescence - High to Low',
    },
  ];
  const blackTableRadioData = [
    {
      name: 'Black Table',
      onChange: handleBlackTableRadioChange,
      id: '1',
      value: 'black_table - Low to High',
      label: 'Black Table - (B0 - B3) ',
      checked: selectedBlackTableRadioValue == 'black_table - Low to High'
    },
    {
      name: 'Black Table',
      onChange: handleBlackTableRadioChange,
      id: '2',
      value: 'black_table - High to Low',
      label: 'Black Table - (B3 - B0) ',
      checked: selectedBlackTableRadioValue == 'black_table - High to Low'
    }
  ];
  const sideBlackRadioData = [
    {
      name: 'Side Black',
      onChange: handleSideBlackRadioChange,
      id: '1',
      value: 'side_black - Low to High',
      label: 'Side Black - (SB0 - SB3) ',
      checked: selectedSideBlackRadioValue == 'side_black - Low to High'
    },
    {
      name: 'Side Black',
      onChange: handleSideBlackRadioChange,
      id: '2',
      value: 'side_black - High to Low',
      label: 'Side Black - (SB3 - SB0) ',
      checked: selectedSideBlackRadioValue == 'side_black - High to Low'
    }
  ];
  const RadioData = [
    ...DefaultRadioData,
    ...carartRadioData,
    ...clarityRadioData,
    ...priceRadioData,
    ...discountRadioData,
    ...tableInclusionRadioData,
    ...fluorescenceRadioData,
    ...blackTableRadioData,
    ...sideBlackRadioData
  ];

  /**
   * Sorts the data based on the selected sorting options.
   * @returns None
   */
  const sortData = () => {
    const sortingOptions = [
      seletedTableInclusionRadioValue,
      selectedCaratRadioValue,
      selectedDiscountRadioValue,
      selectedFluorescenceRadioValue,
      selectedBlackTableRadioValue,
      selectedSideBlackRadioValue,
      selectedClarityRadioValue,
      selectedPriceRadioValue
      // Add more sorting options if needed
    ];
    // Save the current state as the previous state
    setPreviousRadioState((prevState: any) => ({
      ...prevState,
      seletedTableInclusionRadioValue,
      selectedCaratRadioValue,
      selectedDiscountRadioValue,
      selectedFluorescenceRadioValue,
      selectedBlackTableRadioValue,
      selectedSideBlackRadioValue,
      selectedClarityRadioValue,
      selectedDefaultValue,
      selectedPriceRadioValue
    }));

    if (selectedDefaultValue.length) {
      setRefetchDataToDefault(!refetchDataToDefault);
      setIsSortBySliderOpen(false);
    } else {
      const validSortingOptions = sortingOptions
        .filter(option => option !== '')
        .map(option => option.split(' - '))
        .filter(([key, order]) => key && order)
        .map(([key, order]) => ({
          key: key.toLowerCase().trim(),
          order: order.toLowerCase().trim()
        }));
      if (validSortingOptions.length > 0) {
        console.log('Before sorting:', rows);
        const sortedData = validSortingOptions.reduce((acc, { key, order }) => {
          console.log('Sorting with key:', key, 'and order:', order);
          return sortProducts(acc, order, key);
        }, rows);
        setRows(sortedData);
        setIsSortBySliderOpen(false);
      }
    }
  };

  /**
   * Sets the state of various radio buttons based on the previous radio state.
   * @returns None
   */
  const setSortByRadioStates = () => {
    setSeletedTableInclusionRadioValue(
      previousRadioState.selectedTableInclusionRadioValue || ''
    );
    setSelectedDefaultValue(previousRadioState.selectedDefaultValue || '');
    setSelectedPriceRadioValue(
      previousRadioState.selectedPriceRadioValue || ''
    );
    setSelectedCaratRadioValue(
      previousRadioState.selectedCaratRadioValue || ''
    );
    setSelectedDiscountRadioValue(
      previousRadioState.selectedDiscountRadioValue || ''
    );
    setSelectedFluorescenceRadioValue(
      previousRadioState.selectedFluorescenceRadioValue || ''
    );
    setSelectedBlackTableRadioValue(
      previousRadioState.selectedBlackTableRadioValue || ''
    );
    setSelectedSideBlackRadioValue(
      previousRadioState.selectedSideBlackRadioValue || ''
    );
    setSelectedClarityRadioValue(
      previousRadioState.selectedClarityRadioValue || ''
    );
  };

  /**
   * The function `onOpenChangeSortBy` resets multiple state values and sets the `isSortBySliderOpen`
   * state based on the `open` parameter.
   * @param {boolean} open - A boolean value indicating whether the sort by slider should be open or
   * closed.
   */
  const onOpenChangeSortBy = (open: boolean) => {
    if (previousRadioState) {
      setSortByRadioStates();
    }
    setIsSortBySliderOpen(open);
  };

  /**
   * Handles the cancel action by resetting the selected radio values to their previous state
   * or clearing them if there is no previous state. Also closes the sort by dropdown.
   * @returns None
   */
  const handleCancel = () => {
    if (previousRadioState) {
      setSortByRadioStates();
      onOpenChangeSortBy(false);
      // Add more properties if needed
    } else {
      setSelectedClarityRadioValue('');
      setSelectedSideBlackRadioValue('');
      setSelectedBlackTableRadioValue('');
      setSelectedFluorescenceRadioValue('');
      setSelectedDiscountRadioValue('');
      setSelectedPriceRadioValue('');
      setSelectedCaratRadioValue('');
      setSeletedTableInclusionRadioValue('');
      setSelectedDefaultValue('');
      onOpenChangeSortBy(false);
    }
  };

  return (
    <CustomSlider
      sheetTriggenContent={
        <div className="flex gap-1">
          <Image src={sortOutline} alt="sortOutline" width={20} height={5} />
          <p className="text-solitaireTertiary">Sort by</p>
        </div>
      }
      sheetContentStyle={styles.sheetContentStyle}
      sheetContent={
        <>
          <div className={styles.sheetMainHeading}>
            <p>{ManageLocales('app.searchResult.slider.sortBy.filter')}</p>
          </div>

          <div className={styles.radioButtonMainDiv}>
            {RadioData.map((radioData, index) => {
              return (
                <RadioButton
                  key={index} // Ensure each component has a unique key
                  radioMetaData={radioData}
                />
              );
            })}
          </div>

          {/* button */}
          <div className={styles.customButtonDiv}>
            <CustomDisplayButton
              displayButtonLabel={ManageLocales(
                'app.searchResult.slider.sortBy.cancel'
              )}
              displayButtonAllStyle={{
                displayButtonStyle: styles.transparent
              }}
              handleClick={handleCancel}
            />
            <CustomDisplayButton
              displayButtonLabel={ManageLocales(
                'app.searchResult.slider.sortBy.apply'
              )}
              displayButtonAllStyle={{
                displayButtonStyle: styles.filled
              }}
              handleClick={sortData}
            />
          </div>
        </>
      }
      isSliderOpen={isSortBySliderOpen}
      onOpenChange={onOpenChangeSortBy}
    />
  );
};

export default SortBy;
