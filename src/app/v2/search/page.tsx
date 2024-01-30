'use client';
import React from 'react';
import { Routes } from '@/constants/v2/enums/routes';
import { useSearchParams } from 'next/navigation';
import Form from './form/form';
import Result from './result/result';

const Search = () => {
  const editSubRoute = useSearchParams().get('edit');

  return (
    <>
      <div>{editSubRoute === Routes.NEW_SEARCH ? <Form /> : <Result />}</div>
    </>
  );
};

export default Search;
