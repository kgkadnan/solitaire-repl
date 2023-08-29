import React from 'react';
import CustomPagination from '.';

export const PaginationExample = () => {
  const objectData = [
    { id: 1, name: 'Product A', price: 10 },
    { id: 2, name: 'Product B', price: 20 },
    { id: 3, name: 'Product B', price: 20 },
    { id: 4, name: 'Product B', price: 20 },
    { id: 5, name: 'Product B', price: 20 },
    { id: 6, name: 'Product B', price: 20 },
    // ...
  ];
  return <CustomPagination data={objectData} />;
};
