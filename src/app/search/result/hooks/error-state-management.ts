import { useState } from 'react';

export const UseErrorStateManagement = () => {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [inputError, setInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState('');
  return {
    errorState: {
      isError,
      errorText,
      inputError,
      inputErrorContent,
    },
    errorSetState: {
      setIsError,
      setErrorText,
      setInputError,
      setInputErrorContent,
    },
  };
};
