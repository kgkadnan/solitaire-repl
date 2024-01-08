'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import DiamondImage from '@public/assets/images/Roundbig.png';
import { ManageLocales } from '@/utils/translate';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import {
  basicDetailsLabelMapping,
  inclusionDetailsLabelMapping,
  measurementsLabelMapping
} from './helpers/key-label';
import { OptimizedImageWithFallback } from '@/components/common/data-table/components/diamond-detail-slider';
import { useModalStateManagement } from '@/hooks/modal-state-management';

interface ISwitchButtonTabs {
  id: string;
  displayButtonLabel: string;
}

const DnaPage = () => {
  const { modalSetState } = useModalStateManagement();

  const { setModalContent, setIsModalOpen } = modalSetState;

  const [activeTab, setActiveTab] = useState('');
  const switchButtonTabs = [
    {
      id: '1',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.giaCertificate'
      )
      //   url: `${FILE_URLS.CERT_FILE.replace(
      //     '***',
      //     sliderData[0]?.certificate_number ?? ''
      //   )}`
    },
    {
      id: '2',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondImage'
      )
      //   url: `${FILE_URLS.IMG.replace('***', sliderData[0]?.lot_id ?? '')}`
    },

    {
      id: '3',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondVideo'
      )
      //   iframeUrl: `${FILE_URLS.VIDEO_FILE.replace(
      //     '***',
      //     sliderData[0]?.lot_id ?? ''
      //   )}`
    }
  ];

  const dnaImages = [
    {
      id: 1,
      //   url: `${FILE_URLS.HEART.replace('***', sliderData[0]?.lot_id ?? '')}`,
      altText: 'Heart Image',
      displayName: ManageLocales('app.searchResult.slider.diamondDetail.heart')
    },
    {
      id: 2,
      //   url: `${FILE_URLS.ARROW.replace('***', sliderData[0]?.lot_id ?? '')}`,
      altText: 'Arrow Image',
      displayName: ManageLocales('app.searchResult.slider.diamondDetail.arrow')
    },
    {
      id: 3,
      //   url: `${FILE_URLS.ASET.replace('***', sliderData[0]?.lot_id ?? '')}`,
      altText: 'Aset Image',
      displayName: ManageLocales('app.searchResult.slider.diamondDetail.aset')
    },
    {
      id: 4,
      //   url: `${FILE_URLS.IDEAL.replace('***', sliderData[0]?.lot_id ?? '')}`,
      altText: 'Ideal Image',
      displayName: ManageLocales('app.searchResult.slider.diamondDetail.ideal')
    },
    {
      id: 5,
      //   url: `${FILE_URLS.FLUORESCENCE.replace(
      //     '***',
      //     sliderData[0]?.lot_id ?? ''
      //   )}`,
      altText: 'Fluorescence Image',
      displayName: ManageLocales(
        'app.searchResult.slider.diamondDetail.fluorescence'
      )
    }
  ];

  const openModal = (url: string, altText: string) => {
    setIsModalOpen(true);
    setModalContent(
      <Image
        src={url}
        alt={altText}
        style={{ width: '100%', height: '100%' }}
        width={100}
        height={100}
      />
    );
  };
  return (
    <div className="p-[40px]">
      <div className="text-solitaireTertiary text-[18px] border-b border-solitaireSenary pb-[30px]">
        <p>Stock No: 352146529</p>
      </div>
      <div className="flex mt-[30px] border-b border-solitaireSenary pb-[30px]">
        <div className="w-[50%] flex flex-col justify-center items-center">
          <Image src={DiamondImage} alt="Diamond Image" />
          <div className="flex gap-[30px] text-[14px] font-light mt-[100px]">
            {switchButtonTabs.map((items: ISwitchButtonTabs) => {
              return (
                <div key={items.id} className="">
                  <CustomDisplayButton
                    displayButtonLabel={items.displayButtonLabel}
                    displayButtonAllStyle={{
                      displayLabelStyle:
                        activeTab === items.id
                          ? 'text-[14px] text-solitaireTertiary'
                          : 'text-solitaireSenary'
                    }}
                    handleClick={() => setActiveTab(items.id)}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-[30px]">
            <CustomDisplayButton
              displayButtonLabel="Download"
              displayButtonAllStyle={{
                displayButtonStyle: 'bg-solitaireQuaternary w-[150px] h-[35px]',
                displayLabelStyle:
                  'text-solitaireTertiary text-base font-medium'
              }}
            />
          </div>
        </div>
        <div className="w-[50%]">
          <div className="">
            <div className="flex flex-col">
              <p className={`text-solitaireQuaternary text-[16px] my-5`}>
                Basic Details
              </p>
              <div className="text-[16px] flex flex-col flex-wrap w-[50%] h-[200px]">
                {Object.keys(basicDetailsLabelMapping).map(key => (
                  <div
                    key={key}
                    className="text-solitaireTertiary py-1 flex mr-[50px]"
                  >
                    <span className="text-solitaireQuaternary w-[120px]">
                      {basicDetailsLabelMapping[key]}
                    </span>
                    {/* <span>{data[key] ? data[key] : '-'}</span> */}
                    <span className="w-[120px]">-</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-[50px]">
            <div className="">
              <p className={`text-solitaireQuaternary text-[16px] my-5`}>
                Measurements
              </p>
              <div className="text-[16px]">
                {Object.keys(measurementsLabelMapping).map(key => (
                  <div key={key} className="text-solitaireTertiary py-1 flex">
                    <span className="text-solitaireQuaternary w-[120px]">
                      {measurementsLabelMapping[key]}
                    </span>
                    {/* <span>{data[key] ? data[key] : '-'}</span> */}
                    <span className="w-[120px]">-</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="">
              <p className={`text-solitaireQuaternary text-[16px] my-5`}>
                Inclusion Details
              </p>
              <div className="text-[16px]">
                {Object.keys(inclusionDetailsLabelMapping).map(key => (
                  <div key={key} className="text-solitaireTertiary py-1 flex">
                    <span className="text-solitaireQuaternary w-[120px]">
                      {inclusionDetailsLabelMapping[key]}
                    </span>
                    {/* <span>{data[key] ? data[key] : '-'}</span> */}
                    <span className="w-[120px]">-</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex my-5 gap-[40px] overflow-auto">
        {dnaImages.map(({ url, altText, displayName, id }: any) => {
          return (
            <div key={id} className="w-[30%]">
              <div className="text-center pb-3 text-solitaireTertiary">
                <p>{displayName}</p>
              </div>

              <OptimizedImageWithFallback
                src={url}
                alt={altText}
                width={250}
                height={200}
                openModal={openModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DnaPage;
