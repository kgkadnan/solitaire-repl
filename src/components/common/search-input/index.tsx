'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './search-input.module.scss';
import { Input } from '@components/ui/input';

interface IInputStyle {
  searchInput: string;
  searchInputMain?: string;
}

interface InputFieldProps {
  style?: IInputStyle;
  type: string;
  value?: string;
  name: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  suggestions?: any;
  handleSuggestionClick?: any;
}

export const CustomSearchInputField: React.FC<InputFieldProps> = ({
  style,
  type,
  value,
  name,
  onChange,
  placeholder,
  suggestions,
  handleSuggestionClick
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedSuggestionIndex(
        prevIndex => (prevIndex + 1) % suggestions?.length
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedSuggestionIndex(
        prevIndex => (prevIndex - 1 + suggestions.length) % suggestions.length
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (suggestions && suggestions.length > 0) {
        handleSuggestionClick(value);
      }
    }
  };

  useEffect(() => {
    setSelectedSuggestionIndex(0);
  }, [suggestions]);

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <>
      <div className={`${style?.searchInputMain}`}>
        <Input
          data-testid="custom-search-input"
          className={`${styles.defaultSearchInputStyle} ${style?.searchInput}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
        />
        {showSuggestions && suggestions?.length > 0 && (
          <ul className={styles.dropdown}>
            {suggestions.map((suggestion: any, index: any) => (
              <li
                key={index}
                className={
                  index === selectedSuggestionIndex
                    ? `${styles.selectedSuggestion} ${styles.suggestion}`
                    : styles.suggestion
                }
                onClick={() => {
                  handleSuggestionClick(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
