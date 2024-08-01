'use client';

import React from 'react';
import { IHeaderSearchBarProps } from '../interface';
import ClearIcon from '@public/v2/assets/icons/close-outline.svg?url';
import { ManageLocales } from '@/utils/v2/translate';
import SearchInputField from '@/components/v2/common/search-input/search-input';
import { PENDING } from '@/constants/business-logic';
import ActionButton from '@/components/v2/common/action-button';

export const HeaderSearchBar: React.FC<IHeaderSearchBarProps> = ({
  activeTab,
  handleSearch,
  search,
  handleClearInput,
  setShowSuggestions,
  showSuggestions,
  handleGoSearch,
  handleKeyDown
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
            activeTab === PENDING
              ? 'Search by Order ID/Stock No/Certificate No'
              : ManageLocales('app.myDiamonds.activeInvoice.searchByInvoiceId')
          }
          setShowSuggestions={setShowSuggestions}
          showSuggestions={showSuggestions}
          handleKeyPress={handleKeyDown}
          customStyle={search && '!pr-[110px]'}
        />
        {search && (
          <>
            {activeTab === PENDING && (
              <div className="absolute top-[6px] right-[32px]">
                {' '}
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: 'Search',
                      handler: handleGoSearch,
                      customCtaStyle: '!h-[30px] !text-[12px]',

                      customStyle: 'flex-1 w-full h-[30px]'
                    }
                  ]}
                />
              </div>
            )}
            <div className="absolute inset-y-0 right-0 flex items-center pr-1">
              <ClearIcon
                className="stroke-neutral900 cursor-pointer"
                onClick={handleClearInput}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
