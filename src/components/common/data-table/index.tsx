import React, { useState } from 'react';
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
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface Rows {
  [key: string]: string | number | boolean | null | undefined | any;
  id: string | null;
  stock_no: string | null;
  is_memo_out: boolean;
  diamond_status: string | null;
  discount: number;
  amount: number;
  color: string | null;
  shape: string | null;
  clarity: string | null;
  cut: string | null;
  polish: string | null;
  fluorescence: string | null;
  symmetry: string | null;
  lab: string | null;
  rpt_number: string | null;
  certificate_number: number | null;
  lot_id: number | null;
  certificate_url: string | StaticImport;
  girdle: string | null;
  location: string | null;
  color_shade: string | null;
  color_shade_intensity: string | null;
  intensity: string | null;
  overtone: string | null;
  ha: string | null;
  brilliance: string | null;
  black_table: string | null;
  side_black: string | null;
  open_crown: string | null;
  open_pavilion: string | null;
  milky: string | null;
  luster: string | null;
  eye_clean: string | null;
  open_table: string | null;
  table_inclusion: string | null;
  side_inclusion: string | null;
  natural_crown: string | null;
  natural_pavilion: string | null;
  natural_girdle: string | null;
  surface_graining: string | null;
  internal_graining: string | null;
  carat: number | null;
  star_length: number | null;
  price_range: number | null;
  price_per_carat: number | null;
  girdle_percentage: number | null;
  pavilion_angle: number | null;
  depth_percentage: number | null;
  table_percentage: number | null;
  crown_angle: number | null;
  crown_height: number | null;
  pavilion_depth: number | null;
  lower_half: number | null;
  ratio: number | null;
  length: number | null;
  depth: number | null;
  width: number | null;
  rap: number | null;
  rap_value: number | null;
  culet: string | null;
  inscription: string | null;
  tracr_id: string | null;
  total_grade: string | null;
  disclosed_source: string | null;
  country_origin: string | null;
  details: any;
}

interface KeyLabelMapping {
  [key: string]: string;
}
interface ICustomDataTableProps {
  tableRows: any;
  tableColumns: any;
  checkboxData: any;
}

