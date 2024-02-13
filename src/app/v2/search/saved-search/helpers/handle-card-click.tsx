import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { ISavedSearchData } from '../saved-search-interface';
import {
  MAX_SAVED_SEARCH_COUNT,
  MAX_SEARCH_TAB_LIMIT
} from '@/constants/business-logic';
import { MODIFY_SEARCH_STONES_EXCEEDS_LIMIT } from '@/constants/error-messages/saved';
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import ActionButton from '@/components/v2/common/action-button';
import Image from 'next/image';
import { ManageLocales } from '@/utils/v2/translate';
import { ReactNode } from 'react';

export const isSearchAlreadyExcist = (data: any, nameToFind: string) => {
  const foundSearch = data.find(
    (search: any) => search.saveSearchName === nameToFind
  );
  return foundSearch ? data.indexOf(foundSearch) : null;
};

//Handles the click event on a saved search card.
export const handleCardClick = ({
  id,
  savedSearchData,
  router,
  triggerProductCountApi,
  setDialogContent,
  setIsDialogOpen
}: {
  id: string;
  savedSearchData: ISavedSearchData[];
  router: any;
  triggerProductCountApi: any;
  setDialogContent: React.Dispatch<React.SetStateAction<ReactNode>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Filter the saved search data to get the clicked card's data

  const cardClickData: any = savedSearchData.filter(
    (items: ISavedSearchData) => {
      return items.id === id;
    }
  );

  // Construct the search URL from the card's metadata
  const searchUrl = constructUrlParams(cardClickData[0].meta_data);
  triggerProductCountApi({ searchUrl }).then((response: any) => {
    if (response.data !== undefined) {
      // Filter the saved search data to get the clicked card's data
      const specificCardData: any = savedSearchData.filter(
        (items: ISavedSearchData) => {
          return items.id === id;
        }
      );
      // Check if the product data count exceeds the maximum limit
      if (response?.data?.count > MAX_SAVED_SEARCH_COUNT) {
        setIsDialogOpen(true);
        setDialogContent(
          <>
            {' '}
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={warningIcon} alt="warningIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
              <div>
                <h1 className="text-headingS text-neutral900">
                  {' '}
                  {MODIFY_SEARCH_STONES_EXCEEDS_LIMIT}
                </h1>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1'
                  }
                ]}
              />
            </div>
          </>
        );
      } else {
        const data: any = JSON.parse(localStorage.getItem('Search')!);

        if (data?.length) {
          // Check if the maximum search tab limit is reached
          if (data?.length >= MAX_SEARCH_TAB_LIMIT) {
            setDialogContent(
              <>
                {' '}
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={warningIcon} alt="warningIcon" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
                  <div>
                    <h1 className="text-headingS text-neutral900">
                      {' '}
                      {ManageLocales('app.savedSearch.maxTabReached')}
                    </h1>
                    <p className="text-neutral600 text-mRegular">
                      {ManageLocales('app.savedSearch.maxTabReached.content')}
                    </p>
                  </div>
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'secondary',
                        label: ManageLocales('app.modal.cancel'),
                        handler: () => {
                          setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1'
                      },
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.manageTabs'),
                        handler: () => {
                          router.push(
                            `${Routes.SEARCH}?active-tab=${
                              SubRoutes.RESULT
                            }-${1}`
                          );
                        },
                        customStyle: 'flex-1'
                      }
                    ]}
                  />
                </div>
              </>
            );
            setIsDialogOpen(true);
          } else {
            // Add the clicked search to local storage and navigate to the search result page
            let isAlreadyOpenIndex = isSearchAlreadyExcist(
              data,
              specificCardData[0].name
            );
            if (isAlreadyOpenIndex) {
              router.push(
                `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                  isAlreadyOpenIndex + 1
                }`
              );
            } else {
              const localStorageData = [
                ...data,
                {
                  saveSearchName: specificCardData[0].name,
                  isSavedSearch: true,
                  searchId: response?.data?.search_id,
                  queryParams: specificCardData[0].meta_data,
                  id: specificCardData[0].id
                }
              ];

              localStorage.setItem('Search', JSON.stringify(localStorageData));
              router.push(
                `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                  data.length + 1
                }`
              );
            }
          }
        } else {
          // If no data in local storage, create a new entry and navigate to the search result page
          let localStorageData = [
            {
              saveSearchName: specificCardData[0].name,
              isSavedSearch: true,
              searchId: response?.data?.search_id,
              queryParams: specificCardData[0].meta_data,
              id: specificCardData[0].id
            }
          ];

          localStorage.setItem('Search', JSON.stringify(localStorageData));
          router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${1}`);
        }
      }
    }
  });
};
