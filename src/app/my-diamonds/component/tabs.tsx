import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import React from 'react';
import { ITabsProps } from '../my-diamonds-interface';

export const Tabs: React.FC<ITabsProps> = ({
  activeTab,
  setActiveTab,
  recentConfirmCount,
  myInvoiceDataCount,
  previousConfirmCount
}) => {
  // Handle tab click to set the active tab and page render check
  const handleClick = (pathName: string) => {
    setActiveTab(pathName);
  };

  // Define routes for different tabs in My Diamonds
  let myDiamondsRoutes = [
    {
      id: '1',
      pathName: ManageLocales('app.myDiamonds.RecentConfirmations'),
      count: recentConfirmCount
    },
    {
      id: '2',
      pathName: ManageLocales('app.myDiamonds.MyInvoices'),
      count: myInvoiceDataCount
    },
    {
      id: '3',
      pathName: ManageLocales('app.myDiamonds.PreviousConfirmations'),
      count: previousConfirmCount
    }
  ];

  return (
    <div className="flex gap-[40px]">
      {myDiamondsRoutes.map(({ id, pathName, count }) => {
        return (
          <Link
            className={`flex flex-row p-2.5 items-center justify-center text-solitaireTertiary ${
              activeTab === pathName
                ? 'border-b-[1px] border-solid border-solitaireQuaternary'
                : 'hover:text-solitaireQuaternary'
            }`}
            onClick={() => handleClick(pathName)}
            href=""
            key={id}
          >
            <div
              className={`${
                activeTab === pathName && 'text-solitaireQuaternary'
              }`}
            >
              {pathName}
              {count > 0 && ` (${count})`}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
