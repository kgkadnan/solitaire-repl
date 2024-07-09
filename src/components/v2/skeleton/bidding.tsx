import { Skeleton } from '@mui/material';
import React from 'react';

const BiddingSkeleton = () => {
  // Adjust the number of rows and columns as needed or make them dynamic
  const skeletonRows = Array.from({ length: 14 });
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
          sx={{ bgcolor: 'var(--neutral-200)' }}
        />
      </div>
      <div className="rounded-[4px] border-[1px] border-solid border-neutral200">
        <div className="h-[58px] bg-neutral0 justify-between flex  items-center px-2 border-b border-neutral200 rounded-t-[8px]">
          <div className="flex gap-1">
            <Skeleton
              variant="rectangular"
              height={'40px'}
              width={'129px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              className="rounded-l-[4px]"
            />
            <Skeleton
              variant="rectangular"
              height={'40px'}
              width={'129px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              className=""
            />
            <Skeleton
              variant="rectangular"
              height={'40px'}
              width={'129px'}
              animation="wave"
              className="rounded-r-[4px]"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
          </div>
          <div className="flex gap-2">
            <Skeleton
              variant="rectangular"
              height={'38px'}
              width={'137px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
            <Skeleton
              variant="rectangular"
              height={'38px'}
              width={'252px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
            <Skeleton
              variant="rectangular"
              height={'38px'}
              width={'38px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
            <Skeleton
              variant="rectangular"
              height={'38px'}
              width={'38px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
            <Skeleton
              variant="rectangular"
              height={'38px'}
              width={'38px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
          </div>
        </div>
        <div>
          <div className="bg-neutral50 flex items-center gap-2 h-[28px] px-2">
            {[1, 2, 3, 4, 5].map(data => {
              return (
                <div key={data}>
                  <Skeleton
                    sx={{ bgcolor: 'var(--neutral-200)' }}
                    variant="rectangular"
                    height={'16px'}
                    width={'100px'}
                    animation="wave"
                    className="w-full"
                  />
                </div>
              );
            })}
          </div>
          <div className="overflow-auto h-[63vh]">
            <table className="min-w-full divide-y divide-transparent">
              <thead>
                <tr className="bg-neutral50 h-[28px] overflow-hidden border-y-[1px] border-neutral200">
                  {skeletonCols.map((_, rowIndex) => {
                    return (
                      <th
                        key={rowIndex}
                        className="py-1 px-2 whitespace-nowrap hidden sm:table-cell"
                      >
                        <Skeleton
                          sx={{ bgcolor: 'var(--neutral-200)' }}
                          variant="rectangular"
                          height={'16px'}
                          width={'73px'}
                          animation="wave"
                          className="w-full rounded-[4px]"
                        />
                      </th>
                    );
                  })}
                </tr>
              </thead>
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
                          height={'22px'}
                          width={'73px'}
                          animation="wave"
                          sx={{ bgcolor: 'var(--neutral-200)' }}
                          className="w-full rounded-[4px]"
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
                        sx={{ bgcolor: 'var(--neutral-200)' }}
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
