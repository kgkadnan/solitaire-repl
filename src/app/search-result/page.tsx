'use client';
import CustomDataTable, { Rows } from '@/components/common/data-table';
import { CustomFooter } from '@/components/common/footer';
import styles from './search-results.module.scss';
import { ManageLocales } from '@/utils/translate';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import BackSpaceOutline from '@public/assets/icons/backspace-outline.svg?url';
import sortOutline from '@public/assets/icons/sort-outline.svg';
import Image from 'next/image';

interface TableColumn {
  label: string;
  accessor: string;
}

interface Data {
  [key: string]: {
    id: string;
    stock_no: string;
    email: string;
    age: number;
    isMemoOut: boolean;
    status: string;
    discount: number;
    amount: number;

    details: {
      gia: string;
      stone: string;
    };
  }[];
}

const data: Data = {
  Search1: [
    {
      id: '1',
      stock_no: '789456465',
      email: 'john@example.com',
      age: 35,
      status: 'A',
      amount: 966.5,
      discount: -19.5,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '2',
      stock_no: '789456466',
      email: 'jane@example.com',
      age: 42,
      status: 'H',
      amount: 1222.0,
      discount: -35.0,
      isMemoOut: true,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '3',
      stock_no: '789456467',
      email: 'david@example.com',
      age: 28,
      status: 'A',
      amount: 765.0,
      discount: -12.5,
      isMemoOut: true,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '4',
      stock_no: '789456468',
      email: 'susan@example.com',
      age: 31,
      status: 'A',
      amount: 985.0,
      discount: -25.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '5',
      stock_no: '789456469',
      email: 'mike@example.com',
      age: 50,
      status: 'H',
      amount: 1450.0,
      discount: -40.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '6',
      stock_no: '789456470',
      email: 'laura@example.com',
      age: 39,
      status: 'A',
      amount: 1100.0,
      discount: -30.0,
      isMemoOut: true,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '7',
      stock_no: '789456471',
      email: 'peter@example.com',
      age: 44,
      status: 'A',
      amount: 820.0,
      discount: -18.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '8',
      stock_no: '789456472',
      email: 'sara@example.com',
      age: 27,
      status: 'H',
      amount: 900.0,
      discount: -15.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '9',
      stock_no: '789456473',
      email: 'robert@example.com',
      age: 33,
      status: 'A',
      amount: 1020.0,
      discount: -27.0,
      isMemoOut: true,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '10',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '11',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '12',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '13',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '14',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '15',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '16',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '17',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '18',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '19',
      stock_no: '789456474',
      email: 'emily@example.com',
      age: 29,
      status: 'A',
      amount: 740.0,
      discount: -14.0,
      isMemoOut: false,
      details: {
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
      amount: 966.0,
      discount: -19.5,
      isMemoOut: true,

      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
    {
      id: '4',
      stock_no: '987654321',
      email: 'susan@example.com',
      age: 42,
      status: 'A',
      amount: 966.0,
      discount: -19.5,
      isMemoOut: true,

      details: {
        gia: '/dummy',
        stone: '/dummy2',
      },
    },
  ],
};

const SearchResults = () => {
  const [rows, setRows] = useState<Rows[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  //specific checkbox
  const handleClick = (e: any) => {
    const { id } = e.target;

    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);

    if (updatedIsCheck.length === rows?.length) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
    if (isCheckAll) {
      setIsCheckAll(false);
    }
  };

  //Selecting All Checkbox Function
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(rows?.map((li: any) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  //
  let checkboxData = {
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    handleClick: handleClick,
    isCheck: isCheck,
    isCheckAll: isCheckAll,
    setIsCheck: setIsCheck,
    setIsCheckAll: setIsCheckAll,
  };

  const tableColumns: TableColumn[] = [
    { label: 'Status', accessor: 'status' },
    { label: 'Select', accessor: 'select' },
    { label: 'Details', accessor: 'details' },
    { label: 'Stock No', accessor: 'stock_no' },
    { label: 'Email', accessor: 'email' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
    { label: 'Age', accessor: 'age' },
    { label: 'Discount%', accessor: 'discount' },
    { label: 'AMT($)', accessor: 'amount' },
  ];

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

  const [totalAmount, setTotalAmount] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);

  // Function to calculate total amount
  const calculateTotalAmount = useCallback(() => {
    let total = 0;
    isCheck.forEach((id) => {
      const selectedRow = rows.find((row) => row.id === id);
      if (selectedRow) {
        total += selectedRow.amount;
      }
    });
    return total;
  }, [isCheck, rows]);

  // Function to calculate average discount
  const calculateAverageDiscount = useCallback(() => {
    let totalDiscount = 0;
    isCheck.forEach((id) => {
      const selectedRow = rows.find((row) => row.id === id);
      if (selectedRow) {
        totalDiscount += selectedRow.discount;
      }
    });

    // Calculate average discount
    const avgDiscount = isCheck.length > 0 ? totalDiscount / isCheck.length : 0;
    return avgDiscount;
  }, [isCheck, rows]);

  useEffect(() => {
    // Update total amount and average discount whenever isCheck changes
    setTotalAmount(calculateTotalAmount());
    setAverageDiscount(calculateAverageDiscount());
  }, [calculateTotalAmount, calculateAverageDiscount]);

  useEffect(() => {
    setRows(Object.values(data)[0]);
  }, []);

  const closeSearch = (removeDataIndex: number) => {
    // Filter the data to remove the specified search
    const updatedData: Data = {};
    Object.keys(data).forEach((key, index) => {
      if (index !== removeDataIndex) {
        updatedData[key] = data[key];
      }
    });

    // Update the state with the filtered data
    setRows([...Object.values(updatedData)[0]]); // Assuming you want to show the first search results after closing a search
  };

  return (
    <>
      <div>
        <div className="border-b  border-solid  border-solitaireSenary mb-5">
          {/* top Header */}
          <div className={styles.topHeader}>
            <p className="">
              {ManageLocales('app.searchResult.header.searchResults')}
            </p>
          </div>

          {/* Search Tab Header */}
          <div className="flex items-center gap-5 text-solitaireTertiary  p-2 bg-solitaireSenary rounded-lg bg-opacity-50">
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

          {/* Count Bar  */}
          <div className="flex justify-between py-3">
            <div className="flex gap-3">
              <p>Pieces : {`${isCheck.length}/${rows.length}`}</p>
              <p>Avg. Dis : {averageDiscount.toFixed(2)}</p>
              <p>Total Amount : ${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex gap-1">
              <Image src={sortOutline} alt="sortOutline" width={20} />
              <p className="text-solitaireTertiary">Sort by</p>
            </div>
          </div>
        </div>
        {/* <CustomHeader data={headerData} /> */}
        <CustomDataTable
          tableRows={rows}
          tableColumns={tableColumns}
          checkboxData={checkboxData}
        />
        <CustomFooter footerButtonData={footerButtonData} />
      </div>
    </>
  );
};

export default SearchResults;
