import { CustomSelectionButton } from '@/components/common/buttons/selection-button';
import CustomImageTile from '@/components/common/image-tile';
import { CustomInputField } from '@/components/common/input-field';
import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import React from 'react';
import renderOtherParameterFields from './render-inclusion-field';
import renderMeasurementField from './render-measurement-field';
import renderSelectionButtons from './render-selection-button';
import styles from '../form.module.scss';
import advanceSearch from '@/constants/advance-search.json';
import { Errors } from '../hooks/validation-state-management';
import { handleFilterChange } from '../helpers/handle-change';
import { CustomSelect } from '@/components/common/select';

const renderContent = (
  state: any,
  setState: any,
  validationError: any,
  setValidationError: any,
  errors: any,
  selectedStep: any,
  setSelectedStep: any,
  setErrors: any
) => {
  const imageTileStyles = {
    imageTileMainContainerStyles: styles.imageTileMainContainerStyles,
    imageTileContainerStyles: styles.imageTileContainerStyles,
    imageTileImageStyles: styles.imageTileImageStyles,
    imageTileLabelStyles: styles.imageTileLabelStyles,
    activeIndicatorStyles: styles.activeOtherStyles
  };

  const regexPattern = new RegExp(/^\d*\.?\d{0,2}$/);

  const {
    selectedShape,
    selectedColor,
    selectedTinge,
    selectedClarity,
    selectedCaratRange,
    selectedMake,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedFluorescence,
    selectedKeyToSymbol,
    selectedLab,
    selectedHR,
    selectedBrilliance,
    selectedLocation,
    selectedOrigin,
    priceRangeFrom,
    priceRangeTo,
    discountFrom,
    discountTo,
    pricePerCaratFrom,
    pricePerCaratTo,
    caratRangeFrom,
    caratRangeTo,
    selectedFancyColor
  } = state;

  const {
    setSelectedShape,
    setSelectedColor,
    setSelectedFancyColor,
    setSelectedIntensity,
    setSelectedOvertone,
    setSelectedTinge,
    setSelectedClarity,
    setSelectedCaratRange,
    setSelectedMake,
    setSelectedCut,
    setSelectedPolish,
    setSelectedSymmetry,
    setSelectedFluorescence,
    setSelectedKeyToSymbol,
    setSelectedLab,
    setSelectedHR,
    setSelectedBrilliance,
    setSelectedLocation,
    setSelectedOrigin,
    setPriceRangeFrom,
    setPriceRangeTo,
    setDiscountFrom,
    setDiscountTo,
    setPricePerCaratFrom,
    setPricePerCaratTo,
    setCaratRangeFrom,
    setCaratRangeTo
  } = setState;

  const compareArrays = (arr1: string[], arr2: string[]) => {
    // Check if the lengths of the arrays are equal
    if (arr1.length !== arr2.length) {
      return false;
    }
    // Convert arrays to sets
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    // Compare sets
    for (const value of set1) {
      if (!set2.has(value)) {
        return false;
      }
    }
    // If the loop completes, sets are equal
    return true;
  };

  // Function to handle shape change based on user selection
  const handleShapeChange = (shape: string) => {
    const filteredShape: string[] = advanceSearch.shape.map(
      data => data.short_name
    );
    if (shape.toLowerCase() === 'all') {
      setSelectedShape(filteredShape);
      if (selectedShape.includes('All')) {
        setSelectedShape([]);
      }
    } else {
      if (selectedShape.includes('All')) {
        const filteredSelectedShape: string[] = selectedShape.filter(
          (data: any) => data !== 'All' && data !== shape
        );
        setSelectedShape(filteredSelectedShape);
      } else if (
        compareArrays(
          selectedShape.filter((data: any) => data !== 'All'),
          filteredShape.filter(data => data !== 'All' && data !== shape)
        )
      ) {
        setSelectedShape(filteredShape);
      } else {
        handleFilterChange(shape, selectedShape, setSelectedShape);
      }
    }
  };

  // Function to handle color change based on user selection
  const handleColorChange = (data: string) => {
    setSelectedFancyColor([]);
    setSelectedIntensity([]);
    setSelectedOvertone([]);
    handleFilterChange(data, selectedColor, setSelectedColor);
  };

  // Function to handle fancy color filter change based on user selection
  const handleFancyFilterChange = (data: string) => {
    setSelectedColor([]);
    handleFilterChange(data, selectedFancyColor, setSelectedFancyColor);
  };
  // Function to handle intensity change based on user selection
  const handleIntensityChange = (data: string) => {
    setSelectedColor([]);
    setSelectedIntensity(data);
  };

  // Function to handle overtone change based on user selection
  const handleOvertoneChange = (data: string) => {
    setSelectedColor([]);
    setSelectedOvertone(data);
  };

  // Function to handle tinge change based on user selection
  const handleTingeChange = (data: string) => {
    handleFilterChange(data, selectedTinge, setSelectedTinge);
  };

  // Function to handle clarity change based on user selection
  const handleClarityChange = (data: string) => {
    handleFilterChange(data, selectedClarity, setSelectedClarity);
  };

  // Function to handle carat range change based on user selection
  const handleCaratRangeChange = (data: string) => {
    handleFilterChange(data, selectedCaratRange, setSelectedCaratRange);
  };

  // Function to handle make change based on user selection
  const handleMakeChange = (data: string) => {
    if (data.toLowerCase() === '3ex') {
      if (data !== selectedMake) {
        setSelectedCut(['EX']);
        setSelectedPolish(['EX']);
        setSelectedSymmetry(['EX']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
      setSelectedFluorescence(
        selectedFluorescence.filter((e: string) => e !== 'None')
      );
    }
    if (data.toLowerCase() === '3ex+none') {
      if (data !== selectedMake) {
        setSelectedCut(['EX']);
        setSelectedPolish(['EX']);
        setSelectedSymmetry(['EX']);
        setSelectedFluorescence(['None']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
        setSelectedFluorescence([]);
      }
    }
    if (data.toLowerCase() === '3vg+ex') {
      if (data !== selectedMake) {
        setSelectedCut(['EX', 'VG']);
        setSelectedPolish(['EX', 'VG']);
        setSelectedSymmetry(['EX', 'VG']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
      setSelectedFluorescence(
        selectedFluorescence.filter((e: string) => e !== 'None')
      );
    }
    if (data.toLowerCase() === '3g') {
      if (data !== selectedMake) {
        setSelectedCut(['G']);
        setSelectedPolish(['G']);
        setSelectedSymmetry(['G']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
    }
    if (data.toLowerCase() === '3f') {
      if (data !== selectedMake) {
        setSelectedCut(['F']);
        setSelectedPolish(['F']);
        setSelectedSymmetry(['F']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
    }
    setSelectedMake(data === selectedMake ? '' : data);
  };

  // Function to handle filter change and make selection based on user input
  const handleFilterChangeAndMakeSelection = (
    data: string,
    selectedFilter: string[],
    setSelectedFilter: React.Dispatch<React.SetStateAction<string[]>>,
    firstCriteria: string[],
    secondCriteria: string[]
  ) => {
    handleFilterChange(data, selectedFilter, setSelectedFilter);
    const temp: string[] = [...selectedFilter];
    const index = temp.indexOf(data);
    if (index !== -1) {
      temp.splice(index, 1);
    } else {
      temp.push(data);
    }
    if (
      temp.toString() === 'EX' &&
      firstCriteria.toString() === 'EX' &&
      secondCriteria.toString() === 'EX'
    ) {
      if (selectedFluorescence.toString() === 'None') {
        setSelectedMake('3EX+None');
      } else {
        setSelectedMake('3EX');
      }
    } else if (
      (firstCriteria.toString() === 'EX,VG' ||
        firstCriteria.toString() === 'VG,EX') &&
      (secondCriteria.toString() === 'EX,VG' ||
        secondCriteria.toString() === 'VG,EX') &&
      (temp.toString() === 'EX,VG' || temp.toString() === 'VG,EX')
    ) {
      setSelectedMake('3VG+EX');
    } else {
      setSelectedMake('');
    }
  };

  // Function to handle filter changes and cut selection based on user input
  const handleCutChange = (data: string) => {
    handleFilterChangeAndMakeSelection(
      data,
      selectedCut,
      setSelectedCut,
      selectedPolish,
      selectedSymmetry
    );
  };

  // Function to handle filter changes and polish selection based on user input
  const handlePolishChange = (data: string) => {
    handleFilterChangeAndMakeSelection(
      data,
      selectedPolish,
      setSelectedPolish,
      selectedCut,
      selectedSymmetry
    );
  };

  // Function to handle filter changes and symmetry selection based on user input
  const handleSymmetryChange = (data: string) => {
    handleFilterChangeAndMakeSelection(
      data,
      selectedSymmetry,
      setSelectedSymmetry,
      selectedCut,
      selectedPolish
    );
  };

  // Function to handle filter changes and fluorescence selection based on user input
  const handleFluorescenceChange = (data: string) => {
    handleFilterChange(data, selectedFluorescence, setSelectedFluorescence);
    const temp: string[] = selectedFluorescence;
    const index = temp.indexOf(data);
    if (index !== -1) {
      temp.splice(index, 1);
    } else {
      temp.push(data);
    }
    if (
      selectedPolish.toString() === 'EX' &&
      selectedCut.toString() === 'EX' &&
      selectedSymmetry.toString() === 'EX'
    ) {
      if (temp.toString() === 'None') {
        setSelectedMake('3EX+None');
      } else {
        setSelectedMake('3EX');
      }
    } else if (
      (selectedCut.toString() === 'EX,VG' ||
        selectedCut.toString() === 'VG,EX') &&
      (selectedPolish.toString() === 'EX,VG' ||
        selectedPolish.toString() === 'VG,EX') &&
      (selectedSymmetry.toString() === 'EX,VG' ||
        selectedSymmetry.toString() === 'VG,EX') &&
      temp.length === 0
    ) {
      setSelectedMake('3VG+EX');
    } else {
      setSelectedMake('');
    }
  };

  // Functions to handle additional filter changes (key to symbol, lab, HR, brilliance, location, origin)
  const handleKeyToSymbolChange = (comment: string) => {
    if (comment.toLowerCase() === 'all') {
      setSelectedKeyToSymbol(advanceSearch.key_to_symbol);
      if (selectedKeyToSymbol.includes('All')) {
        setSelectedKeyToSymbol([]);
      }
    } else {
      if (selectedKeyToSymbol.includes('All')) {
        let filteredSelectedShape: string[] = selectedKeyToSymbol.filter(
          (data: string) => data !== 'All' && data !== comment
        );
        setSelectedKeyToSymbol(filteredSelectedShape);
      } else if (
        compareArrays(
          selectedKeyToSymbol.filter((data: string) => data !== 'All'),
          advanceSearch.key_to_symbol.filter(
            data => data !== 'All' && data !== comment
          )
        )
      ) {
        setSelectedKeyToSymbol(advanceSearch.key_to_symbol);
      } else {
        handleFilterChange(
          comment,
          selectedKeyToSymbol,
          setSelectedKeyToSymbol
        );
      }
    }
  };
  const handleLabChange = (data: string) => {
    handleFilterChange(data, selectedLab, setSelectedLab);
  };
  const handleHRChange = (data: string) => {
    handleFilterChange(data, selectedHR, setSelectedHR);
  };
  const handleBrillianceChange = (data: string) => {
    handleFilterChange(data, selectedBrilliance, setSelectedBrilliance);
  };
  const handleLocation = (data: string) => {
    handleFilterChange(data, selectedLocation, setSelectedLocation);
  };
  const handleOrigin = (data: string) => {
    handleFilterChange(data, selectedOrigin, setSelectedOrigin);
  };

  // Function to normalize carat range values
  const normalizeValue = (value: string) => {
    // Normalize user input like '3-3.99' to '3.00-3.99'
    const caratRange = value.split('-');
    if (caratRange[0] === '' || caratRange[1] === '') {
      setValidationError(`Please enter a valid carat range.`);
      return;
    } else if (caratRange[0] === '0' || caratRange[1] === '0') {
      setValidationError('Please enter value between “0.10 to 50”');
      return;
    } else if (caratRange[0] > caratRange[1]) {
      setValidationError(
        `Carat range cannot be ${caratRange[0]} to ${caratRange[1]}. Please enter a valid carat range.`
      );
      return;
    } else if (caratRange.length === 2) {
      const caratFrom = parseFloat(caratRange[0]).toFixed(2);
      const caratTo = parseFloat(caratRange[1]).toFixed(2);
      return `${caratFrom}-${caratTo}`;
    }
    return value;
  };

  // Function to handle adding carat range
  const handleAddCarat = (data: string) => {
    const validatedData = normalizeValue(data);
    if (validatedData) {
      if (!selectedCaratRange.includes(validatedData)) {
        setSelectedCaratRange([...selectedCaratRange, validatedData]);
      }
      setCaratRangeFrom('');
      setCaratRangeTo('');
    }
  };

  // Radio data for step selection
  const RadioData = [
    {
      name: 'steps',
      onChange: (data: string) => {
        setSelectedStep(data);
      },
      id: '1',
      value: 'Contains',
      label: ManageLocales('app.advanceSearch.radioLabel1'),
      checked: selectedStep == 'Contains'
    },
    {
      name: 'steps',
      onChange: (data: string) => {
        setSelectedStep(data);
      },
      id: '2',
      value: 'Does not contains',
      label: ManageLocales('app.advanceSearch.radioLabel2'),
      checked: selectedStep == 'Does not contains'
    }
  ];

  // Function to handle validation errors
  const handleValidate = (
    key: keyof Errors,
    inputType: 'from' | 'to',
    value: any,
    otherValue: any
  ) => {
    if (value == '' && otherValue == '') {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [key]: { from: null, to: null }
      }));
    } else if (value.length === 0) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [key]: {
          ...prevErrors[key as keyof Errors],
          [inputType]: `Please enter a value for '${key} from'`
        }
      }));
      // Handle other error logic as needed
    } else if (otherValue.length === 0) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [key]: {
          ...prevErrors[key as keyof Errors],
          [inputType]: `Please enter a value for '${key} to'`
        }
      }));
      // Handle other error logic as needed
    } else if (value > 100 || otherValue > 100) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [key]: {
          ...prevErrors[key as keyof Errors],
          [inputType]: 'Please enter a valid range from 0 to 100'
        }
      }));
      // Handle other error logic as needed
    } else if (
      (inputType === 'from' && value > otherValue) ||
      (inputType === 'to' && +value < otherValue)
    ) {
      // Error handling for 'from' value being greater than 'to' value and vice versa
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [key]: {
          ...prevErrors[key as keyof Errors],
          [inputType]: `'${
            inputType === 'from' ? 'From' : 'To'
          }' value should not be ${
            inputType === 'from' ? 'greater' : 'less'
          } than '${inputType === 'from' ? 'To' : 'From'}' value`
        }
      }));
    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [key]: { from: null, to: null }
      }));
      // Handle other error logic as needed
    }
  };

  return (
    <>
      {' '}
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          {' '}
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.shape')}
          />
        </div>
        <div className={styles.filterSectionData}>
          <CustomImageTile
            overriddenStyles={imageTileStyles}
            imageTileData={advanceSearch.shape}
            selectedTile={selectedShape}
            handleSelectTile={handleShapeChange}
          />
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.carat')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.caratRangeFilter}`}
        >
          <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
            <div>
              <div className="flex gap-5">
                <CustomInputField
                  // style={className}
                  type="number"
                  name="caratRangeFrom"
                  onChange={e => {
                    if (regexPattern.test(e.target.value)) {
                      setValidationError('');
                      setCaratRangeFrom(e.target.value);
                    } else {
                      setValidationError(
                        'Please enter value between “0.01 to 50”'
                      );
                    }
                  }}
                  value={caratRangeFrom}
                  placeholder={ManageLocales('app.advanceSearch.from')}
                  style={{
                    input: `${styles.inputFieldStyles} ${styles.caratInputFieldStyles}`
                  }}
                />
                <CustomInputField
                  // style={className}
                  type="number"
                  name="caratRangeTO"
                  onChange={e => {
                    // Use a regular expression to allow only numbers with up to two decimal places
                    if (regexPattern.test(e.target.value)) {
                      setCaratRangeTo(e.target.value);
                      setValidationError('');
                    } else {
                      setValidationError(
                        'Please enter value between “0.10 to 50”'
                      );
                    }
                  }}
                  value={caratRangeTo}
                  placeholder={ManageLocales('app.advanceSearch.to')}
                  style={{
                    input: `${styles.inputFieldStyles} ${styles.caratInputFieldStyles}`
                  }}
                />
              </div>
            </div>
            <CustomSelectionButton
              selectionButtonLabel={ManageLocales('app.advanceSearch.addCarat')}
              data={`${caratRangeFrom}-${caratRangeTo}`}
              handleClick={handleAddCarat}
              selectionButtonAllStyles={{
                selectionButtonStyle: `${styles.addCarat}`
              }}
            />
            <div className="ml-2 flex">
              {renderSelectionButtons(
                selectedCaratRange,
                '',
                styles.activeOtherStyles,
                selectedCaratRange,
                handleCaratRangeChange,
                true
              )}
            </div>
          </div>
          <div className="text-red-500 text-xs ml-2 ">
            {validationError && validationError}
          </div>
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.clarity')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.clarity,
            '',
            styles.activeOtherStyles,
            selectedClarity,
            handleClarityChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.color')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.color,
            '',
            styles.activeOtherStyles,
            selectedColor,
            handleColorChange
          )}
        </div>
      </div>
      <div className={`mb-2 ${styles.filterSection}`}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.fancy')}
          />
        </div>
        <div
          className={`flex ${styles.filterSectionData}`}
          style={{ paddingLeft: '10px' }}
        >
          <CustomSelect
            data={advanceSearch.fancyColor}
            onChange={handleFancyFilterChange}
            placeholder={
              selectedFancyColor?.length
                ? selectedFancyColor
                : ManageLocales('app.advanceSearch.fancyColor')
            }
            style={{
              selectTrigger: styles.fancyDropdownHeader,
              selectContent: `h-[25vh] overflow-auto ${styles.dropdownData}`,
              selectElement: styles.selectElement
            }}
          />
          <CustomSelect
            data={advanceSearch.intensity}
            onChange={handleIntensityChange}
            placeholder={ManageLocales('app.advanceSearch.intensity')}
            style={{
              selectTrigger: styles.fancyDropdownHeader,
              selectContent: `h-[25vh] overflow-auto ${styles.dropdownData}`,
              selectElement: styles.selectElement
            }}
          />
          <CustomSelect
            data={advanceSearch.overtone}
            onChange={handleOvertoneChange}
            placeholder={ManageLocales('app.advanceSearch.overtone')}
            style={{
              selectTrigger: styles.fancyDropdownHeader,
              selectContent: `h-[25vh] overflow-auto ${styles.dropdownData}`,
              selectElement: styles.selectElement
            }}
          />
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.make')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.make,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedMake,
            handleMakeChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.cut')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.cut,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedCut,
            handleCutChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.polish')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.polish,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedPolish,
            handlePolishChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.symmetry')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.symmetry,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedSymmetry,
            handleSymmetryChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.fluorescence')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.fluorescence,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedFluorescence,
            handleFluorescenceChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.lab')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.lab,
            styles.countryOriginStyle,
            styles.activeOtherStyles,
            selectedLab,
            handleLabChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.HA')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.brilliance,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedHR,
            handleHRChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.brilliance')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.brilliance,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedBrilliance,
            handleBrillianceChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.location')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.location,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedLocation,
            handleLocation
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.origin')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.origin,
            styles.countryOriginStyle,
            styles.activeOtherStyles,
            selectedOrigin,
            handleOrigin
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.Shade')}
          />
        </div>
        <div className={styles.filterSectionData}>
          <div>
            {renderSelectionButtons(
              advanceSearch.color_shade,
              `${styles.commonSelectionStyle} ${styles.shadeSelectionStyle}`,
              styles.activeOtherStyles,
              selectedTinge,
              handleTingeChange
            )}
          </div>
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.discount')}
          />
        </div>
        <div
          className={`${styles.filterSectionData}`}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '10px'
          }}
        >
          <div style={{ width: '18%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <CustomInputField
                type="number"
                name="discountFrom"
                onChange={e => {
                  setDiscountFrom(e.target.value);
                  handleValidate(
                    'discount',
                    'from',
                    e.target.value,
                    discountTo
                  );
                }}
                value={discountFrom}
                placeholder={ManageLocales('app.advanceSearch.from')}
                style={{
                  input: styles.inputFieldStyles
                }}
              />
              <CustomInputField
                // style={className}
                type="number"
                name="discountTo"
                onChange={e => {
                  setDiscountTo(e.target.value);
                  handleValidate(
                    'discount',
                    'to',
                    e.target.value,
                    discountFrom
                  );
                }}
                value={discountTo}
                placeholder={ManageLocales('app.advanceSearch.to')}
                style={{
                  input: styles.inputFieldStyles
                }}
              />
            </div>
            <div className={styles.validationMessage}>
              {errors?.discount.from ?? errors?.discount.to}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              width: '30%',
              justifyContent: 'space-between'
            }}
          >
            {' '}
            <div className={styles.filterSectionLabel} style={{ width: '40%' }}>
              <CustomInputlabel
                htmlfor="text"
                label={ManageLocales('app.advanceSearch.pricePerCarat')}
              />
            </div>
            <div style={{ width: '60%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CustomInputField
                  // style={className}
                  type="number"
                  name="pricePerCaratFrom"
                  onChange={e => {
                    setPricePerCaratFrom(e.target.value);
                    handleValidate(
                      'price_per_carat',
                      'from',
                      e.target.value,
                      pricePerCaratTo
                    );
                  }}
                  value={pricePerCaratFrom}
                  placeholder={ManageLocales('app.advanceSearch.from')}
                  style={{
                    input: styles.inputFieldStyles
                  }}
                />
                <CustomInputField
                  type="number"
                  name="pricePerCaratTo"
                  onChange={e => {
                    setPricePerCaratTo(e.target.value);
                    handleValidate(
                      'price_per_carat',
                      'to',
                      e.target.value,
                      pricePerCaratFrom
                    );
                  }}
                  value={pricePerCaratTo}
                  placeholder={ManageLocales('app.advanceSearch.to')}
                  style={{
                    input: styles.inputFieldStyles
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ width: '30%', display: 'flex' }}>
            <div className={styles.filterSectionLabel} style={{ width: '40%' }}>
              <CustomInputlabel
                htmlfor="text"
                label={ManageLocales('app.advanceSearch.amountRange')}
              />
            </div>
            <div style={{ width: '60%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CustomInputField
                  // style={className}
                  type="number"
                  name="priceRangeFrom"
                  onChange={e => {
                    setPriceRangeFrom(e.target.value);
                  }}
                  value={priceRangeFrom}
                  placeholder={ManageLocales('app.advanceSearch.from')}
                  style={{
                    input: styles.inputFieldStyles
                  }}
                />
                <CustomInputField
                  // style={className}
                  type="number"
                  name="priceRangeTo"
                  onChange={e => {
                    setPriceRangeTo(e.target.value);
                    handleValidate(
                      'price_range',
                      'to',
                      e.target.value,
                      priceRangeFrom
                    );
                  }}
                  value={priceRangeTo}
                  placeholder={ManageLocales('app.advanceSearch.to')}
                  style={{
                    input: styles.inputFieldStyles
                  }}
                />
              </div>

              {validationError}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.parameter')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.filterWrapSection} `}
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          {renderMeasurementField(state, setState)}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales(
              'app.advanceSearch.inclusionsAndOtherParameter'
            )}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div className={styles.filterSectionData}>
          <div className={styles.filterSection}>
            {renderOtherParameterFields(state, setState)}
          </div>
        </div>
      </div>
      <div className={`${styles.filterSection} ${styles.filterWrapSection}`}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.keyToSymbol')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column' }}
          className={styles.filterSectionData}
        >
          <div
            className={`${styles.filterSection} ${styles.filterWrapSection}`}
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {renderSelectionButtons(
              advanceSearch.key_to_symbol,
              '',
              styles.activeOtherStyles,
              selectedKeyToSymbol,
              handleKeyToSymbolChange
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default renderContent;
