import { usePathname } from 'next/navigation';
import { CustomSlider } from '../../slider';
import { Product } from '@/app/search/result/result-interface';
import { ManageLocales } from '@/utils/translate';
import { IDiamondDetailSlider, IswitchButtonTabs } from '../interface';
import { CustomDisplayButton } from '../../buttons/display-button';
import { handleSwitchImageUrl } from '../helper/handle-switch-image-url';
import Image from 'next/image';
import { FILE_URLS } from '@/constants/business-logic';
import { CustomFooter } from '../../footer';
import styles from '../custom-table.module.scss';
import downloadOutline from '@public/assets/icons/download-outline.svg';
import dna from '@public/assets/icons/ph_dna-light.svg';
import shareSocialOutline from '@public/assets/icons/share-social-outline.svg';
import {
  basicDetailsLabelMapping,
  inclusionDetailsLabelMapping,
  keyLabelMapping,
  measurementsLabelMapping,
  otherInformationsLabelMapping
} from '../lable-mapping';

export const DiamondDetailSlider: React.FC<IDiamondDetailSlider> = ({
  dataTableBodyState,
  dataTableBodySetState,
  tableRows,
  index,
  row,
  column,
  switchButtonTabs,
  footerButtonData
}) => {
  const currentPath = usePathname();
  const {
    sliderData,
    activeTab,
    diamondDetailImageUrl,
    diamondDetailIframeUrl
  } = dataTableBodyState;
  const {
    setSliderData,
    setActiveTab,
    setDiamondDetailImageUrl,
    setDiamondDetailIframeUrl
  } = dataTableBodySetState;

  return (
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
            column.accessor === 'lot_id' && row?.diamond_status === 'MemoOut'
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
                    {switchButtonTabs.map((items: IswitchButtonTabs) => {
                      return (
                        <div key={items.id} className="">
                          <CustomDisplayButton
                            displayButtonLabel={items.displayButtonLabel}
                            displayButtonAllStyle={{
                              displayLabelStyle:
                                activeTab === items.id
                                  ? styles.activeHeaderButtonStyle
                                  : styles.headerButtonStyle
                            }}
                            handleClick={() =>
                              handleSwitchImageUrl(
                                items.id,
                                items.url,
                                items.iframeUrl,
                                setDiamondDetailIframeUrl,
                                setDiamondDetailImageUrl,
                                setActiveTab
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
                    {diamondDetailImageUrl && !diamondDetailIframeUrl && (
                      <Image
                        src={diamondDetailImageUrl}
                        alt={``}
                        width={450}
                        height={450}
                        style={{ height: '450px' }}
                      />
                    )}

                    {diamondDetailIframeUrl && !diamondDetailImageUrl && (
                      <iframe
                        width={450}
                        height={450}
                        frameBorder="0"
                        src={diamondDetailIframeUrl}
                        className="mr-[37px]"
                      />
                    )}
                  </div>
                  <div className="">
                    {Object.keys(keyLabelMapping).map(key => (
                      <div key={key} className="text-solitaireTertiary py-1">
                        <span className="text-xs">{keyLabelMapping[key]}</span>
                        <br />
                        {key === 'amount'
                          ? data?.variants[0]?.prices[0]?.amount ?? '-'
                          : data[key] ?? '-'}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center mb-5 ml-[60px]">
                  <div onClick={() => {}} className="cursor-pointer">
                    <Image
                      src={shareSocialOutline}
                      alt="shareSocialOutline"
                      width={25}
                      height={20}
                    />
                  </div>
                  <div onClick={() => {}} className="cursor-pointer">
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
                    <Image src={dna} alt="dna" width={25} height={20} />
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
                      <p className={`text-solitaireQuaternary text-lg my-5`}>
                        {`${ManageLocales(
                          'app.searchResult.slider.diamondDetail.basicDetails'
                        )} `}
                      </p>
                      {Object.keys(basicDetailsLabelMapping).map(key => (
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
                      <p className={`text-solitaireQuaternary text-lg my-5`}>
                        {`${ManageLocales(
                          'app.searchResult.slider.diamondDetail.measurements'
                        )} `}
                      </p>
                      {Object.keys(measurementsLabelMapping).map(key => (
                        <div
                          key={key}
                          className="text-solitaireTertiary py-1 flex"
                        >
                          <span className="text-solitaireQuaternary w-[150px]">
                            {measurementsLabelMapping[key]}
                          </span>
                          <span>{data[key] ? data[key] : '-'}</span>
                        </div>
                      ))}
                    </div>
                    <div className="w-1/4">
                      <p className={`text-solitaireQuaternary text-lg my-5`}>
                        {`${ManageLocales(
                          'app.searchResult.slider.diamondDetail.inclusionDetails'
                        )} `}
                      </p>
                      {Object.keys(inclusionDetailsLabelMapping).map(key => (
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
                      <p className={`text-solitaireQuaternary text-lg my-5`}>
                        {`${ManageLocales(
                          'app.searchResult.slider.diamondDetail.otherInformations'
                        )} `}
                      </p>
                      {Object.keys(otherInformationsLabelMapping).map(key => (
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
                    <CustomFooter footerButtonData={footerButtonData} />
                  )}
                </div>
              </>
            );
          })}
        </>
      }
    />
  );
};
