import Image from 'next/image';
import { CustomSlider } from '../../slider';
import { ManageLocales } from '@/utils/translate';
import { FILE_URLS } from '@/constants/business-logic';
import { CustomDisplayButton } from '../../buttons/display-button';
import { handleDownloadImage } from '../helper/handle-download-image';
import styles from '../custom-table.module.scss';
import certficateOutline from '@public/assets/icons/ph_certificate-light.svg';
import { IDetailCertificateSlider } from '../interface';

export const DetailCertificateSlider: React.FC<IDetailCertificateSlider> = ({
  dataTableBodyState,
  dataTableBodySetState,
  tableRows,
  index,
  row
}) => {
  const { sliderData } = dataTableBodyState;
  const { setSliderData } = dataTableBodySetState;
  return (
    <CustomSlider
      sheetTriggenContent={
        <div
          onClick={() => {
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
                handleDownloadImage(
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
  );
};
