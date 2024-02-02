'use client';
import React, { useState } from 'react';
import { SubRoutes } from '@/constants/v2/enums/routes';
import { useSearchParams } from 'next/navigation';
import Form from './form/form';
import Result from './result/result';
import useValidationStateManagement from './hooks/validation-state-management';

const Search = () => {
  const subRoute = useSearchParams().get('active-tab');
  const editRoute = useSearchParams().get('edit');

  const [activeTab, setActiveTab] = useState(0);
  const [searchParameters, setSearchParameters] = useState([]);

  const { setSearchUrl, searchUrl } = useValidationStateManagement();
  return (
    <>
      <div>
        {subRoute === SubRoutes.NEW_SEARCH || editRoute === SubRoutes.RESULT ? (
          <Form
            searchUrl={searchUrl}
            setSearchUrl={setSearchUrl}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchParameters={searchParameters}
            setSearchParameters={setSearchParameters}
          />
        ) : (
          <Result
            searchUrl={searchUrl}
            setSearchUrl={setSearchUrl}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchParameters={searchParameters}
            setSearchParameters={setSearchParameters}
          />
        )}
      </div>
    </>
  );
};

export default Search;
