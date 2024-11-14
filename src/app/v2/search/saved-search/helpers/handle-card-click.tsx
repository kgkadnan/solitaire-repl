import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { ISavedSearchData } from '../saved-search-interface';
import {
  MAX_SAVED_SEARCH_COUNT,
  MAX_SEARCH_TAB_LIMIT,
  MIN_SAVED_SEARCH_COUNT
} from '@/constants/business-logic';
import {
  MODIFY_SEARCH_STONES_EXCEEDS_LIMIT,
  NO_PRODUCT_FOUND
} from '@/constants/error-messages/saved';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { ManageLocales } from '@/utils/v2/translate';
import { ReactNode } from 'react';
import CommonPoppup from '@/app/v2/login/component/common-poppup';

export const isSearchAlreadyExist = (data: any, nameToFind: string) => {
  const foundSearch = data?.find(
    (search: any) =>
      search.saveSearchName.toLowerCase() === nameToFind.toLowerCase()
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
  setIsDialogOpen,
  isMatchingPair,
  setIsLoading
}: {
  id: string;
  savedSearchData: ISavedSearchData[];
  router: any;
  triggerProductCountApi: any;
  setDialogContent: React.Dispatch<React.SetStateAction<ReactNode>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isMatchingPair?: boolean;
}) => {
  // Filter the saved search data to get the clicked card's data
  setIsLoading(true);
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
        setIsLoading(false);
        setIsDialogOpen(true);
        setDialogContent(
          <CommonPoppup
            status="warning"
            content={''}
            customPoppupBodyStyle="!mt-[70px]"
            header={MODIFY_SEARCH_STONES_EXCEEDS_LIMIT}
            actionButtonData={[
              {
                variant: 'primary',
                label: ManageLocales('app.modal.okay'),
                handler: () => {
                  setIsDialogOpen(false);
                },
                customStyle: 'flex-1 h-10'
              }
            ]}
          />
        );
      } else if (response?.data?.count <= MIN_SAVED_SEARCH_COUNT) {
        setIsLoading(false);
        setIsDialogOpen(true);
        setDialogContent(
          <CommonPoppup
            status="warning"
            content={''}
            customPoppupBodyStyle="!mt-[70px]"
            header={NO_PRODUCT_FOUND}
            actionButtonData={[
              {
                variant: 'primary',
                label: ManageLocales('app.modal.okay'),
                handler: () => {
                  setIsDialogOpen(false);
                },
                customStyle: 'flex-1 h-10'
              }
            ]}
          />
        );
      } else {
        const data: any = isMatchingPair
          ? JSON.parse(localStorage.getItem('MatchingPair')!)
          : JSON.parse(localStorage.getItem('Search')!);

        if (data?.length) {
          let isAlreadyOpenIndex = isSearchAlreadyExist(
            data,
            specificCardData[0].name
          );

          if (isAlreadyOpenIndex >= 0 && isAlreadyOpenIndex !== null) {
            isMatchingPair
              ? router.push(
                  `${Routes.MATCHING_PAIR}?active-tab=${SubRoutes.RESULT}-${
                    isAlreadyOpenIndex + 1
                  }`
                )
              : router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                    isAlreadyOpenIndex + 1
                  }`
                );
          }
          // Check if the maximum search tab limit is reached
          else if (data?.length >= MAX_SEARCH_TAB_LIMIT) {
            setDialogContent(
              <CommonPoppup
                status="warning"
                content={ManageLocales('app.savedSearch.maxTabReached.content')}
                customPoppupBodyStyle="!mt-[70px]"
                header={ManageLocales('app.savedSearch.maxTabReached')}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.cancel'),
                    handler: () => {
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 h-10'
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.manageTabs'),
                    handler: () => {
                      isMatchingPair
                        ? router.push(
                            `${Routes.MATCHING_PAIR}?active-tab=${
                              SubRoutes.RESULT
                            }-${1}`
                          )
                        : router.push(
                            `${Routes.SEARCH}?active-tab=${
                              SubRoutes.RESULT
                            }-${1}`
                          );
                    },
                    customStyle: 'flex-1 h-10'
                  }
                ]}
              />
            );
            setIsDialogOpen(true);
          } else {
            // Add the clicked search to local storage and navigate to the search result page              

            const localStorageData = [
              ...data,
              {
                saveSearchName: specificCardData[0].name,
                isSavedSearch: true,
                searchId: response?.data?.search_id,
                queryParams: specificCardData[0].meta_data,
                id: specificCardData[0].id,
                label:(specificCardData[0].name.replace(/\s+/g, '') + ' ' + (data.length + 1))
              }
            ];

            localStorage.setItem(
              isMatchingPair ? 'MatchingPair' : 'Search',
              JSON.stringify(localStorageData)
            );
            isMatchingPair
              ? router.push(
                  `${Routes.MATCHING_PAIR}?active-tab=${SubRoutes.RESULT}-${
                    data.length + 1
                  }`
                )
              : router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                    data.length + 1
                  }`
                );
          }
          setIsLoading(false);
        } else {
          // If no data in local storage, create a new entry and navigate to the search result page
          let localStorageData = [
            {
              saveSearchName: specificCardData[0].name,
              isSavedSearch: true,
              searchId: response?.data?.search_id,
              queryParams: specificCardData[0].meta_data,
              id: specificCardData[0].id,
              label:(specificCardData[0].name.replace(/\s+/g, '') + ' ' + 1)
            }
          ];

          localStorage.setItem(
            isMatchingPair ? 'MatchingPair' : 'Search',
            JSON.stringify(localStorageData)
          );
          isMatchingPair
            ? router.push(
                `${Routes.MATCHING_PAIR}?active-tab=${SubRoutes.RESULT}-${1}`
              )
            : router.push(
                `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${1}`
              );

          setIsLoading(false);
        }
      }
    }
  });
};
