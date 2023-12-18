'use client';
import { CustomSearchInputField } from '@/components/common/search-input';
import { ManageLocales } from '@/utils/translate';
import { SearchIcon } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import styles from '../my-diamonds.module.scss';
import { IHeaderSearchBarProps } from '../interface/my-diamonds-interface';
import ClearIcon from '@public/assets/icons/close-outline.svg?url';

export const HeaderSearchBar: React.FC<IHeaderSearchBarProps> = ({
  activeTab,
  setRecentConfiramtionSearchUrl,
  setMyInvoiceSearchUrl,
  setPreviousConfirmationSearchUrl
}) => {
  // State to manage the search input value
  const [search, setsearch] = useState<string>('');

  //  Handles the change of the search input.
  const handleSearch = (e: any) => {
    const inputValue = e.target.value;

    // Update the search input value
    setsearch(inputValue);

    if (!inputValue) {
      setRecentConfiramtionSearchUrl('');
      setMyInvoiceSearchUrl('');
      setPreviousConfirmationSearchUrl('');
    }
  };

  // Style for the search input
  let searchInputStyle = {
    searchInput: styles.headerInputStyle,
    searchInputMain: 'relative'
  };

  // Handle Enter key press for login
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e);
      if (activeTab === 'Recent Confirmations') {
        setRecentConfiramtionSearchUrl(`display_id=${search}`);
      } else if (activeTab === 'My Invoices') {
        setMyInvoiceSearchUrl(`invoice_id=${search}`);
      } else {
        setPreviousConfirmationSearchUrl(`invoice_id=${search}`);
      }
    }
  };

  const handleClearInput = () => {
    setsearch('');
    setRecentConfiramtionSearchUrl('');
    setMyInvoiceSearchUrl('');
    setPreviousConfirmationSearchUrl('');
  };
  return (
    <div className="flex">
      {/* Search icon */}
      <SearchIcon className="stroke-solitaireQuaternary mt-[10px] mr-[15px]" />
      {/* CustomSearchInputField component for the search input */}
      <CustomSearchInputField
        type="text"
        name="Search"
        style={searchInputStyle}
        value={search}
        onChange={handleSearch}
        handleKeyPress={handleKeyDown}
        placeholder={
          // Dynamic placeholder based on the active tab
          activeTab === 'Recent Confirmations'
            ? ManageLocales(
                'app.myDiamonds.RecentConfirmations.header.searchByOrderId'
              )
            : ManageLocales(
                'app.myDiamonds.MyInvoices.header.searchByInvoiceId'
              )
        }
      />

      <div
        className="cursor-pointer border-b border-solitaireQuaternary"
        onClick={handleClearInput}
      >
        <ClearIcon className="stroke-solitaireQuaternary mt-[10px] " />
      </div>
    </div>
  );
};
