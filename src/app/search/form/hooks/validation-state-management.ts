import { useState } from 'react';

export interface Errors {
  discount: { from: string | null; to: string | null };
  price_range: { from: string | null; to: string | null };
  price_per_carat: { from: string | null; to: string | null };
}

const useValidationStateManagement = () => {
  const [validationError, setValidationError] = useState('');
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
  const [searchCount, setSearchCount] = useState<number>(-1);
  const [saveSearchName, setSaveSearchName] = useState<string>('');
  const [searchUrl, setSearchUrl] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [addSearches, setAddSearches] = useState<any[]>([]);
  const [isValidationError, setIsValidationError] = useState<boolean>(false);
  const [inputError, setInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState('');
  const [selectedStep, setSelectedStep] = useState('');
  const [selectedShadeContain, setSelectedShadeContain] = useState('');
  const [errors, setErrors] = useState<Errors>({
    discount: { from: null, to: null },
    price_range: { from: null, to: null },
    price_per_carat: { from: null, to: null }
    // Add more input groups here if needed
  });

  return {
    validationError,
    setValidationError,
    isInputDialogOpen,
    setIsInputDialogOpen,
    errors,
    setErrors,
    selectedStep,
    setSelectedStep,
    selectedShadeContain,
    setSelectedShadeContain,
    searchCount,
    setSearchCount,
    searchUrl,
    setSearchUrl,
    isError,
    setIsError,
    errorText,
    setErrorText,
    addSearches,
    setAddSearches,
    isValidationError,
    setIsValidationError,
    inputError,
    setInputError,
    inputErrorContent,
    setInputErrorContent,
    saveSearchName,
    setSaveSearchName
  };
};

export default useValidationStateManagement;
