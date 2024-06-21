import { Skeleton } from '@mui/material';
import React from 'react';

const BiddingSkeleton = () => {
  // Adjust the number of rows and columns as needed or make them dynamic
  const skeletonRows = Array.from({ length: 12 });
  const skeletonCols = Array.from({ length: 15 });
  return (
    <div className="flex flex-col gap-2">
      <div className="mt-2 h-[40px] flex items-center">
        <Skeleton
          variant="rectangular"
          height={'19px'}
          width={'300px'}
          animation="wave"
          className="w-full"
        />
      </div>
      <div className="rounded-[4px] border-[1px] border-solid border-neutral200">
        <div className="h-[58px] bg-neutral0 flex  items-center px-2 border-b border-neutral200 rounded-t-[8px]">
          <div className="flex gap-1">
            <Skeleton
              variant="rectangular"
              height={'40px'}
              width={'138px'}
              animation="wave"
              className="rounded-l-[4px]"
            />
            <Skeleton
              variant="rectangular"
              height={'40px'}
              width={'138px'}
              animation="wave"
              className=""
            />
            <Skeleton
              variant="rectangular"
              height={'40px'}
              width={'138px'}
              animation="wave"
              className="rounded-r-[4px]"
            />
          </div>
        </div>
        <div>
          <div className="bg-[#E3E3E3] flex items-center h-[35px] px-2"></div>
          <div className="overflow-auto h-[64vh]">
            <table className="min-w-full divide-y divide-transparent">
              <tbody className="divide-y divide-transparent">
                {skeletonRows.map((_, rowIndex) => (
                  <tr key={rowIndex} className="overflow-hidden">
                    {skeletonCols.map((_, colIndex) => (
                      <td
                        className="py-1 px-2 whitespace-nowrap hidden sm:table-cell"
                        key={colIndex}
                      >
                        <Skeleton
                          variant="rectangular"
                          height={'32px'}
                          width={'73px'}
                          animation="wave"
                          className="w-full"
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
                        className="w-full"
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
    </div>
  );
};

export default BiddingSkeleton;
