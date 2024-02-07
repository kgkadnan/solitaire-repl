import { useState } from 'react';

export const useErrorStateManagement = () => {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [inputError, setInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState('');

  const [isSliderError, setIsSliderError] = useState(false);
  const [sliderErrorText, setSliderErrorText] = useState('');

  const [messageColor, setMessageColor] = useState<string>('dangerMain');

  return {
    errorState: {
      isError,
      errorText,
      inputError,
      inputErrorContent,
      isSliderError,
      sliderErrorText,
      messageColor
    },
    errorSetState: {
      setIsError,
      setErrorText,
      setInputError,
      setInputErrorContent,
      setIsSliderError,
      setSliderErrorText,
      setMessageColor
    }
  };
};
