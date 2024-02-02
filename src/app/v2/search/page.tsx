'use client';
import React, { useState } from 'react';
import { SubRoutes } from '@/constants/v2/enums/routes';
import { useSearchParams } from 'next/navigation';
import Form from './form/form';
import Result from './result/result';
import useValidationStateManagement from './hooks/validation-state-management';

const Search = () => {
  const [breadcrumRoutes, setBreadcrumRoutes] = useState([
  ]);
  const subRoute = useSearchParams().get('active-tab');
  const [activeTab, setActiveTab] = useState(0);
const [searchParameters,setSearchParameters]=useState([])

const {
  setSearchUrl,
  searchUrl,

} = useValidationStateManagement();
  return (
    <>
      <div>{subRoute === SubRoutes.NEW_SEARCH ? <Form searchUrl={searchUrl} setSearchUrl={setSearchUrl}/> : <Result searchUrl={searchUrl} setSearchUrl={setSearchUrl} activeTab={activeTab} searchParameters={searchParameters} setSearchParameters={setSearchParameters}
      />}</div>
    </>
  );
};

export default Search;
