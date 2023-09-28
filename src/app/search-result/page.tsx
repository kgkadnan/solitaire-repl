'use client';
import CustomDataTable, { Rows } from '@/components/common/data-table';
import { CustomFooter } from '@/components/common/footer';
import styles from './search-results.module.scss';
import { ManageLocales } from '@/utils/translate';
import React, { useEffect, useState } from 'react';
import CustomHeader from '@/components/common/header';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import BackSpaceOutline from '@public/assets/icons/backspace-outline.svg?url';
import Image from 'next/image';

interface TableColumn {
  label: string;
  accessor: string;
}

const data = {
  Search1: [
    {
      id: '1',
      stock_no: '789456465',
      email: 'john@example.com',
      age: 35,
      status: 'A',
      image: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
  ],
  Search2: [
    {
      id: '3',
      stock_no: '123456789',
      email: 'alex@example.com',
      age: 28,
      status: 'A',
      image: {
        gia: '/dummy3',
        stone: '/dummy4',
      },
    },
    {
      id: '4',
      stock_no: '987654321',
      email: 'susan@example.com',
      age: 42,
      status: 'A',
      image: {
        gia: '/dummy5',
        stone: '/dummy6',
      },
    },
  ],
};

const SearchResults = () => {
  const [rows, setRows] = useState<Rows[]>([]);

  const tableColumns: TableColumn[] = [
    { label: 'Status', accessor: 'status' },
    { label: 'Select', accessor: 'select' },
    { label: 'Image', accessor: 'image' }, // Added image column
    { label: 'ID', accessor: 'id' },
    { label: 'Stock No', accessor: 'stock_no' },
    { label: 'Email', accessor: 'email' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
    { label: 'Age', accessor: 'age' },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: ManageLocales('app.searchResult.footer.more'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 2,
      displayButtonLabel: ManageLocales('app.searchResult.footer.confirmStone'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addSearch'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 4,
      displayButtonLabel: ManageLocales('app.searchResult.footer.modifySearch'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 5,
      displayButtonLabel: ManageLocales(
        'app.searchResult.footer.addToWhislist'
      ),
      style: styles.filled,
      fn: () => {},
    },
    {
      id: 6,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.filled,
      fn: () => {},
    },
  ];
  const handleButtonClick = (index: number) => {
    setActiveTab(index);
    const selectedSearchData = Object.values(data)[index];
    setRows(selectedSearchData);
  };

  useEffect(() => {
    setRows(Object.values(data)[0]);
  }, []);

  console.log('rowsrows', rows.length);

  const closeSearch = (removeDataIndex: number) => {
    //    const  {`Search${removeDataIndex}`, ...searchData} = data;

    if (data.hasOwnProperty(`Search${removeDataIndex}`)) {
      //   delete data[`Search${removeDataIndex}`];
    }

    let closeSearchData = Object.values(data).filter((items) => {
      return Object.values(data)[removeDataIndex] !== items;
    })[0];

    // setRows(closeSearchData);

    console.log('closeSearchData', closeSearchData);
    console.log('Object.values(data)', Object.values(data));
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-5 text-solitaireTertiary mb-3 p-2 bg-solitaireSenary rounded-lg">
          {Object.keys(data).length > 1 &&
            Object.values(data).map((data: any, index: number) => {
              return (
                <div
                  key={`Search-${index}`}
                  style={{
                    marginRight: index === data.length - 1 ? '0px' : '5px',
                  }}
                  className={`flex items-center cursor-pointer gap-[8px] ${
                    activeTab === index
                      ? styles.activeHeaderButtonStyle
                      : styles.headerButtonStyle
                  }`}
                >
                  <CustomDisplayButton
                    displayButtonAllStyle={{
                      displayLabelStyle: styles.headerButtonLabelStyle,
                    }}
                    displayButtonLabel={`Search ${index + 1}`}
                    handleClick={() => handleButtonClick(index)}
                  />
                  <div onClick={() => closeSearch(index)}>
                    <BackSpaceOutline stroke="#8C7459" />
                  </div>
                </div>
              );
            })}
        </div>
        {/* <CustomHeader data={headerData} /> */}
        <CustomDataTable tableRows={rows} tableColumns={tableColumns} />
        <CustomFooter footerButtonData={footerButtonData} />
      </div>
    </>
  );
};

export default SearchResults;
