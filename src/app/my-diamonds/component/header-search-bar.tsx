'use client';
import { CustomSearchInputField } from '@/components/common/search-input';
import { ManageLocales } from '@/utils/translate';
import { SearchIcon } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import styles from '../my-diamonds.module.scss';
import { IHeaderSearchBarProps } from '../interface/my-diamonds-interface';

export const HeaderSearchBar: React.FC<IHeaderSearchBarProps> = ({
  activeTab,
  setRecentConfiramtionSearchUrl,
  setMyInvoiceSearchUrl,
  setPreviousConfirmationSearchUrl
}) => {
  // State to manage the search input value
  const [search, setsearch] = useState<string>('');

  //  Handles the change of the search input.
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Update the search input value
    setsearch(inputValue);

    // Reset search URLs if the input is empty
    if (!inputValue.length) {
      setRecentConfiramtionSearchUrl('');
      setMyInvoiceSearchUrl('');
      setPreviousConfirmationSearchUrl('');
    } else {
      // Set search URLs based on the active tab
      if (activeTab === 'Recent Confirmations') {
        setRecentConfiramtionSearchUrl(`display_id=${inputValue}`);
      } else if (activeTab === 'My Invoices') {
        setMyInvoiceSearchUrl(`invoice_id=${inputValue}`);
      } else {
        setPreviousConfirmationSearchUrl(`invoice_id=${inputValue}`);
      }
    }
  };

  // Style for the search input
  let searchInputStyle = {
    searchInput: styles.headerInputStyle,
    searchInputMain: 'relative'
  };
  return (
    <div className="flex gap-[15px]">
      {/* Search icon */}
      <SearchIcon className="stroke-solitaireQuaternary mt-[10px]" />
      {/* CustomSearchInputField component for the search input */}
      <CustomSearchInputField
        type="text"
        name="Search"
        style={searchInputStyle}
        value={search}
        onChange={handleSearch}
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
    </div>
  );
};
