import React from 'react';
import { Skeleton } from '@mui/material';

const DataTableSkeleton = () => {
  // Adjust the number of rows and columns as needed or make them dynamic
  const skeletonRows = Array.from({ length: 11 });
  const skeletonCols = Array.from({ length: 15 });
  return (
    <div className="rounded-[4px]">
      <div className="h-[58px] bg-neutral0 border-b border-neutral200 rounded-t-[8px]"></div>
      <div>
        <div className="bg-[#E3E3E3] flex items-center h-[35px] px-2"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-transparent">
            <tbody className="divide-y divide-transparent">
              {skeletonRows.map((_, rowIndex) => (
                <tr key={rowIndex} className="overflow-hidden">
                  {skeletonCols.map((_, colIndex) => (
                    <td
                      className="py-1 px-1 whitespace-nowrap hidden sm:table-cell"
                      key={colIndex}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={'32px'}
                        width={'73px'}
                        animation="wave"
                        className="w-full border-b-[1px] border-neutral200"
                      />
                    </td>
                  ))}
                  {/* Add a single visible column for checkboxes on small screens */}
                  <td className="py-1 px-2 whitespace-nowrap sm:hidden">
                    <Skeleton
                      variant="rectangular"
                      height={'32px'}
                      width={'32px'}
                      animation="wave"
                      className="w-full border-b-[1px] border-neutral200"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-[58px] bg-neutral0 border-t border-neutral200 rounded-b-[8px]"></div>
    </div>
  );
};

export default DataTableSkeleton;