const CustomDataTable: React.FC<ICustomDataTableProps> = ({
  tableRows,
  tableColumns,
  checkboxData,
}) => {
  const [sliderData, setSliderData] = useState<Rows[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [diamondDetailImageUrl, setDiamondDetailImageUrl] = useState('');
  const [diamondDetailIframeUrl, setDiamondDetailIframeUrl] = useState('');

  const { handleSelectAllCheckbox, handleClick, isCheck, isCheckAll } =
    checkboxData;

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
      displayButtonLabel: ManageLocales('app.searchResult.footer.confirmStone'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales(
        'app.searchResult.footer.addToWhislist'
      ),
      style: styles.filled,
      fn: () => {},
    },
    {
      id: 4,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.filled,
      fn: () => {},
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
      url: sliderData[0]?.details?.gia,
    },
    {
      id: '5',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.b2bSparkle'
      ),
      url: sliderData[0]?.details?.gia,
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
    lab: 'Lab',
    rap: 'Rap($)',
    shape: 'Shape',
    carat: 'Carat',
    color: 'Color',
    clarity: 'Clarity',
    color_shade: 'Color Shade',
    cut: 'Cut',
    polish: 'Polish',
    symmetry: 'Symmetry',
    fluorescence: 'Fluorescence',
    culet: 'Culet',
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
    pavilion_angle: 'Pavilion Angle',
    pavilion_depth: 'Pavilion Depth',
    girdle_percentage: 'Girdle%',
    luster: 'Luster',
  };
  const inclusionDetailsLabelMapping: KeyLabelMapping = {
    black_table: 'Table Black',
    side_black: 'Black Side%',
    table_inclusion: 'Table Inclusion',
    side_inclusion: 'Side Inclusion',
    open_table: 'Table Open',
    open_crown: 'Crown Open',
    open_pavilion: 'Pavilion Open',
    eye_clean: 'Eye Clean',
    ha: 'Hearts & Arrows',
    brilliance: 'Brilliancy',
    country_origin: 'Country of Origin',
    natural_girdle: 'Natural Girdle',
    natural_crown: 'Natural Crown',
    natural_pavilion: 'Natural Pavilion',
    internal_graining: 'Internal Graining',
    surface_graining: 'Surface Graining',
  };

  const otherInformationsLabelMapping: KeyLabelMapping = {
    key_to_symbbol: 'Key to Symbol',
    report_comments: 'Report Comments',
  };

  const downloadImage = (imageUrl: any) => {
    console.log('image', imageUrl);
    window.open(imageUrl, '_blank');
  };

  const downloadFile = (downloadUrl: any) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Vision360.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDiamondDetailData = (id: string, url: string, iframeUrl: any) => {
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
    <div className={'flex-grow overflow-y-auto min-h-[50vh]'}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              {tableColumns.map((column: any) => (
                <th
                  key={column.accessor}
                  className={`${
                    column.accessor !== 'diamond_status' ? styles.tableHead : ``
                  }`}
                >
                  {column.accessor === 'select' ? (
                    <div className={`flex text-center`}>
                      <Checkbox
                        onClick={handleSelectAllCheckbox}
                        data-testid={'Select All Checkbox'}
                        checked={isCheckAll}
                      />
                    </div>
                  ) : column.accessor !== 'diamond_status' ? (
                    column.label
                  ) : null}
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
                {tableColumns.map((column: any) => (
                  <td
                    key={`${row.id}-${column.accessor}`}
                    className={`
                    ${
                      column.accessor !== 'diamond_status'
                        ? styles.tableData
                        : ``
                    }  
                    ${
                      row[column.accessor as keyof Rows] == 'A'
                        ? styles.availableStatus
                        : ''
                    }
                  
                   cursor-pointer
                  `}
                  >
                    {column.accessor === 'select' ? (
                      <div className={`flex text-center`}>
                        <CustomCheckBox
                          data={row.id}
                          onClick={handleClick}
                          isChecked={isCheck}
                        />
                      </div>
                    ) : column.accessor === 'details' ? (
                      <div
                        className="flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CustomSlider
                          sheetTriggenContent={
                            <>
                              <div
                                onClick={(e) => {
                                  setActiveTab('3');
                                  setDiamondDetailIframeUrl('');
                                  setDiamondDetailImageUrl(
                                    `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${sliderData[0]?.lot_id}/still.jpg`
                                  );
                                  setSliderData([tableRows[index]]);
                                }}
                              >
                                <Image
                                  src={imageOutline}
                                  alt={`${row?.lot_id} GIA Image`}
                                  width={20}
                                  height={20}
                                />
                              </div>
                            </>
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

                              <div className="flex justify-around  w-[80%] py-5 border-b border-solitaireSenary items-center mx-auto">
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
                                              ? `${styles.activeHeaderButtonStyle} border-b border-solitaireQuaternary pb-1`
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
                                {!diamondDetailImageUrl.length &&
                                  !diamondDetailIframeUrl.length && (
                                    <Image
                                      src={`https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${sliderData[0]?.lot_id}/still.jpg`}
                                      alt={``}
                                      width={400}
                                      height={400}
                                    />
                                  )}
                                {diamondDetailImageUrl && (
                                  <Image
                                    src={diamondDetailImageUrl}
                                    alt={``}
                                    width={400}
                                    height={400}
                                    style={{ height: '400px' }}
                                  />
                                )}

                                {diamondDetailIframeUrl && (
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
                            <>
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
                            </>
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
                                    alt={`No Certificate Found`}
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
                            <>
                              <div
                                onClick={() => {
                                  setActiveTab('3');
                                  setDiamondDetailIframeUrl('');
                                  setDiamondDetailImageUrl(
                                    `https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/V360Mini5/imaged/${sliderData[0]?.lot_id}/still.jpg`
                                  );
                                  setSliderData([tableRows[index]]);
                                }}
                                className={` ${
                                  column.accessor === 'lot_id' &&
                                  row.is_memo_out
                                    ? styles.memoOutBackground
                                    : 'px-[5px]'
                                }`}
                              >
                                {row[column.accessor as keyof Rows]}
                              </div>
                            </>
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
                              {sliderData.map((data) => {
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
                                              width={400}
                                              height={400}
                                            />
                                          )}
                                        {diamondDetailImageUrl && (
                                          <Image
                                            src={diamondDetailImageUrl}
                                            alt={``}
                                            width={400}
                                            height={400}
                                            style={{ height: '400px' }}
                                          />
                                        )}

                                        {diamondDetailIframeUrl && (
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
                                    <div className="sticky bottom-[-35px] bg-solitairePrimary">
                                      <CustomFooter
                                        footerButtonData={footerButtonData}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          }
                        />
                      </div>
                    ) : column.accessor === 'rpt_number' ? (
                      <div onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`https://www.gia.edu/report-check?reportno=${row.rpt_number}`}
                          target="_blank"
                        >
                          {row.rpt_number !== null ? row.rpt_number : '-'}
                        </a>
                      </div>
                    ) : column.accessor === 'lab' ? (
                      <div onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`https://www.gia.edu/report-check?reportno=${row.rpt_number}`}
                          target="_blank"
                        >
                          {row.lab}
                        </a>
                      </div>
                    ) : row[column.accessor as keyof Rows] !== null ? (
                      row[column.accessor as keyof Rows]
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
  );
};

export default CustomDataTable;
