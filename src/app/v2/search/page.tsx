'use client';
import React, { useEffect, useState } from 'react';
import { SubRoutes } from '@/constants/v2/enums/routes';
import { useSearchParams } from 'next/navigation';
import Form from './form/form';
import Result from './result/result';
import useValidationStateManagement from './hooks/validation-state-management';
import { constructUrlParams } from '@/utils/v2/construct-url-params';

const Search = () => {
  const subRoute = useSearchParams().get('active-tab');
  const editRoute = useSearchParams().get('edit');

  const [activeTab, setActiveTab] = useState(0);
  const [searchParameters, setSearchParameters] = useState([]);
  const [tabCount, setTabCount] = useState(0);

  const { setSearchUrl, searchUrl } = useValidationStateManagement();

  useEffect(() => {
    if (
      subRoute !== SubRoutes.NEW_SEARCH &&
      subRoute !== SubRoutes.SAVED_SEARCH
    ) {
      const replaceSubrouteWithSearchResult = subRoute?.replace(
        `${SubRoutes.RESULT}-`,
        ''
      );
      setActiveTab(parseInt(replaceSubrouteWithSearchResult!));
    }
  }, [subRoute]);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const yourSelection = localStorage.getItem('Search');

      if (yourSelection) {
        const parseYourSelection = JSON.parse(yourSelection);
        setTabCount(parseYourSelection.length);

        //   // Always fetch data, even on initial load
        const url = constructUrlParams(
          parseYourSelection[activeTab - 1]?.queryParams
        );
        setSearchUrl(url);
        setSearchParameters(parseYourSelection);
      }
    };

    fetchMyAPI();
  }, [localStorage.getItem('Search')!]);
  console.log(tabCount);
  return (
    <>
      <div>
        {subRoute === SubRoutes.NEW_SEARCH || editRoute === SubRoutes.RESULT ? (
          <Form
            searchUrl={searchUrl}
            setSearchUrl={setSearchUrl}
            activeTab={activeTab}
            searchParameters={searchParameters}
          />
        ) : (
          <Result activeTab={activeTab} searchParameters={searchParameters} />
        )}
      </div>
    </>
  );
};

export default Search;
