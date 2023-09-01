// components/LanguageSelector.js
import React from 'react';
import { useDispatch } from 'react-redux';

const LanguageSelector = () => {
  const dispatch = useDispatch();

  const handleLanguageChange = (language: string) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('fr')}>French</button>
      {/* Add more language options */}
    </div>
  );
};

export default LanguageSelector;
