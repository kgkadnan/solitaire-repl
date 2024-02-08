import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './search-input.module.scss';
import { Input } from '@components/ui/input';

interface ISearchInputProps {
  type: string;
  value?: string;
  name: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  suggestions?: any[];
  handleSuggestionClick?: (suggestion: string) => void;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CustomSearchInputField: React.FC<ISearchInputProps> = ({
  type,
  value,
  name,
  onChange,
  placeholder,
  suggestions,
  handleSuggestionClick,
  handleKeyPress
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedSuggestionIndex(
        prevIndex => (prevIndex + 1) % (suggestions?.length || 1)
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedSuggestionIndex(
        prevIndex =>
          (prevIndex - 1 + (suggestions?.length || 1)) %
          (suggestions?.length || 1)
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (suggestions && suggestions.length > 0) {
        handleSuggestionClick?.(value || '');
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
    <div className={styles.searchInputMain}>
      <Input
        data-testid="custom-search-input"
        className={`${styles.defaultSearchInputStyle} ${styles.searchInput}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyPress ?? handleKeyDown}
      />
      {showSuggestions && suggestions && (
        <ul className={styles.dropdown}>
          {suggestions.map((suggestion: string, index: number) => (
            <li
              key={index}
              className={`${
                index === selectedSuggestionIndex
                  ? styles.selectedSuggestion
                  : ''
              } ${styles.suggestion}`}
              onClick={() => {
                handleSuggestionClick?.(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSearchInputField;
