'use client';

import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { CustomCheckBox } from '@/components/common/checkbox';
import { CustomFooter } from '@/components/common/footer';
import CustomHeader from '@/components/common/header';
import CustomSearchResultCard from '@/components/common/search-result-card';
import { CustomTable } from '@/components/common/table';
import React, { useCallback, useEffect, useState } from 'react';
import ImageIcon from '@public/assets/icons/image-outline.svg';
import CertificateIcon from '@public/assets/icons/certificate.svg';
import Image from 'next/image';
import styles from './cart.module.scss';
import { Checkbox } from '@/components/ui/checkbox';
import { ManageLocales } from '@/utils/translate';
import { CustomSlider } from '@/components/common/slider';
import { useRouter } from 'next/navigation';
import { useDeleteCartMutation, useGetCartQuery } from '@/features/api/cart';
import { formatCreatedAt } from '@/utils/format-date';
import { CustomDropdown } from '@/components/common/dropdown';
import shareSocialOutline from '@public/assets/icons/share-social-outline.svg';
import downloadOutline from '@public/assets/icons/download-outline.svg';
import dna from '@public/assets/icons/ph_dna-light.svg';
import { NoDataFound } from '@/components/common/no-data-found';
import { CustomDialog } from '@/components/common/dialog';

interface KeyLabelMapping {
  [key: string]: string;
}

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}

export interface StaticRequire {
  default: StaticImageData;
}

export type StaticImport = StaticRequire | StaticImageData;

