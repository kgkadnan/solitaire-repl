import React from 'react';
import { Skeleton } from '@mui/material';

const MathPairSkeleton = () => {
  // Adjust the number of rows and columns as needed or make them dynamic
  const skeletonRows = Array.from({ length: 15 });
  const skeletonCols = Array.from({ length: 15 });
  const rowStyle = {
    borderBottom: '2px solid var(--neutral-200)'
  };
  return (
    <div className="rounded-[4px]">
      <div
        className={`h-[58px] bg-neutral0 flex justify-between items-center px-2 border-b border-neutral200 rounded-t-[8px]`}
      >
        <>
          <div>
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'38px'}
              width={'137px'}
              animation="wave"
              className="rounded-[4px]"
            />
          </div>
          <div className="flex gap-2">
            <Skeleton
              variant="rectangular"
              height={'38px'}
              width={'137px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              className="rounded-[4px]"
            />
            <Skeleton
              variant="rectangular"
              height={'38px'}
              width={'137px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              className="rounded-[4px]"
            />

            <Skeleton
              variant="rectangular"
              height={'38px'}
              width={'38px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              className="rounded-[4px]"
            />

            <Skeleton
              variant="rectangular"
              height={'38px'}
              width={'38px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              className="rounded-[4px]"
            />
          </div>
        </>
      </div>
      <div>
        <div className="bg-neutral50 gap-2 flex items-center h-[28px] px-2">
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

        <div className="h-[51px] bg-neutral0 flex justify-between items-center px-2 border-y border-neutral200 ">
          <div>
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'38px'}
              width={'252px'}
              animation="wave"
              className="rounded-[4px]"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex gap-2">
              <Skeleton
                variant="rectangular"
                height={'38px'}
                width={'38px'}
                animation="wave"
                className="rounded-[4px]"
                sx={{ bgcolor: 'var(--neutral-200)' }}
              />
              <Skeleton
                variant="rectangular"
                height={'38px'}
                width={'38px'}
                animation="wave"
                className="rounded-[4px]"
                sx={{ bgcolor: 'var(--neutral-200)' }}
              />
              <Skeleton
                variant="rectangular"
                height={'38px'}
                width={'38px'}
                animation="wave"
                className="rounded-[4px]"
                sx={{ bgcolor: 'var(--neutral-200)' }}
              />
            </div>
          </div>
        </div>
        <div className="overflow-auto h-[56vh]">
          <table className="min-w-full divide-y divide-transparent">
            <thead>
              <tr className="bg-neutral50 h-[28px] overflow-hidden border-b-[1px] border-neutral200">
                {skeletonCols.map((_, rowIndex) => {
                  return (
                    <th
                      key={rowIndex}
                      className="py-1 px-2 whitespace-nowrap hidden sm:table-cell "
                    >
                      <Skeleton
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                        variant="rectangular"
                        height={'16px'}
                        width={'73px'}
                        animation="wave"
                        className="w-full rounded-[2px]"
                      />
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-transparent">
              {skeletonRows.map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={rowIndex % 2 === 1 ? rowStyle : undefined}
                  className={`overflow-hidden `}
                >
                  {skeletonCols.map((_, colIndex) => (
                    <td
                      className="py-1 px-2 whitespace-nowrap hidden sm:table-cell"
                      key={colIndex}
                    >
                      <Skeleton
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                        variant="rectangular"
                        height={'16px'}
                        width={'73px'}
                        animation="wave"
                        className="w-full rounded-[2px]"
                      />
                    </td>
                  ))}
                  {/* Add a single visible column for checkboxes on small screens */}
                  <td className="py-1 px-2 whitespace-nowrap sm:hidden">
                    <Skeleton
                      sx={{ bgcolor: 'var(--neutral-200)' }}
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
  );
};

export default MathPairSkeleton;
