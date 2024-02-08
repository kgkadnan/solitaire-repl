'use client';
import CheckboxComponent from '@/components/v2/common/checkbox';
import { DialogComponent } from '@/components/v2/common/dialog';
import { useLazyGetAllSavedSearchesQuery } from '@/features/api/saved-searches';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect } from 'react';
import { useSavedSearchStateManagement } from './hooks/saved-search-state-management';
import { DisplayTable } from '@/components/v2/common/display-table';
import ActionButton from '@/components/v2/common/action-button';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import { formatCreatedAt } from '@/utils/format-date';

interface ISavedSearch {
  diamond_count: string;
  name: string;
  customer_id: string;
  meta_data: {
    [key: string]: string | string[];
  };
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: string | null;
}

import editIcon from '@public/v2/assets/icons/saved-search/edit-button.svg';
import Image from 'next/image';
import { useCheckboxStateManagement } from '@/components/v2/common/checkbox/hooks/checkbox-state-management';
import { handleSelectAll } from '@/components/v2/common/checkbox/helpers/handle-select-all-checkbox';
import { handleCheckbox } from '@/components/v2/common/checkbox/helpers/handle-checkbox';

const SavedSearch = () => {
  // Fetching saved search data
  const [triggerSavedSearches] = useLazyGetAllSavedSearchesQuery({});
  const { savedSearchSetState, savedSearchState } =
    useSavedSearchStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen } = modalSetState;
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { selectedCheckboxes, selectAllChecked } = checkboxState;
  const { setSelectedCheckboxes, setSelectAllChecked } = checkboxSetState;

  const coloumn = [
    {
      accessor: 'lab',
      label: 'Lab',
      sequence: 1,
      short_label: 'lab'
    },
    {
      accessor: 'shape',
      label: 'Shape',
      sequence: 2,
      short_label: 'Shape'
    },
    {
      accessor: 'carat',
      label: 'Carat',
      sequence: 3,
      short_label: 'carat'
    },
    {
      accessor: 'color',
      label: 'Color',
      sequence: 4,
      short_label: 'Color'
    },
    {
      accessor: 'clarity',
      label: 'Clarity',
      sequence: 5,
      short_label: 'Clarity'
    },
    {
      accessor: 'cut',
      label: 'Cut',
      sequence: 6,
      short_label: 'Cut'
    },
    {
      accessor: 'polish',
      label: 'Polish',
      sequence: 7,
      short_label: 'Polish'
    },
    {
      accessor: 'symmetry',
      label: 'Symmetry',
      sequence: 8,
      short_label: 'Symmetry'
    }
  ];

  useEffect(() => {
    triggerSavedSearches({}).then(res => {
      savedSearchSetState.setSavedSearchData(res.data.savedSearches);
    });
  }, []);

  return (
    <div>
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className="flex h-[81px] items-center">
        <p className="text-headingM font-medium text-neutral900">
          {ManageLocales('app.savedSearch.header')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
        <div className="flex items-center gap-5 rounded-t-[4px] py-[12px] bg-neutral50 border-b-[1px] border-neutral200 px-[16px]">
          <div className="flex items-center gap-3">
            <CheckboxComponent
              onChange={() => {
                handleSelectAll({
                  selectAllChecked,
                  setSelectedCheckboxes,
                  setSelectAllChecked,
                  data: savedSearchState.savedSearchData
                });
              }}
              isChecked={selectAllChecked}
            />
            <p className="text-lRegular text-neutral900 font-medium">
              {ManageLocales('app.savedSearch.selectAll')}
            </p>
          </div>
          <div>search input</div>
        </div>
        <div className="h-[70vh] overflow-auto">
          {savedSearchState.savedSearchData.map(
            ({ id, name, meta_data, created_at }: ISavedSearch) => {
              return (
                <div
                  className="p-[16px] flex flex-col md:flex-row w-full border-b-[1px] border-neutral200 cursor-pointer group hover:bg-neutral50"
                  key={id}
                >
                  <div className="flex items-center gap-[18px] md:w-[40%]">
                    <CheckboxComponent
                      onChange={() =>
                        handleCheckbox({
                          id,
                          selectedCheckboxes,
                          setSelectedCheckboxes
                        })
                      }
                      isChecked={selectedCheckboxes.includes(id)}
                    />
                    <div className="bg-slate-500 text-headingM w-[69px] h-[69px] text-neutral700 uppercase p-[14px] rounded-[4px] font-medium text-center">
                      {name
                        .split(' ') // Split the name into words
                        .map(word => word.charAt(0)) // Extract the first character of each word
                        .join('')}
                    </div>
                    <div className="flex flex-col gap-[18px]">
                      <h1 className="text-neutral900 font-medium text-mMedium capitalize">
                        {name}
                      </h1>
                      <div className="text-neutral700 font-regular text-sMedium">
                        {formatCreatedAt(created_at)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-[50%] mt-4 md:mt-0">
                    <DisplayTable column={coloumn} row={[meta_data]} />
                  </div>
                  <div className="w-full md:w-[10%] flex justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image src={editIcon} alt="editIcon" />
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div className="p-[16px] border-t-[1px] border-neutral200">
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.savedSearch.delete'),
                svg: BinIcon,
                handler: () => {}
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SavedSearch;
