import { useState } from 'react';

export const useErrorStateManagement = () => {
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [inputError, setInputError] = useState('');

  const [isSliderError, setIsSliderError] = useState(false);
  const [sliderErrorText, setSliderErrorText] = useState('');

  const [messageColor, setMessageColor] = useState<string>('dangerMain');

  return {
    errorState: {
      isError,
      errorText,
      inputError,
      isSliderError,
      sliderErrorText,
      messageColor
    },
    errorSetState: {
      setIsError,
      setErrorText,
      setInputError,
      setIsSliderError,
      setSliderErrorText,
      setMessageColor
    }
  };
};
