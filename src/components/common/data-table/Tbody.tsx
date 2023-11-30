import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { downloadExcelFromBase64 } from '@/utils/download-excel-from-base64';
import { usePathname } from 'next/navigation';
import { Product } from '@/app/search/result-interface';
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
import { CustomCheckBox } from '../checkbox';
import Image from 'next/image';
import certficateOutline from '@public/assets/icons/ph_certificate-light.svg';
import imageOutline from '@public/assets/icons/image-outline.svg';
import { ITbodyProps } from './interface';
import { useState } from 'react';
import styles from './custom-table.module.scss';
import {
  basicDetailsLabelMapping,
  inclusionDetailsLabelMapping,
  keyLabelMapping,
  measurementsLabelMapping,
  otherInformationsLabelMapping,
} from './lable-mapping';
import { FILE_URLS, GIA_LINK } from '@/constants/business-logic';

export const Tbody: React.FC<ITbodyProps> = ({
  tableRows,
  selectionAllowed,
  handleClick,
  isCheck,
  tableCol,
  setDialogContent,
  setIsDialogOpen,
  handleConfirm,
}) => {
  let currentPath = usePathname();

  const [sliderData, setSliderData] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [diamondDetailImageUrl, setDiamondDetailImageUrl] = useState('');
  const [diamondDetailIframeUrl, setDiamondDetailIframeUrl] = useState('');

  const [addCart] = useAddCartMutation();
  let [downloadExcel] = useDownloadExcelMutation();

  /* The above code is defining a function called `addToCart`. */
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

  /**
   * The `downloadExcelFunction` is a function that downloads an Excel file based on the `sliderData` and
   * displays a success message in a dialog box.
   */
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

  /**
   * The function `downloadImage` opens a new browser tab with the provided image URL.
   * @param {string | undefined} imageUrl - The `imageUrl` parameter is a string that represents the URL
   * of an image that you want to download.
   */
  const downloadImage = (imageUrl: string | undefined) => {
    window.open(imageUrl, '_blank');
  };

  /**
   * The `downloadFile` function creates a link element, sets its href and download attributes, appends
   * it to the document body, triggers a click event on the link, and then removes the link from the
   * document body.
   * @param {string} downloadUrl - The `downloadUrl` parameter is a string that represents the URL of the
   * file that you want to download.
   */
  const downloadFile = (downloadUrl: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'Vision360.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * The function `handleDiamondDetailData` sets the diamond detail iframe URL and image URL based on the
   * provided parameters and sets the active tab.
   * @param {string} id - A string representing the id of the diamond detail data.
   * @param {string | undefined} url - A string representing the URL of an image.
   * @param {string | undefined} iframeUrl - A string representing the URL of an iframe.
   */
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

  let displayButtonData = [
    {
      id: '1',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.giaCertificate'
      ),
      url: `${FILE_URLS.CERT_FILE.replace(
        '***',
        sliderData[0]?.certificate_number ?? ''
      )}`,
    },

    {
      id: '2',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondVideo'
      ),
      iframeUrl: `${FILE_URLS.VIDEO_FILE.replace(
        '***',
        sliderData[0]?.lot_id ?? ''
      )}`,
    },
    {
      id: '3',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondImage'
      ),
      url: `${FILE_URLS.IMG.replace('***', sliderData[0]?.lot_id ?? '')}`,
    },
  ];
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
      fn: () => handleConfirm && handleConfirm([sliderData[0]?.id]),
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.filled,
      fn: addToCart,
    },
  ];

  return (
    <tbody className={styles.tableBody}>
      {tableRows?.map((row: any, index: number) => (
        <tr
          key={row.id}
          className={styles.tableRow}
          onClick={() => handleClick!(row.id)}
        >
          {selectionAllowed && (
            <td>
              <CustomCheckBox
                data={row.id}
                onClick={handleClick!}
                isChecked={isCheck}
              />
            </td>
          )}

          {tableCol?.map((column: any, tableColindex: number) => (
            <td
              style={{
                left: `${
                  tableColindex === 0 && selectionAllowed ? '45px' : '0px'
                }`,
                position: `${tableColindex === 0 ? 'sticky' : 'static'}`,
              }}
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

                        <div className="flex w-[80%] py-5 border-b border-solitaireSenary items-center mx-auto justify-center gap-10 ">
                          {displayButtonData
                            .filter((items) => items.id !== '1') // Filter out items with id '1'
                            .map((items) => (
                              <div key={items.id} className="">
                                <CustomDisplayButton
                                  displayButtonLabel={items.displayButtonLabel}
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
                          {diamondDetailImageUrl.length === 0 &&
                            diamondDetailIframeUrl.length === 0 && (
                              <Image
                                src={`${FILE_URLS.IMG.replace(
                                  '***',
                                  sliderData[0]?.lot_id ?? ''
                                )}`}
                                alt={``}
                                width={500}
                                height={500}
                                style={{ height: '500px' }}
                              />
                            )}
                          {diamondDetailImageUrl && !diamondDetailIframeUrl && (
                            <Image
                              src={diamondDetailImageUrl}
                              alt={``}
                              width={500}
                              height={500}
                              style={{ height: '500px' }}
                            />
                          )}
                          {diamondDetailIframeUrl && !diamondDetailImageUrl && (
                            <iframe
                              width={500}
                              height={500}
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
                              src={`${FILE_URLS.CERT_FILE.replace(
                                '***',
                                sliderData[0]?.certificate_number ?? ''
                              )}`}
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
                                `${FILE_URLS.CERT_FILE.replace(
                                  '***',
                                  sliderData[0]?.certificate_number ?? ''
                                )}`
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
                                        src={`${FILE_URLS.IMG.replace(
                                          '***',
                                          sliderData[0]?.lot_id ?? ''
                                        )}`}
                                        alt={``}
                                        width={450}
                                        height={450}
                                        style={{ height: '450px' }}
                                      />
                                    )}
                                  {diamondDetailImageUrl &&
                                    !diamondDetailIframeUrl && (
                                      <Image
                                        src={diamondDetailImageUrl}
                                        alt={``}
                                        width={450}
                                        height={450}
                                        style={{ height: '450px' }}
                                      />
                                    )}

                                  {diamondDetailIframeUrl &&
                                    !diamondDetailImageUrl && (
                                      <iframe
                                        width={450}
                                        height={450}
                                        frameBorder="0"
                                        src={diamondDetailIframeUrl}
                                      />
                                    )}
                                </div>
                                <div className="">
                                  {Object.keys(keyLabelMapping).map((key) => (
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
                                  ))}
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
                                <a
                                  href={`https://storageweweb.blob.core.windows.net/files/INVENTORYDATA/DNA.html?id=${sliderData[0]?.lot_id}`}
                                  target="_blank"
                                  className="cursor-pointer"
                                >
                                  <Image
                                    src={dna}
                                    alt="dna"
                                    width={25}
                                    height={20}
                                  />
                                </a>
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
                                    {Object.keys(basicDetailsLabelMapping).map(
                                      (key) => (
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
                                      )
                                    )}
                                  </div>
                                  <div className="w-1/4">
                                    <p
                                      className={`text-solitaireQuaternary text-lg my-5`}
                                    >
                                      {`${ManageLocales(
                                        'app.searchResult.slider.diamondDetail.measurements'
                                      )} `}
                                    </p>
                                    {Object.keys(measurementsLabelMapping).map(
                                      (key) => (
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
                                      )
                                    )}
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
                                          {inclusionDetailsLabelMapping[key]}
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
                                          {otherInformationsLabelMapping[key]}
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
                  <a href={`${GIA_LINK}${row.rpt_number}`} target="_blank">
                    {row.rpt_number !== null ? row.rpt_number : '-'}
                  </a>
                </div>
              ) : column.accessor === 'lab' ? (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="border-b border-solitaireQuaternary border-solid"
                >
                  <a href={`${GIA_LINK}${row.rpt_number}`} target="_blank">
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
  );
};
