/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// import { AppDispatch } from '@/redux/store';

export interface TableColumn {
  key: string;
  label: string;
  hiddenBelow1024?: boolean;
  hiddenAbove1024?: boolean;
}

import Image from 'next/image';

import {
  FILE_URLS,
  basicDetails,
  inclusionDetails,
  mesurementsDetails,
  otherInformationDetails
} from '@/constants/v2/detail-page';
import { Toast } from '../copy-and-share/toast';
import Tooltip from '../tooltip';
import ImageSlider from './components/image-slider';
import ImageList from './components/image-list';
import ImagePreview from './components/image-preiview';
import { getShapeDisplayName } from '@/utils/v2/detail-page';

export default function DiamondDetailsComponent({
  params,
  tableData
}: {
  params: { diamondId: string };
  tableData: any;
}) {
  //   const dispatch: AppDispatch = useDispatch();
  //   const diamondData = useSelector(selectDiamondData);

  //   const tableData: any = diamondData?.data?.product
  //     ? { ...diamondData?.data?.product }
  //     : {};
  //   if (tableData) {
  //     tableData['measurement'] = `${tableData?.length ?? 0}*${
  //       tableData?.width ?? 0
  //     }*${tableData?.height ?? 0}`;
  //     tableData['shape'] = getShapeDisplayName(tableData?.shape ?? '');
  //   }
  const [showToast, setShowToast] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  //   useEffect(() => {
  //     dispatch(fetchDiamondDetailsApi(params?.diamondId));
  //   }, [params?.diamondId]);

  //   if (
  //     !diamondData?.loading ||
  //     diamondData?.loading === LOADING_VALUES.PENDING
  //   ) {
  //     return <Loading />;
  //   }

  //   if (diamondData?.loading === LOADING_VALUES.FAILED) {
  //     return <ErrorPage />;
  //   }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const displayTable = (tableHeadArray: any) => {
    return (
      <div>
        {tableHeadArray.map((item: TableColumn[], index: any) => (
          <div key={`item-${index}`} className="mt-4">
            {/* <ResponsiveTable tableHead={item} tableData={[tableData]} /> */}
          </div>
        ))}
      </div>
    );
  };

  const images = [
    {
      name: getShapeDisplayName(tableData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'GIA Certificate',
      url: tableData?.certificate_url ?? '',
      isSepratorNeeded: true
    },
    {
      name: 'B2B',
      url: `${FILE_URLS.B2B.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'B2B Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace('***', tableData?.lot_id ?? '')}`,
      isSepratorNeeded: true
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace('***', tableData?.lot_id ?? '')}`,
      isSepratorNeeded: true
    }
  ];

  const copyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      setShowToast(true); // Show the toast notification
      setTimeout(() => {
        setShowToast(false); // Hide the toast notification after some time
      }, 2000);
    });
  };

  return (
    <div className="text-black bg-white">
      <Toast show={showToast} message="Copied Successfully" />
      <div className="lg:flex lg:ml-24 p-5">
        <div className="flex">
          <div className="w-full lg:hidden">
            <ImageSlider images={images} />
          </div>
          <div className="hidden lg:block mr-5">
            <ImageList
              images={images}
              selectedImageIndex={selectedImageIndex}
              onImageClick={handleImageClick}
            />
          </div>
          <div className="hidden lg:block">
            <ImagePreview
              images={images}
              selectedImageIndex={selectedImageIndex}
            />
          </div>
        </div>
        <div className="lg:w-2/3 lg:ml-10 scroll-adjust-custom lg:overflow-y-scroll lg:h-[95vh]">
          <div className="flex mt-4 lg:mt-0">
            <p
              className="lg:hidden text-[22px] text-[#344054] font-medium mr-5"
              style={{ alignSelf: 'center' }}
            >
              {/* Stock No: {tableData?.lot_id ?? '-'} */}
            </p>
            {/* <Image
              className="cursor-pointer"
              src="/Download.png"
              alt={"Download"}
              height={40}
              width={40}
            /> */}
            <Tooltip
              tooltipTrigger={
                <Image
                  className="cursor-pointer"
                  src="/Media.png"
                  alt={'media'}
                  height={40}
                  width={40}
                  onClick={copyLink}
                />
              }
              tooltipContent={'Media Link'}
              tooltipContentStyles={'z-[4]'}
            />
          </div>
          <div className="pt-8">
            <div className="sm:text-[14px] lg:text-[16px] text-[#344054]  font-medium">
              Basic Details
            </div>
            {displayTable(basicDetails)}
          </div>

          <div className="mt-6">
            <div className="sm:text-[14px] lg:text-[16px]  font-medium text-[#344054]">
              Measurements
            </div>
            {displayTable(mesurementsDetails)}
          </div>

          <div className="mt-6">
            <div className="sm:text-[14px] lg:text-[16px] font-medium text-[#344054]">
              Inclusion Details
            </div>
            {displayTable(inclusionDetails)}
          </div>

          <div className="mt-6">
            <div className="sm:text-[14px] lg:text-[16px] font-medium text-[#344054]">
              Other Information
            </div>
            {displayTable(otherInformationDetails)}
          </div>
        </div>
      </div>
    </div>
  );
}
