'use client';

import React from 'react';
import { IHeaderSearchBarProps } from '../interface';
import ClearIcon from '@public/assets/icons/close-outline.svg?url';
import { ManageLocales } from '@/utils/v2/translate';
import SearchInputField from '@/components/v2/common/search-input/search-input';
import { PENDING_INVOICE } from '@/constants/business-logic';

export const HeaderSearchBar: React.FC<IHeaderSearchBarProps> = ({
  activeTab,
  handleSearch,
  search,
  handleClearInput,
  setShowSuggestions,
  showSuggestions
}) => {
  return (
    <div className="flex">
      <div className="relative">
        {/* CustomSearchInputField component for the search input */}
        <SearchInputField
          type="text"
          name="Search"
          value={search}
          onChange={handleSearch}
          placeholder={
            // Dynamic placeholder based on the active tab
            activeTab === PENDING_INVOICE
              ? ManageLocales('app.myDiamonds.pendingInvoice.searchByOrderId')
              : ManageLocales('app.myDiamonds.activeInvoice.searchByInvoiceId')
          }
          setShowSuggestions={setShowSuggestions}
          showSuggestions={showSuggestions}
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
