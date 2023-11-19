import React, { ReactNode, useState } from 'react';
import { CustomCheckBox } from '../checkbox';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import certficateOutline from '@public/assets/icons/ph_certificate-light.svg';
import imageOutline from '@public/assets/icons/image-outline.svg';
import styles from './custom-table.module.scss';
import { CustomSlider } from '../slider';
import { CustomDisplayButton } from '../buttons/display-button';
import { ManageLocales } from '@/utils/translate';
import downloadOutline from '@public/assets/icons/download-outline.svg';
import dna from '@public/assets/icons/ph_dna-light.svg';
import shareSocialOutline from '@public/assets/icons/share-social-outline.svg';
import { CustomFooter } from '../footer';
import { CustomDropdown } from '../dropdown';
import { useAddCartMutation } from '@/features/api/cart';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { CustomDialog } from '../dialog';
import { Product } from '@/app/search/result-interface';
import { ICustomDataTableProps, KeyLabelMapping } from './interface';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { downloadExcelFromBase64 } from '@/utils/download-excel-from-base64';
import { usePathname } from 'next/navigation';

const CustomDataTable: React.FC<ICustomDataTableProps> = ({
  tableRows,
  tableColumns,
  checkboxData,
  mainTableStyle,
}) => {
  let currentPath = usePathname();

  const [sliderData, setSliderData] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [diamondDetailImageUrl, setDiamondDetailImageUrl] = useState('');
  const [diamondDetailIframeUrl, setDiamondDetailIframeUrl] = useState('');
  const [dialogContent, setDialogContent] = useState<ReactNode>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [addCart] = useAddCartMutation();

  let [downloadExcel] = useDownloadExcelMutation();
  const { handleSelectAllCheckbox, handleClick, isCheck, isCheckAll } =
    checkboxData;

  const addToCart = () => {
    if (sliderData[0].diamond_status === 'MemoOut') {
      console.log('require error message here');
    } else if (sliderData[0]) {
      addCart({
        variants: [sliderData[0]?.variants[0].id],
      })
        .unwrap()
        .then(() => {
          setDialogContent(
            <>
              <div className="max-w-[400px] flex justify-center align-middle">
                <Image src={confirmImage} alt="vector image" />
              </div>
              <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary">
                Download Excel Successfully
              </div>
            </>
          );
          setIsDialogOpen(true);
        })
        .catch(() => {
          console.log('1111111111111111');
        });
    }
  };

  const downloadExcelFunction = () => {
    if (sliderData[0]) {
      downloadExcel({
        productIds: sliderData[0].id,
      })
        .unwrap()
        .then((res) => {
          let { data, fileName } = res;
          if (data) {
            downloadExcelFromBase64(data, fileName);
            setDialogContent(
              <>
                <div className="max-w-[400px] flex justify-center align-middle">
                  <Image src={confirmImage} alt="vector image" />
                </div>
                <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary">
                  Download Excel Successfully
                </div>
              </>
            );
            setIsDialogOpen(true);
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
              displayButtonAllStyle={{
                displayButtonStyle: styles.transparent,
              }}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: '',
            },
            {
              label: 'Download Excel',
              fn: () => downloadExcelFunction(),
            },
            {
              label: 'Find Matching Pair',
              fn: '',
            },
            {
              label: 'Compare Stone',
              fn: '',
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      displayButtonLabel: ManageLocales('app.searchResult.footer.confirmStone'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.filled,
      fn: addToCart,
    },
  ];

  let displayButtonData = [
    {
      id: '1',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.giaCertificate'
      ),
      url: `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/Cert/${sliderData[0]?.certificate_number}.jpeg`,
    },

    {
      id: '2',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondVideo'
      ),
      iframeUrl: `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/Vision360.html?d=${sliderData[0]?.lot_id}&autoPlay=1`,
    },
    {
      id: '3',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondImage'
      ),
      url: `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${sliderData[0]?.lot_id}/still.jpg`,
    },
    {
      id: '4',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.b2b'
      ),
      url: `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${sliderData[0]?.lot_id}/still.jpg`,
    },
  ];

  const keyLabelMapping: KeyLabelMapping = {
    lot_id: 'Stock No',
    shape: 'Shape',
    carat: 'Carat',
    color: 'Color',
    clarity: 'Clarity',
    discount: 'Discount',
    amount: 'Amt($)',
  };
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

  const downloadImage = (imageUrl: string | undefined) => {
    window.open(imageUrl, '_blank');
  };

  const downloadFile = (downloadUrl: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Vision360.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDiamondDetailData = (
    id: string,
    url: string | undefined,
    iframeUrl: string | undefined
  ) => {
    setDiamondDetailIframeUrl('');
    setDiamondDetailImageUrl('');
    if (iframeUrl) {
      setDiamondDetailIframeUrl(iframeUrl);
    } else if (url) {
      setDiamondDetailImageUrl(url);
    }
    setActiveTab(id);
  };

  let tableCol = tableColumns
    ?.filter((column) => !column.is_disabled)
    ?.sort((a, b) => a.sequence - b.sequence);

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className={'flex-grow overflow-y-auto'}>
        <div className={`${styles.tableWrapper} ${mainTableStyle}`}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>
                  <div className={`flex text-center`}>
                    <Checkbox
                      onClick={handleSelectAllCheckbox}
                      data-testid={'Select All Checkbox'}
                      checked={isCheckAll}
                    />
                  </div>
                </th>
                {tableCol?.map((column) => (
                  <th key={column.accessor} className={`${styles.tableHead}`}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {tableRows.map((row: any, index: number) => (
                <tr
                  key={row.id}
                  className={styles.tableRow}
                  onClick={() => handleClick(row.id)}
                >
                  <td>
                    <CustomCheckBox
                      data={row.id}
                      onClick={handleClick}
                      isChecked={isCheck}
                    />
                  </td>
                  {tableCol?.map((column: any) => (
                    <td
                      key={`${row.id}-${column.accessor}`}
                      className={`
                    ${styles.tableData}  
                   
                   cursor-pointer
                  `}
                    >
                      {column.accessor === 'details' ? (
                        <div
                          className="flex items-center gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <CustomSlider
                            sheetTriggenContent={
                              <div
                                onClick={() => {
                                  setActiveTab('3');
                                  setSliderData([tableRows[index]]);
                                  setDiamondDetailIframeUrl('');
                                  setDiamondDetailImageUrl('');
                                }}
                              >
                                <Image
                                  src={imageOutline}
                                  alt={`${row?.lot_id} GIA Image`}
                                  width={20}
                                  height={20}
                                />
                              </div>
                            }
                            sheetContentStyle={styles.sheetContentStyle}
                            sheetContent={
                              <>
                                <div className={styles.sheetMainHeading}>
                                  <p>
                                    {ManageLocales(
                                      'app.searchResult.slider.stoneImage.image'
                                    )}
                                  </p>
                                </div>

                                <div className="flex justify-between  w-[80%] py-5 border-b border-solitaireSenary items-center mx-auto">
                                  {displayButtonData
                                    .filter((items) => items.id !== '1') // Filter out items with id '1'
                                    .map((items) => (
                                      <div key={items.id} className="">
                                        <CustomDisplayButton
                                          displayButtonLabel={
                                            items.displayButtonLabel
                                          }
                                          displayButtonAllStyle={{
                                            displayLabelStyle:
                                              activeTab === items.id
                                                ? `${styles.activeHeaderButtonStyle} border-b border-solitaireQuaternary pb-1 `
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
                                    ))}
                                </div>

                                <div className={styles.stoneSliderData}>
                                  {diamondDetailImageUrl.length === 0 &&
                                    diamondDetailIframeUrl.length === 0 && (
                                      <Image
                                        src={`https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${sliderData[0]?.lot_id}/still.jpg`}
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
                                        width="50%"
                                        height={350}
                                        frameBorder="0"
                                        src={diamondDetailIframeUrl}
                                      />
                                    )}
                                </div>

                                {/* button */}
                                <div className={styles.customButtonDiv}>
                                  <CustomDisplayButton
                                    displayButtonLabel={ManageLocales(
                                      'app.searchResult.slider.giaCertificate.share'
                                    )}
                                    displayButtonAllStyle={{
                                      displayButtonStyle: styles.transparent,
                                    }}
                                    // handleClick={showButtonHandleClick}
                                  />
                                  <CustomDisplayButton
                                    displayButtonLabel={ManageLocales(
                                      'app.searchResult.slider.giaCertificate.download'
                                    )}
                                    displayButtonAllStyle={{
                                      displayButtonStyle: styles.filled,
                                    }}
                                    handleClick={() => {
                                      diamondDetailImageUrl.length &&
                                        downloadImage(diamondDetailImageUrl);
                                      diamondDetailIframeUrl.length &&
                                        downloadFile(diamondDetailIframeUrl);
                                    }}
                                  />
                                </div>
                              </>
                            }
                          />
                          <CustomSlider
                            sheetTriggenContent={
                              <div
                                onClick={(e) => {
                                  setSliderData([tableRows[index]]);
                                }}
                              >
                                <Image
                                  src={certficateOutline}
                                  alt={`${row?.certificate_url}Certificate_Url`}
                                  width={20}
                                  height={20}
                                />
                              </div>
                            }
                            sheetContentStyle={styles.sheetContentStyle}
                            sheetContent={
                              <>
                                <div className={styles.sheetMainHeading}>
                                  <p>
                                    {ManageLocales(
                                      'app.searchResult.slider.giaCertificate.giaCertificate'
                                    )}
                                  </p>
                                </div>

                                <div className={styles.sliderData}>
                                  {sliderData[0] && (
                                    <Image
                                      src={`https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/Cert/${sliderData[0]?.certificate_number}.jpeg`}
                                      alt={``}
                                      width={500}
                                      height={0}
                                      style={{ height: '400px' }}
                                    />
                                  )}
                                </div>

                                {/* button */}
                                <div className={styles.customButtonDiv}>
                                  <CustomDisplayButton
                                    displayButtonLabel={ManageLocales(
                                      'app.searchResult.slider.giaCertificate.share'
                                    )}
                                    displayButtonAllStyle={{
                                      displayButtonStyle: styles.transparent,
                                    }}
                                    // handleClick={showButtonHandleClick}
                                  />
                                  <CustomDisplayButton
                                    displayButtonLabel={ManageLocales(
                                      'app.searchResult.slider.giaCertificate.download'
                                    )}
                                    displayButtonAllStyle={{
                                      displayButtonStyle: styles.filled,
                                    }}
                                    handleClick={() => {
                                      downloadImage(
                                        `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/Cert/${sliderData[0]?.certificate_number}.jpeg`
                                      );
                                    }}
                                  />
                                </div>
                              </>
                            }
                          />
                        </div>
                      ) : column.accessor === 'lot_id' ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <CustomSlider
                            sheetTriggenContent={
                              <div
                                onClick={() => {
                                  setActiveTab('3');
                                  setDiamondDetailIframeUrl('');
                                  setDiamondDetailImageUrl(``);
                                  setSliderData([tableRows[index]]);
                                }}
                                className={`${
                                  column.accessor === 'lot_id' &&
                                  row?.diamond_status === 'MemoOut'
                                    ? styles.memoOutBackground
                                    : row?.in_cart?.length
                                    ? styles.inCartBackground // Add your inCartBackground class
                                    : 'px-[5px]'
                                }`}
                              >
                                {row[column.accessor as keyof Product]}
                              </div>
                            }
                            sheetContentStyle={styles.diamondDetailSheet}
                            sheetContent={
                              <>
                                <div className={styles.diamondDetailHeader}>
                                  <p className={`text-solitaireTertiary`}>
                                    {`${ManageLocales(
                                      'app.searchResult.slider.diamondDetail.stockNo'
                                    )} : ${sliderData[0]?.lot_id}`}
                                  </p>
                                </div>
                                <div className="border-b border-solitaireQuaternary mt-5"></div>
                                {sliderData.map((data: Product | any) => {
                                  return (
                                    <>
                                      <div
                                        key={data.id}
                                        className="flex items-center justify-between my-5 px-10"
                                      >
                                        <div className="">
                                          {displayButtonData.map((items) => {
                                            return (
                                              <div key={items.id} className="">
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
                                        <div className="">
                                          {Object.keys(keyLabelMapping).map(
                                            (key) => (
                                              <div
                                                key={key}
                                                className="text-solitaireTertiary py-1"
                                              >
                                                <span className="text-xs">
                                                  {keyLabelMapping[key]}
                                                </span>
                                                <br />
                                                {key === 'amount'
                                                  ? data?.variants[0]?.prices[0]
                                                      ?.amount ?? '-'
                                                  : data[key] ?? '-'}
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
                                        <div
                                          className={styles.diamondDetailHeader}
                                        >
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
                                                  {
                                                    basicDetailsLabelMapping[
                                                      key
                                                    ]
                                                  }
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
                                                  {
                                                    measurementsLabelMapping[
                                                      key
                                                    ]
                                                  }
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
                                      <div className="sticky bottom-0 bg-solitairePrimary mb-5">
                                        {currentPath === '/search' && (
                                          <CustomFooter
                                            footerButtonData={footerButtonData}
                                          />
                                        )}
                                      </div>
                                    </>
                                  );
                                })}
                              </>
                            }
                          />
                        </div>
                      ) : column.accessor === 'rpt_number' ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="border-b border-solitaireQuaternary border-solid"
                        >
                          <a
                            href={`https://www.gia.edu/report-check?reportno=${row.rpt_number}`}
                            target="_blank"
                          >
                            {row.rpt_number !== null ? row.rpt_number : '-'}
                          </a>
                        </div>
                      ) : column.accessor === 'lab' ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="border-b border-solitaireQuaternary border-solid"
                        >
                          <a
                            href={`https://www.gia.edu/report-check?reportno=${row.rpt_number}`}
                            target="_blank"
                          >
                            {row.lab}
                          </a>
                        </div>
                      ) : column.accessor === 'amount' ? (
                        row.variants[0].prices[0].amount
                      ) : row[column.accessor as keyof Product] !== null ? (
                        row[column.accessor as keyof Product]
                      ) : (
                        '-'
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomDataTable;
