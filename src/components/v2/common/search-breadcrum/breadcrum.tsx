import Pill from '@/components/v2/common/search-breadcrum/pill';
import React from 'react';
import Image from 'next/image';
import Arrow from '@public/v2/assets/icons/chevron.svg';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useRouter } from 'next/navigation';

const Breadcrum = ({
  searchParameters,
  isActive
}: {
  searchParameters: any;
  isActive: number;
}) => {
  const router = useRouter();

  // const closeSearch = (removeDataIndex: number) => {
  //     let yourSelection = JSON.parse(localStorage.getItem('Search')!);

  //     if (!yourSelection[removeDataIndex].isSavedSearch) {
  //     //   setIsDialogOpen(true);
  //     //   setDialogContent(
  //     //     <>
  //     //       <div className="max-w-[450px] flex justify-center text-center align-middle text-solitaireTertiary">
  //     //         Do you want to save your &quot;Search <br /> Result &quot; for this
  //     //         session?
  //     //       </div>
  //     //       <div className="max-w-[450px] flex justify-around align-middle text-solitaireTertiary gap-[25px]">
  //     //         <CustomDisplayButton
  //     //           displayButtonLabel="No"
  //     //           handleClick={() => {
  //     //             setIsDialogOpen(false);
  //     //             closeTheSearchFunction(removeDataIndex, yourSelection);
  //     //           }}
  //     //           displayButtonAllStyle={{
  //     //             displayButtonStyle: styles.showResultButtonTransparent
  //     //           }}
  //     //         />
  //     //         <CustomDisplayButton
  //     //           displayButtonLabel="Yes"
  //     //           handleClick={async () => {
  //     //             if (yourSelection[removeDataIndex]?.saveSearchName.length) {
  //     //               //update logic comes here
  //     //               const updateSaveSearchData = {
  //     //                 id: yourSelection[removeDataIndex]?.id,
  //     //                 meta_data: yourSelection[removeDataIndex]?.queryParams,
  //     //                 diamond_count: data?.count
  //     //               };
  //     //               updateSavedSearch(updateSaveSearchData)
  //     //                 .unwrap()
  //     //                 .then(() => {
  //     //                   setIsInputDialogOpen(true);
  //     //                   setIsDialogOpen(false);
  //     //                   closeTheSearchFunction(removeDataIndex, yourSelection);
  //     //                 })
  //     //                 .catch((error: any) => {
  //     //                   logger.error(error);
  //     //                 });
  //     //             } else {
  //     //               setIsInputDialogOpen(true);
  //     //               setIsDialogOpen(false);
  //     //               setRemoveIndex(removeDataIndex);
  //     //             }
  //     //           }}
  //     //           displayButtonAllStyle={{
  //     //             displayButtonStyle: styles.showResultButtonFilled
  //     //           }}
  //     //         />
  //     //       </div>
  //     //     </>
  //     //   );
  //     } else if (yourSelection[removeDataIndex]) {
  //       closeTheSearchFunction(removeDataIndex, yourSelection);
  //     }
  //   };

  //   const closeTheSearchFunction = (
  //     removeDataIndex: number,
  //     yourSelection: string[]
  //   ) => {
  //     let closeSpecificSearch = yourSelection.filter(
  //       (items: any, index: number) => {
  //         return index !== removeDataIndex;
  //       }
  //     );

  //     let updateMyProfileRoute = myProfileRoutes.filter((items, index) => {
  //       return index !== removeDataIndex + 2;
  //     });

  //     for (let i = 2; i < updateMyProfileRoute.length; i++) {
  //       updateMyProfileRoute[i].id = i + 1;
  //       updateMyProfileRoute[i].pathName = {
  //         shortName: `R ${i - 1}`,
  //         fullName: `Result ${i - 1}`
  //       };
  //       updateMyProfileRoute[i].path = i - 1;
  //     }

  //     if (removeDataIndex === 0 && updateMyProfileRoute.length === 2) {
  //       router.push(
  //         `search?active-tab=${ManageLocales('app.search.newSearchRoute')}`
  //       );
  //     } else if (removeDataIndex === 0 && updateMyProfileRoute.length) {
  //       setHeaderPath({
  //         shortName: `R ${removeDataIndex + 1}`,
  //         fullName: `Result ${removeDataIndex + 1}`
  //       });
  //       setActiveTab(removeDataIndex + 1);

  //       router.push(
  //         `/search?active-tab=${ManageLocales('app.search.resultRoute')}-${
  //           removeDataIndex + 1
  //         }`
  //       );
  //     } else {
  //       setHeaderPath({
  //         shortName: `R ${removeDataIndex}`,
  //         fullName: `Result ${removeDataIndex}`
  //       });
  //       setActiveTab(removeDataIndex);
  //       router.push(
  //         `/search?active-tab=${ManageLocales(
  //           'app.search.resultRoute'
  //         )}-${removeDataIndex}`
  //       );
  //     }

  //     localStorage.setItem('Search', JSON.stringify(closeSpecificSearch));
  //     setMyProfileRoutes(updateMyProfileRoute);
  //   };

  return (
    <>
      {searchParameters.length > 0 && (
        <div className=" text-neutral-600 text-mMedium flex gap-[8px] ">
          <p className="flex items-center">Search</p>
          <Image src={Arrow} alt={'search-breadcrum'} />
        </div>
      )}
      {searchParameters.map((result: any, index: number) => {
        return (
          <div key={`breadcrum-${index}`} className="flex">
            <Pill
              isActive={isActive === index + 1}
              label={
                result.saveSearchName !== ''
                  ? result.saveSearchName
                  : `Result ${index + 1}`
              }
              handlePillClick={() => {
                router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${index + 1}`
                );
              }}
              handlePillEdit={() => {
                router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}-${
                    index + 1
                  }&edit=${SubRoutes.RESULT}`
                );
              }}
              handlePillDelete={() => {}}
            />
          </div>
        );
      })}
    </>
  );
};

export default Breadcrum;
