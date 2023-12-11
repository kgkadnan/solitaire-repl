'use client';
import { CustomSearchInputField } from '@/components/common/search-input';
import { ManageLocales } from '@/utils/translate';
import { SearchIcon } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import styles from '../my-diamonds.module.scss';
import { IHeaderSearchBarProps } from '../my-diamonds-interface';

export const HeaderSearchBar: React.FC<IHeaderSearchBarProps> = ({
  activeTab,
  setRecentConfiramtionSearchUrl,
  setMyInvoiceSearchUrl,
  setPreviousConfirmationSearchUrl
}: any) => {
  const [search, setsearch] = useState<string>('');
  // Handle search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setsearch(inputValue);

    if (!inputValue.length) {
      setRecentConfiramtionSearchUrl('');
      setMyInvoiceSearchUrl('');
      setPreviousConfirmationSearchUrl('');
    } else {
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
      <SearchIcon className="stroke-solitaireQuaternary mt-[10px]" />
      <CustomSearchInputField
        type="text"
        name="Search"
        style={searchInputStyle}
        value={search}
        onChange={handleSearch}
        placeholder={
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
