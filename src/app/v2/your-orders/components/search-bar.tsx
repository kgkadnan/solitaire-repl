'use client';

import React, { useState } from 'react';
import { IHeaderSearchBarProps } from '../interface';
import ClearIcon from '@public/assets/icons/close-outline.svg?url';
import { ManageLocales } from '@/utils/v2/translate';
import SearchInputField from '@/components/v2/common/search-input/search-input';
import { ACTIVE_INVOICE, PENDING_INVOICE } from '@/constants/business-logic';

export const HeaderSearchBar: React.FC<IHeaderSearchBarProps> = ({
  activeTab,
  setPendinInvoiceSearchUrl,
  setActiveInvoiceSearchUrl,
  setInvoiceHistorySearchUrl
}) => {
  // State to manage the search input value
  const [search, setsearch] = useState<string>('');

  // Handles the change of the search input.
  const handleSearch = (e: any) => {
    const inputValue = e.target.value;

    // Update the search input value
    setsearch(inputValue);

    if (!inputValue) {
      setPendinInvoiceSearchUrl('');
      setActiveInvoiceSearchUrl('');
      setInvoiceHistorySearchUrl('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e);
      if (activeTab === PENDING_INVOICE) {
        setPendinInvoiceSearchUrl(`display_id=${search}`);
      } else if (activeTab === ACTIVE_INVOICE) {
        setActiveInvoiceSearchUrl(`invoice_id=${search}`);
      } else {
        setInvoiceHistorySearchUrl(`invoice_id=${search}`);
      }
    }
  };

  const handleClearInput = () => {
    setsearch('');
    setPendinInvoiceSearchUrl('');
    setActiveInvoiceSearchUrl('');
    setInvoiceHistorySearchUrl('');
  };

  return (
    <div className="flex">
      <div className="relative">
        {/* CustomSearchInputField component for the search input */}
        <SearchInputField
          type="text"
          name="Search"
          value={search}
          onChange={handleSearch}
          handleKeyPress={handleKeyDown}
          placeholder={
            // Dynamic placeholder based on the active tab
            activeTab === PENDING_INVOICE
              ? ManageLocales('app.myDiamonds.pendingInvoice.searchByOrderId')
              : ManageLocales('app.myDiamonds.activeInvoice.searchByInvoiceId')
          }
        />
        {search && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
            <ClearIcon
              className="stroke-neutral900 cursor-pointer"
              onClick={handleClearInput}
            />
          </div>
        )}
      </div>
    </div>
  );
};
