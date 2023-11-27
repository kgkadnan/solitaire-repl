import { useState } from 'react';
export interface Errors {
  discount: { from: string | null; to: string | null };
  price_range: { from: string | null; to: string | null };
  price_per_carat: { from: string | null; to: string | null };
  // Add more input groups here if needed
}
const validationStateManagement = () => {
  const [validationError, setValidationError] = useState('');
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
  const [searchCount, setSearchCount] = useState<number>(-1);
  const [saveSearchName, setSaveSearchName] = useState<string>('');
  const [searchUrl, setSearchUrl] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [addSearches, setAddSearches] = useState<any[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('');
  const [isValidationError, setIsValidationError] = useState<boolean>(false);
  const [inputError, setInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState('');
  const [selectedStep, setSelectedStep] = useState('');
  const [errors, setErrors] = useState<Errors>({
    discount: { from: null, to: null },
    price_range: { from: null, to: null },
    price_per_carat: { from: null, to: null },
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
    showToast,
    setShowToast,
    toastErrorMessage,
    setToastErrorMessage,
    isValidationError,
    setIsValidationError,
    inputError,
    setInputError,
    inputErrorContent,
    setInputErrorContent,
    saveSearchName, setSaveSearchName
  };
};
export default validationStateManagement;
