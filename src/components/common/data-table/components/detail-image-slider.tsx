import Image from 'next/image';
import { CustomSlider } from '../../slider';
import styles from '../custom-table.module.scss';
import { CustomDisplayButton } from '../../buttons/display-button';
import { ManageLocales } from '@/utils/translate';
import { handleSwitchImageUrl } from '../helper/handle-switch-image-url';
import { FILE_URLS } from '@/constants/business-logic';
import { handleDownloadImage } from '../helper/handle-download-image';
import { handleDownloadFile } from '../helper/handle-download-file';
import imageOutline from '@public/assets/icons/image-outline.svg';
import { IDetailImageSlider } from '../interface';

export const DetailImageSlider: React.FC<IDetailImageSlider> = ({
  dataTableBodyState,
  dataTableBodySetState,
  tableRows,
  index,
  row
}) => {
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

  const switchButtonTabs = [
    {
      id: '1',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondImage'
      ),
      url: `${FILE_URLS.IMG.replace('***', sliderData[0]?.lot_id ?? '')}`
    },

    {
      id: '2',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondVideo'
      ),
      iframeUrl: `${FILE_URLS.VIDEO_FILE.replace(
        '***',
        sliderData[0]?.lot_id ?? ''
      )}`
    },
    {
      id: '3',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.b2bSparkle'
      ),
      iframeUrl: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        sliderData[0]?.lot_id ?? ''
      )}`
    }
  ];

  return (
    <CustomSlider
      sheetTriggenContent={
        <div
          onClick={() => {
            setActiveTab('1');
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
            <p>{ManageLocales('app.searchResult.slider.images.asset')}</p>
          </div>

          <div className="flex w-[80%] py-5 border-b border-solitaireSenary items-center mx-auto justify-center gap-10 ">
            {switchButtonTabs.map((items: any) => (
              <div key={items.id} className="">
                <CustomDisplayButton
                  displayButtonLabel={items.displayButtonLabel}
                  displayButtonAllStyle={{
                    displayLabelStyle:
                      activeTab === items.id
                        ? `${styles.activeHeaderButtonStyle} border-b border-solitaireQuaternary pb-1`
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
                displayButtonStyle: styles.transparent
              }}
              // handleClick={showButtonHandleClick}
            />
            <CustomDisplayButton
              displayButtonLabel={ManageLocales(
                'app.searchResult.slider.giaCertificate.download'
              )}
              displayButtonAllStyle={{
                displayButtonStyle: styles.filled
              }}
              handleClick={() => {
                diamondDetailImageUrl.length &&
                  handleDownloadImage(diamondDetailImageUrl);
                diamondDetailIframeUrl.length &&
                  handleDownloadFile(diamondDetailIframeUrl);
              }}
            />
          </div>
        </>
      }
    />
  );
};