const MyCart = () => {
  const router = useRouter();
  // Style classes and variables
  const tableStyles = {
    tableHeaderStyle: styles.tableHeader,
    tableBodyStyle: styles.tableBody,
  };
  const cardStyles = {
    cardContainerStyle: styles.searchCardContainer,
  };

  const cardTimeStyles = {
    displayButtonStyle: styles.remainingCartTimeButton,
    displayLabelStyle: styles.remainingCartTimeLabel,
  };

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [createdAt, setCreateAt] = useState('');
  const [sliderData, setSliderData] = useState<any>([]);
  const [activeTab, setActiveTab] = useState('');
  const [diamondDetailImageUrl, setDiamondDetailImageUrl] = useState('');
  const [diamondDetailIframeUrl, setDiamondDetailIframeUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data } = useGetCartQuery({});
  const [deleteCart, { isLoading: updateIsLoading, isError: updateIsError }] =
    useDeleteCartMutation();

  const [remainingTime, setRemainingTime] = useState([]);

  function calculateRemainingTime(createdAt: any) {
    let millisecondData = createdAt?.map((items: any) => {
      const createdAtTime = new Date(items).getTime(); // Convert created at to milliseconds since epoch
      const now = new Date().getTime(); // Current time in milliseconds
      const thirtyMinutesInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds

      const remainingTimea =
        thirtyMinutesInMilliseconds - (now - createdAtTime);

      return remainingTimea;
    });

    return millisecondData;
  }

  const cardDetailMainKeys: KeyLabelMapping = {
    lot_id: 'Stock No',
    shape: 'Shape',
    carat: 'Carat',
    color: 'Color',
    clarity: 'Clarity',
    discount: 'Discount',
    amount: 'Amt($)',
  };

  const keyLabelMapping: KeyLabelMapping = {
    shape: 'Shape',
    carat: 'Carat',
    color: 'Color',
    clarity: 'Clarity',
    color_shade: 'Shade',
    cut: 'Cut',
    polish: 'Polish',
    symmetry: 'Symmetry',
    rap: 'Rap($)',
    lab: 'Lab',
    inscription: 'Ins.',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedRemainingTime = calculateRemainingTime(createdAt).map(
        (item: any) => {
          if (item <= 0) {
            return false;
          }
          return item;
        }
      );

      setRemainingTime(updatedRemainingTime);

      if (updatedRemainingTime.some((item: any) => item <= 0)) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [createdAt, remainingTime]);

  const renderCardData = useCallback(
    (data: any) => {
      const createdAtArray: any = [];
      return data.map((data: any, index: number) => {
        createdAtArray.push(data.created_at);

        setCreateAt(createdAtArray);

        let timeData = remainingTime.map((items: any) => {
          if (items <= 0) {
            return true;
          } else {
            let remainingMinutes = Math.min(Math.floor(items / 60000), 29);
            let remainingSeconds = Math.floor((items % 60000) / 1000);
            return `Buy within ${remainingMinutes} min ${remainingSeconds} secs`;
          }
        });

        const filteredData: any = {};

        for (const key in keyLabelMapping) {
          const dataKey = keyLabelMapping[key];
          if (data.product[key] !== undefined) {
            filteredData[dataKey] = data.product[key] ? data.product[key] : '-';
          }
        }

        return {
          cardId: data.id,
          cardTimeOut: typeof timeData[index] === 'string' ? false : true,
          cardHeader: (
            <div className={styles.cardHeaderMainDiv}>
              <div className={styles.searchHeader}>
                <Image
                  src={ImageIcon}
                  alt="ImageIcon"
                  className={styles.headerIconStyle}
                  onClick={(e) => handleImageButton(e)}
                />
                <Image
                  src={CertificateIcon}
                  alt="CertificateIcon"
                  className={styles.headerIconStyle}
                  onClick={(e) => handleCertificateButton(e)}
                />
                <p className={styles.SearchDateTime}>
                  {formatCreatedAt(data.created_at)}
                </p>
              </div>
              <div>
                {data.created_at && (
                  <CustomDisplayButton
                    displayButtonAllStyle={cardTimeStyles}
                    displayButtonLabel={!timeData ? '' : timeData[index]}
                  />
                )}
              </div>
            </div>
          ),
          cardContent: (
            <CustomTable
              tableData={{
                tableHeads: Object.keys(keyLabelMapping).map(
                  (key) => keyLabelMapping[key]
                ),
                bodyData: [filteredData],
              }}
              tableStyleClasses={tableStyles}
            />
          ),
          unBlurHeader: (
            <p
              className={`${styles.SearchCardTitle} ${styles.unBlurCardHeader}`}
            >
              <span className={styles.rptNoStyle}>RPT No. </span>
              {data.product.rpt_number}
            </p>
          ),
        };
      });
    },
    [remainingTime, createdAt]
  );

  useEffect(() => {
    if (data) {
      setCardData(renderCardData(data?.items));
    }
  }, [data, remainingTime]);

  //specific checkbox
  const handleClick = (id: string) => {
    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);

    if (updatedIsCheck.length === cardData?.length) {
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
    setIsCheck(cardData?.map((li: any) => li.cardId));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleDelete = () => {
    if (isCheck.length) {
      setIsError(false);
      setIsDialogOpen(true);
    } else {
      setIsError(true);
      setErrorText(`You haven't picked any stones.`);
    }
  };

  const deleteStoneHandler = () => {
    deleteCart({
      items: isCheck,
    })
      .unwrap()
      .then((data) => {
        setCardData(data.items);
      })
      .catch((error) => {
        console.log('error', error);
      });
    setIsDialogOpen(false);
  };

  const handleMoveToWishlist = () => {
    router.push('/wishlist');
  };

  const handleConfirm = () => {
    setIsError(true);
    setErrorText(`You haven't picked any stones.`);
  };

  const handleCompareStone = () => {
    const maxStones = 10;
    const minStones = 2;

    if (isCheck.length > maxStones) {
      setIsError(true);
      setErrorText(`You can compare a maximum of ${maxStones} stones`);
    } else if (isCheck.length < minStones) {
      setIsError(true);
      setErrorText(`Minimum ${minStones} stones are required to compare`);
    } else {
      const compareStones = isCheck
        .map((id) => data.items.find((row: any) => row.id === id))
        .map((stone) => stone.product);

      localStorage.setItem('compareStone', JSON.stringify(compareStones));
      router.push('/compare-stone');
    }
  };

  //Footer Button Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: '',
            },
            {
              label: 'Download Excel',
              fn: '',
            },
            {
              label: 'Find Matching Pair',
              fn: '',
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      displayButtonLabel: 'Compare Stone',
      style: styles.transparent,
      fn: handleCompareStone,
    },
    {
      id: 2,
      displayButtonLabel: 'Delete',
      style: styles.transparent,
      fn: handleDelete,
    },
    {
      id: 3,
      displayButtonLabel: 'Confirm Stone',
      style: styles.filled,
      fn: handleConfirm,
    },
  ];

  let displayButtonData = [
    {
      id: '1',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.giaCertificate'
      ),
      url: `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/Cert/${sliderData[0]?.product?.certificate_number}.jpeg`,
    },

    {
      id: '2',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondVideo'
      ),
      iframeUrl: `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/Vision360.html?d=${sliderData[0]?.product?.lot_id}&autoPlay=1`,
    },
    {
      id: '3',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondImage'
      ),
      url: `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${sliderData[0]?.product?.lot_id}/still.jpg`,
    },
    {
      id: '4',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.b2b'
      ),
      url: `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${sliderData[0]?.product?.lot_id}/still.jpg`,
    },
    {
      id: '5',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.b2bSparkle'
      ),
      url: `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${sliderData[0]?.product?.lot_id}/still.jpg`,
    },
  ];

  const basicDetailsLabelMapping: KeyLabelMapping = {
    lot_id: 'Stock No.',
    rpt_number: 'Report No.',
    shape: 'Shape',
    carat: 'Carat',
    color: 'Color',
    color_shade: 'Color Shade',
    color_shade_intensity: 'Color Shade Intensity',
    clarity: 'Clarity',
    cut: 'Cut',
    polish: 'Polish',
    symmetry: 'Symmetry',
    fluorescence: 'Fluorescence',
    culet: 'Culet',
    lab: 'Lab',
    ha: 'Hearts & Arrows',
    brilliance: 'Brilliancy',
    country_origin: 'Country of Origin',
    location: 'Location',
    type_certificate: 'Type 2 Certificate',
    inscription: 'Laser Inscription',
  };
  const measurementsLabelMapping: KeyLabelMapping = {
    table_percentage: 'Table%',
    depth_percentage: 'Depth%',
    ratio: 'Ratio',
    length: 'Length',
    width: 'Width',
    depth: 'Depth',
    crown_angle: 'Crown Angle',
    crown_height: 'Crown Height',
    girdle_percentage: 'Girdle%',
    pavilion_angle: 'Pavilion Angle',
    pavilion_depth: 'Pavilion Depth',
    lower_half: 'Lower Half',
    star_length: 'Star Length',
  };
  const inclusionDetailsLabelMapping: KeyLabelMapping = {
    black_table: 'Table Black',
    side_black: 'Black Side',
    open_crown: 'Crown Open',
    open_table: 'Table Open',
    open_pavilion: 'Pavilion Open',
    milky: 'Milky',
    luster: 'Luster',
    eye_clean: 'Eye Clean',
    table_inclusion: 'Table Inclusion',
    side_inclusion: 'Side Inclusion',
    natural_crown: 'Natural Crown',
    natural_girdle: 'Natural Girdle',
    natural_pavilion: 'Natural Pavilion',
    surface_graining: 'Surface Graining',
    internal_graining: 'Internal Graining',
  };

  const otherInformationsLabelMapping: KeyLabelMapping = {
    girdle: 'Girdle',
    key_to_symbbol: 'Key to Symbol',
    report_comments: 'Report Comments',
  };

  //Header Data
  const headerData = {
    headerHeading: 'MyCart',
    searchCount: cardData?.length > 0 && cardData?.length,
    headerData: (
      <div className="flex items-center gap-[10px] bottom-0">
        <Checkbox
          onClick={handleSelectAllCheckbox}
          data-testid={'Select All Checkbox'}
          checked={isCheckAll}
        />
        <p className="text-solitaireTertiary text-base font-medium">
          {ManageLocales('app.common.header.selectAll')}
        </p>
      </div>
    ),
    overriddenStyles: {
      headerDataStyles: 'flex items-end',
    },
  };

  // Function to handle edit action
  const handleEdit = (stone: string) => {
    alert("You have clicked the 'Edit button'");
  };

  // Function to handle "Show Results" button click
  const showButtonHandleClick = () => {
    alert("You have clicked the 'show result' button");
  };

  const handleImageButton = (event: any) => {
    event.stopPropagation();
    alert('Click on Image Button');
  };

  const handleCertificateButton = (event: any) => {
    event.stopPropagation();
    alert('Click on Certificate Button');
  };

  const handleBlurFunction = () => {
    router.push('/wishlist');
  };

  const handleDiamondDetailData = (id: string, url: any, iframeUrl: any) => {
    setDiamondDetailIframeUrl('');
    setDiamondDetailImageUrl('');
    if (iframeUrl) {
      setDiamondDetailIframeUrl(iframeUrl);
    } else if (url) {
      setDiamondDetailImageUrl(url);
    }
    setActiveTab(id);
  };

  return (
    <>
      <CustomDialog
        setIsOpen={setIsDialogOpen}
        isOpens={isDialogOpen}
        dialogContent={
          <>
            <p className="mt-3 px-[50px] text-center">
              Do you want to “Delete” the cart or “Move to Wishlist”
            </p>
            <div className="flex justify-center">
              <CustomDisplayButton
                displayButtonLabel="Delete"
                displayButtonAllStyle={{
                  displayButtonStyle: `mr-[25px] ${styles.transparent}`,
                }}
                handleClick={deleteStoneHandler}
              />
              <CustomDisplayButton
                displayButtonLabel="Move to Wishlist"
                displayButtonAllStyle={{
                  displayButtonStyle: styles.filled,
                }}
                handleClick={handleMoveToWishlist}
              />
            </div>
          </>
        }
      />
      <div className="container flex flex-col ">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-16">
          <CustomHeader data={headerData} />
        </div>

        {/* Custom Card and Checkbox map */}
        <div className="flex-grow overflow-y-auto min-h-[80vh]">
          <>
            {cardData.length > 0 ? (
              cardData?.map((items: any, index) => {
                return (
                  <div key={items.cardId}>
                    <div className="flex mt-6">
                      <CustomCheckBox
                        data={items.cardId}
                        onClick={handleClick}
                        isChecked={isCheck}
                      />

                      <CustomSlider
                        sheetTriggenContent={
                          <div
                            onClick={() => {
                              setActiveTab('3');
                              setDiamondDetailIframeUrl('');
                              setDiamondDetailImageUrl('');
                              setSliderData([data?.items[index]]);
                            }}
                          >
                            <CustomSearchResultCard
                              cardData={items}
                              overriddenStyles={cardStyles}
                              handleCardAction={handleEdit}
                              isBlur={items.cardTimeOut}
                              blurContent={
                                <>
                                  <p>Your stone has been moved to wishlist</p>
                                  <CustomDisplayButton
                                    displayButtonLabel="Wishlist"
                                    handleClick={handleBlurFunction}
                                    displayButtonAllStyle={{
                                      displayButtonStyle: styles.filled,
                                      displayLabelStyle:
                                        styles.ViewSimilarStoneLabel,
                                    }}
                                  />
                                </>
                              }
                            />
                          </div>
                        }
                        sheetTriggerStyle={styles.mainCardContainer}
                        sheetContentStyle={styles.diamondDetailSheet}
                        // sheetContentStyle={styles.sheetContentStyle}
                        cardTimeout={items.cardTimeOut}
                        sheetContent={
                          <>
                            <div className={styles.diamondDetailHeader}>
                              <p className={`text-solitaireTertiary`}>
                                {`${ManageLocales(
                                  'app.searchResult.slider.diamondDetail.stockNo'
                                )} : ${sliderData[0]?.product?.lot_id}`}
                              </p>
                            </div>
                            <div className="border-b border-solitaireQuaternary mt-5"></div>

                            {sliderData.map((data: any) => {
                              data = data.product;

                              return (
                                <>
                                  <div
                                    key={data.id}
                                    className="flex items-center justify-between my-5 px-10"
                                  >
                                    <div>
                                      {displayButtonData.map((items) => {
                                        return (
                                          <div key={items.id}>
                                            <CustomDisplayButton
                                              displayButtonLabel={
                                                items.displayButtonLabel
                                              }
                                              displayButtonAllStyle={{
                                                displayLabelStyle:
                                                  activeTab === items.id
                                                    ? styles.activeHeaderButtonStyle
                                                    : styles.headerButtonStyle,
                                              }}
                                              handleClick={() =>
                                                handleDiamondDetailData(
                                                  items.id,
                                                  items.url,
                                                  items.iframeUrl
                                                )
                                              }
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div>
                                      {!diamondDetailImageUrl.length &&
                                        !diamondDetailIframeUrl.length && (
                                          <Image
                                            src={`https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${data?.lot_id}/still.jpg`}
                                            alt={``}
                                            width={350}
                                            height={350}
                                            style={{ height: '350px' }}
                                          />
                                        )}
                                      {diamondDetailImageUrl &&
                                        !diamondDetailIframeUrl && (
                                          <Image
                                            src={diamondDetailImageUrl}
                                            alt={``}
                                            width={350}
                                            height={350}
                                            style={{ height: '350px' }}
                                          />
                                        )}

                                      {diamondDetailIframeUrl &&
                                        !diamondDetailImageUrl && (
                                          <iframe
                                            width="100%"
                                            height={350}
                                            frameBorder="0"
                                            src={diamondDetailIframeUrl}
                                          />
                                        )}
                                    </div>
                                    <div>
                                      {Object.keys(cardDetailMainKeys).map(
                                        (key) => (
                                          <div
                                            key={key}
                                            className="text-solitaireTertiary py-1"
                                          >
                                            <span className="text-xs">
                                              {cardDetailMainKeys[key]}
                                            </span>
                                            <br />
                                            {data[key] ? data[key] : '-'}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex gap-10 items-center justify-center mb-5 ml-[60px]">
                                    <div
                                      onClick={() => {}}
                                      className="cursor-pointer"
                                    >
                                      <Image
                                        src={shareSocialOutline}
                                        alt="shareSocialOutline"
                                        width={25}
                                        height={20}
                                      />
                                    </div>
                                    <div
                                      onClick={() => {}}
                                      className="cursor-pointer"
                                    >
                                      <Image
                                        src={downloadOutline}
                                        alt="downloadOutline"
                                        width={25}
                                        height={20}
                                      />
                                    </div>
                                    <div
                                      onClick={() => {
                                        window.open(
                                          `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/DNA.html?id=${sliderData[0]?.lot_id}`,
                                          '_blank'
                                        );
                                      }}
                                      className="cursor-pointer"
                                    >
                                      <Image
                                        src={dna}
                                        alt="dna"
                                        width={25}
                                        height={20}
                                      />
                                    </div>
                                  </div>
                                  <div className="border-b border-solitaireQuaternary"></div>
                                  <div>
                                    <div className={styles.diamondDetailHeader}>
                                      <p
                                        className={`text-solitaireQuaternary font-bold text-lg my-5`}
                                      >
                                        {`${ManageLocales(
                                          'app.searchResult.slider.diamondDetail.diamondDetails'
                                        )} `}
                                      </p>
                                    </div>
                                    <div className="flex justify-start">
                                      <div className="w-1/4">
                                        <p
                                          className={`text-solitaireQuaternary text-lg my-5`}
                                        >
                                          {`${ManageLocales(
                                            'app.searchResult.slider.diamondDetail.basicDetails'
                                          )} `}
                                        </p>
                                        {Object.keys(
                                          basicDetailsLabelMapping
                                        ).map((key) => (
                                          <div
                                            key={key}
                                            className="text-solitaireTertiary py-1 flex "
                                          >
                                            <span className="text-solitaireQuaternary w-[150px]">
                                              {basicDetailsLabelMapping[key]}
                                            </span>
                                            <span className="text-left">
                                              {data[key] ? data[key] : '-'}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="w-1/4">
                                        <p
                                          className={`text-solitaireQuaternary text-lg my-5`}
                                        >
                                          {`${ManageLocales(
                                            'app.searchResult.slider.diamondDetail.measurements'
                                          )} `}
                                        </p>
                                        {Object.keys(
                                          measurementsLabelMapping
                                        ).map((key) => (
                                          <div
                                            key={key}
                                            className="text-solitaireTertiary py-1 flex"
                                          >
                                            <span className="text-solitaireQuaternary w-[150px]">
                                              {measurementsLabelMapping[key]}
                                            </span>
                                            <span>
                                              {data[key] ? data[key] : '-'}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="w-1/4">
                                        <p
                                          className={`text-solitaireQuaternary text-lg my-5`}
                                        >
                                          {`${ManageLocales(
                                            'app.searchResult.slider.diamondDetail.inclusionDetails'
                                          )} `}
                                        </p>
                                        {Object.keys(
                                          inclusionDetailsLabelMapping
                                        ).map((key) => (
                                          <div
                                            key={key}
                                            className="text-solitaireTertiary py-1 flex"
                                          >
                                            <span className="text-solitaireQuaternary w-[150px]">
                                              {
                                                inclusionDetailsLabelMapping[
                                                  key
                                                ]
                                              }
                                            </span>
                                            <span className="">
                                              {data[key] ? data[key] : '-'}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="w-1/4">
                                        <p
                                          className={`text-solitaireQuaternary text-lg my-5`}
                                        >
                                          {`${ManageLocales(
                                            'app.searchResult.slider.diamondDetail.otherInformations'
                                          )} `}
                                        </p>
                                        {Object.keys(
                                          otherInformationsLabelMapping
                                        ).map((key) => (
                                          <div
                                            key={key}
                                            className="text-solitaireTertiary py-1 flex"
                                          >
                                            <span className="text-solitaireQuaternary w-[150px]">
                                              {
                                                otherInformationsLabelMapping[
                                                  key
                                                ]
                                              }
                                            </span>
                                            <span className="">
                                              {data[key] ? data[key] : '-'}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        }
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <NoDataFound />
            )}
          </>
        </div>

        {/* Custom Footer */}
        {footerButtonData?.length && (
          <div className="sticky bottom-0 bg-solitairePrimary mt-3 flex border-t-2 border-solitaireSenary items-center justify-between">
            {isError && (
              <div className="w-[30%]">
                <p className="text-red-700 text-base ">{errorText}</p>
              </div>
            )}
            <CustomFooter
              footerButtonData={footerButtonData}
              noBorderTop={styles.paginationContainerStyle}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyCart;
