import React, { useEffect, useState } from 'react';
import { CustomCheckBox } from '../checkbox';
import { Checkbox } from '@/components/ui/checkbox';
import CustomPagination from '../pagination';
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

export interface Rows {
  [key: string]: string | number | boolean | null | undefined | any;
  id: string | null;
  stock_no: string | null;
  is_memo_out: boolean;
  status: string | null;
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
  certificate_url: string | null;
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
          dropdownMenuLabel={['Share', 'Download Excel', 'Find Matching Pair']}
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

  // useEffect(() => {

  // }, []);

  let detailPageDisplayButtonData = [
    {
      id: '1',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.giaCertificate'
      ),
      url: sliderData[0]?.details?.gia,
    },
    {
      id: '2',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondImage'
      ),
      url: sliderData[0]?.details?.stone,
    },
    {
      id: '3',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondVideo'
      ),
      url: sliderData[0]?.details?.gia,
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
    stock_no: 'Stock No',
    shape: 'Shape',
    carat: 'Carat',
    color: 'Color',
    clarity: 'Clarity',
    discount: 'Discount',
    amount: 'Amt($)',
  };
  const basicDetailsLabelMapping: KeyLabelMapping = {
    stock_no: 'Stock No.',
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

  const handleDiamondDetailData = (id: string, url: string) => {
    setDiamondDetailImageUrl(url);
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
                    column.accessor !== 'status' ? styles.tableHead : ``
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
                  ) : column.accessor !== 'status' ? (
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
                    ${column.accessor !== 'status' ? styles.tableData : ``}  
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
                          sheetTriggerStyle={styles.mainCardContainer}
                          sheetTriggenContent={
                            <>
                              <div
                                onClick={(e) => {
                                  setSliderData([tableRows[index]]);
                                }}
                              >
                                <Image
                                  src={imageOutline}
                                  alt={`${row?.details?.gia} GIA Image`}
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
                                  {ManageLocales('app.savedSearch.detailInfo')}
                                </p>
                              </div>

                              {sliderData.map((data) => {
                                return (
                                  <div key={data.id}>
                                    <Image
                                      src={data.details.gia}
                                      alt={data.details.gia}
                                      width={500}
                                      height={500}
                                    />
                                  </div>
                                );
                              })}

                              <div className="border-b border-solitaireTertiary mt-8"></div>

                              {/* Show Results button */}
                              {/* <div className={styles.showResultMainDiv}>
                                <CustomDisplayButton
                                  displayButtonLabel="Show Results"
                                  displayButtonAllStyle={showResulutButtonStyle}
                                  handleClick={showButtonHandleClick}
                                />
                              </div> */}
                            </>
                          }
                        />
                        <CustomSlider
                          sheetTriggerStyle={styles.mainCardContainer}
                          sheetTriggenContent={
                            <>
                              <div
                                onClick={(e) => {
                                  setSliderData([tableRows[index]]);
                                }}
                              >
                                <Image
                                  src={certficateOutline}
                                  alt={`${row?.details?.stone} Stone Image`}
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
                                  {ManageLocales('app.savedSearch.detailInfo')}
                                </p>
                              </div>

                              {sliderData.map((data) => {
                                return (
                                  <div key={data.id}>
                                    <Image
                                      src={data.details.stone}
                                      alt={data.details.stone}
                                      width={500}
                                      height={500}
                                    />
                                  </div>
                                );
                              })}
                              <div className="border-b border-solitaireTertiary mt-8"></div>

                              {/* Show Results button */}
                              {/* <div className={styles.showResultMainDiv}>
                                <CustomDisplayButton
                                  displayButtonLabel="Show Results"
                                  displayButtonAllStyle={showResulutButtonStyle}
                                  handleClick={showButtonHandleClick}
                                />
                              </div> */}
                            </>
                          }
                        />
                      </div>
                    ) : column.accessor === 'stock_no' ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <CustomSlider
                          sheetTriggerStyle={styles.mainCardContainer}
                          sheetTriggenContent={
                            <>
                              <div
                                onClick={() => {
                                  setActiveTab('2');
                                  setDiamondDetailImageUrl(
                                    sliderData[0]?.details?.stone
                                  );
                                  setSliderData([tableRows[index]]);
                                }}
                                className={` ${
                                  column.accessor === 'stock_no' &&
                                  row.is_memo_out
                                    ? styles.memoOutBackground
                                    : 'px-[8px]'
                                }`}
                              >
                                {row[column.accessor as keyof Rows]}
                              </div>
                            </>
                          }
                          sheetContentStyle={styles.diamondDetailSheet}
                          sheetContent={
                            <>
                              <div className={styles.sheetMainHeading}>
                                <p className={`text-solitaireTertiary`}>
                                  {`${ManageLocales(
                                    'app.searchResult.slider.diamondDetail.stockNo'
                                  )} : ${sliderData[0]?.stock_no}`}
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
                                        {detailPageDisplayButtonData.map(
                                          (items) => {
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
                                                      items.url
                                                    )
                                                  }
                                                />
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                      <div className="">
                                        {diamondDetailImageUrl ? (
                                          <Image
                                            src={diamondDetailImageUrl}
                                            alt={diamondDetailImageUrl}
                                            width={200}
                                            height={200}
                                          />
                                        ) : (
                                          <Image
                                            src={data.details.stone}
                                            alt={data.details.stone}
                                            width={200}
                                            height={200}
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
                                      <Image
                                        src={shareSocialOutline}
                                        alt="downloadOutline"
                                        width={25}
                                        height={20}
                                      />
                                      <Image
                                        src={downloadOutline}
                                        alt="downloadOutline"
                                        width={25}
                                        height={20}
                                      />
                                      <Image
                                        src={dna}
                                        alt="downloadOutline"
                                        width={25}
                                        height={20}
                                      />
                                    </div>
                                    <div className="border-b border-solitaireQuaternary"></div>
                                    <div>
                                      <div className={styles.sheetMainHeading}>
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
                                                {data[key]}
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
                      <div>
                        <a
                          href={`https://www.gia.edu/report-check?reportno=${row.rpt_number}`}
                          target="_blank"
                        >
                          {row.rpt_number !== null ? row.rpt_number : '-'}
                        </a>
                      </div>
                    ) : column.accessor === 'lab' ? (
                      <div>
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
