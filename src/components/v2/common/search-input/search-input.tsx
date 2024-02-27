import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './search-input.module.scss';
import { Input } from '@components/ui/input';
import searchIcon from '@public/v2/assets/icons/saved-search/search-icon.svg';
import Image from 'next/image';

interface ISearchInputProps {
  type: string;
  value?: string;
  name: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  suggestions?: any[];
  handleSuggestionClick?: (suggestion: string) => void;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setShowSuggestions: any;
  showSuggestions: boolean;
}

const SearchInputField: React.FC<ISearchInputProps> = ({
  type,
  value,
  name,
  onChange,
  placeholder,
  suggestions,
  handleSuggestionClick,
  setShowSuggestions,
  showSuggestions,
  handleKeyPress
}) => {
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
        handleSuggestionClick?.(suggestions[selectedSuggestionIndex]);
      }
      setShowSuggestions(false); // Close suggestions after hitting Enter
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

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  return (
    <div className={styles.searchInputMain}>
      <div className="relative">
        <div className={styles.searchIcon}>
          <Image src={searchIcon} alt="Search Icon" />
        </div>
        <Input
          data-testid="custom-search-input"
          className={`${styles.defaultSearchInputStyle} ${styles.searchInput}`}
          type={type}
          name={name}
          autoComplete="off"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress ? handleKeyPress : handleKeyDown}
        />
      </div>
      {showSuggestions && suggestions && (
        <ul
          className={`${styles.dropdown} ${
            isNudge ? 't-[300px]' : 't-[200px]'
          }`}
        >
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

export default SearchInputField;
