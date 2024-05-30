import { Skeleton } from '@mui/material';
import { Checkbox } from '@components/v2/ui/checkbox';

const SavedSearchSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Skeleton
        width={350}
        variant="rectangular"
        height={20}
        animation="wave"
        className="rounded-[4px]"
      />
      <div className="border-[1px] border-neutral200 flex flex-col rounded-[8px]">
        <Skeleton
          variant="rectangular"
          height={60}
          animation="wave"
          className="rounded-t-[8px] w-full border-b-[1px] border-neutral200"
        />
        {[1, 2, 3, 4].map(data => {
          return (
            <div
              className="h-[120px] w-full border-t-[1px] border-b-[1px] border-neutral200 p-4"
              key={data}
            >
              <div className="flex   justify-between">
                <div className="flex gap-4 items-center">
                  <Checkbox
                    className="rounded-[4px] border-neutral200"
                    onClick={() => {}}
                    checked={false}
                  />

                  <Skeleton
                    width={84}
                    variant="rectangular"
                    height={84}
                    animation="wave"
                    className="rounded-[4px]"
                  />
                  <div className="flex flex-col gap-4">
                    <Skeleton
                      width={100}
                      variant="rectangular"
                      height={20}
                      animation="wave"
                      className="rounded-[4px]"
                    />
                    <Skeleton
                      width={150}
                      variant="rectangular"
                      height={20}
                      animation="wave"
                      className="rounded-[4px]"
                    />
                  </div>
                </div>
                <div>
                  <Skeleton
                    width={600}
                    variant="rectangular"
                    height={84}
                    animation="wave"
                    className="rounded-[4px] mr-[100px]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SavedSearchSkeleton;
