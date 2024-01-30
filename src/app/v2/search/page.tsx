'use client';
import React from 'react';
import { SubRoutes } from '@/constants/v2/enums/routes';
import { useSearchParams } from 'next/navigation';
import Form from './form/form';
import Result from './result/result';

const Search = () => {
  const subRoute = useSearchParams().get('active-tab');

  return (
    <>
      <div>{subRoute === SubRoutes.NEW_SEARCH ? <Form /> : <Result />}</div>
    </>
  );
};

export default Search;
