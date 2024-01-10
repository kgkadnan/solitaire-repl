'use client';
import React, { useRef, useEffect, useState } from 'react';
import styles from './checkbox.module.scss';
import { Checkbox } from '@/components/ui/checkbox';
import { handleCheckboxClick } from './helper/handle-checkbox-click';

interface ICustomCheckboxProps {
  data: string;
  isChecked: string[];
  isInput?: boolean;
  inputName?: string;
  inputValue?: string;
  handleChange?: (value: string) => void;
  placeholder?: string;
  inputStyle?: string;
  style?: string;
  setIsCheck?: any;
  setIsCheckAll?: any;
  isCheckAll?: any;
  row: any;
  setIsError?: any;
  checkboxLabel?: string;
  checkboxHandleFunction?: (value: string[]) => void;
}

export const CustomCheckBox: React.FC<ICustomCheckboxProps> = ({
  data,
  isInput,
  inputName,
  inputValue,
  handleChange,
  placeholder,
  inputStyle,
  style,
  isChecked,
  setIsCheck,
  setIsCheckAll,
  isCheckAll,
  row,
  setIsError,
  checkboxLabel,
  checkboxHandleFunction
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const checkboxRef = useRef<any>(null);

  // State to manage the checkbox's checked status
  const [isCheckedState, setIsCheckedState] = useState(
    isChecked?.includes(data)
  );

  // Handle changes in the input field
  const onInputChange = (value: string) => {
    // Update the state of the input value if there's a handler provided
    if (handleChange) {
      handleChange(value);
    }
    // Update the checkbox state based on whether the input is empty
    setIsCheckedState(value !== '');
  };

  const handleInputClick = () => {
    if (checkboxRef.current && !inputValue) {
      checkboxRef.current.click();
    }
  };

  let handleCheckbox = () => {
    handleCheckboxClickWrapper();
    setIsCheck((prevIsCheck: any) => {
      checkboxHandleFunction && checkboxHandleFunction(prevIsCheck);
      return prevIsCheck;
    });
  };

  const handleCheckboxClickWrapper = () => {
    handleCheckboxClick({
      id: data,
      isCheck: isChecked,
      setIsCheck,
      setIsCheckAll,
      isCheckAll,
      data: row,
      setIsError
    });
    if (isInput && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    // Update the checkbox state based on whether it's checked in the isChecked array
    setIsCheckedState(isChecked?.includes(data));
  }, [isChecked, data]);

  return (
    <div className="flex items-center space-x-2">
      <div className={`flex`}>
        <Checkbox
          data-testid={`custom-checkbox-${data}`}
          key={`checkbox-${data}`}
          id={data}
          ref={checkboxRef}
          checked={isCheckedState}
          onClick={handleCheckbox}
          className={`${styles.defaultCheckbox} ${style}`}
        />
        {checkboxLabel && <p>{checkboxLabel}</p>}
      </div>

      {isInput && (
        <input
          className={`${styles.Border} ${inputStyle} bg-transparent focus:outline-none text-solitaireTertiary ml-2`}
          type="text"
          name={inputName}
          value={inputValue}
          onChange={e => onInputChange(e.target.value)}
          onClick={handleInputClick}
          ref={inputRef}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};
