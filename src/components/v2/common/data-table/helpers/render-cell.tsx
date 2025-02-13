import Image from 'next/image';
import Media from '@public/v2/assets/icons/data-table/Media.svg';
import disabledMedia from '@public/v2/assets/icons/data-table/disable-media.svg';

import Link from 'next/link';
import {
  GIA_LINK,
  HOLD_STATUS,
  LAB_LINKS,
  MEMO_STATUS
} from '@/constants/business-logic';
import Ind from '@public/v2/assets/png/data-table/IND.png';
import Usa from '@public/v2/assets/png/data-table/USA.png';
import Isr from '@public/v2/assets/png/data-table/ISR.png';
import Bel from '@public/v2/assets/png/data-table/BEL.png';
import Dub from '@public/v2/assets/png/data-table/DUB.png';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import Tooltip from '../../tooltip';
import lockIcon from '@public/v2/assets/icons/data-table/lock-icon.svg';
import { kycStatus } from '@/constants/enums/kyc';
import { handleUnlockPricing } from '@/app/v2/search/result/helpers/sale-team';

export const RenderDetails = ({ row, handleDetailImage }: any) => {
  const isEligible = Object.values(row.original.assets_pre_check).some(
    value => value === true
  );

  if (isEligible) {
    return (
      <button
        onClick={e => {
          e.stopPropagation();
          handleDetailImage({ row: row.original });
        }}
      >
        <Image src={Media} alt="Media" />
      </button>
    );
  } else {
    return (
      <Tooltip
        tooltipTrigger={
          <button>
            <Image src={disabledMedia} alt="Media" />
          </button>
        }
        tooltipContent={'Images & Videos for this stone are not available'}
        tooltipContentStyles={'z-[1000] w-[166px]'}
        tooltipContentSide="right"
      />
    );
  }
};

export const RenderLotId = ({ renderedCellValue, row }: any) => {
  let statusClass = '';
  let borderClass = '';
  if (row.original.diamond_status === MEMO_STATUS) {
    statusClass = 'bg-legendMemoFill';
    borderClass = 'border-lengendMemoBorder';
  } else if (row.original.diamond_status === HOLD_STATUS) {
    statusClass = 'bg-legendHoldFill';
    borderClass = 'border-lengendHoldBorder';
  } else if (
    row?.original?.in_cart &&
    Object.keys(row.original.in_cart).length
  ) {
    statusClass = 'bg-legendInCartFill';
    borderClass = 'border-lengendInCardBorder';
  } else {
    statusClass = 'border-none';
  }

  return (
    <span
      className={`rounded-[4px] ${statusClass} border-[1px] px-[8px] py-[3px] ${borderClass} flex !w-[85px]`}
    >
      {renderedCellValue}
    </span>
  );
};

export const RenderCartLotId = ({
  renderedCellValue,
  row,
  handleDetailPage
}: any) => {
  return (
    <span
      onClick={e => {
        e.stopPropagation();
        handleDetailPage({ row: row.original });
      }}
    >
      {renderedCellValue}
    </span>
  );
};

export const RenderTracerId = ({ row, renderedCellValue }: any) => {
  let link = row?.original?.tracr_id ?? '';
  const value =
    renderedCellValue?.length > 18
      ? `${renderedCellValue.slice(0, 18)}...`
      : renderedCellValue;

  return (
    <Link
      href={link}
      target="_blank"
      className="cursor-pointer"
      onClick={e => {
        e.stopPropagation();
      }}
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }}
    >
      {value ?? '-'}
    </Link>
  );
};

export const RednderLocation = ({ renderedCellValue }: any) => {
  let imageSrc;

  switch (renderedCellValue) {
    case 'IND':
      imageSrc = Ind;
      break;
    case 'USA':
      imageSrc = Usa;
      break;
    case 'USA-BD':
      imageSrc = Usa;
      break;
    case 'DUB':
      imageSrc = Dub;
      break;
    case 'ISR':
      imageSrc = Isr;
      break;
    case 'BEL':
      imageSrc = Bel;
      break;

    default:
      return null; // or any other fallback JSX
  }

  return (
    <Image
      src={imageSrc}
      alt={renderedCellValue}
      width={24}
      height={16}
      className="!w-[24px] !h-[16px]"
    />
  );
};

export const RenderLab = ({
  renderedCellValue,
  row,
  handleTrackEvent
}: any) => {
  let link = '';
  let className = '';

  if (row.original.lab === 'GIA') {
    link = `${LAB_LINKS.GIA_LINK}${row.original.certificate_number}`;
  } else if (row.original.lab === 'IGI') {
    link = `${LAB_LINKS.IGI_LINK}${row.original.certificate_number}`;
  } else if (row.original.lab === 'HRD') {
    link = `${LAB_LINKS.HRD_LINK}${row.original.certificate_number}`;
  }

  if (renderedCellValue) {
    className = 'underline text-infoMain';
  }

  return (
    <>
      {link ? (
        <Link
          href={link}
          target="_blank"
          className={className}
          onClick={() => {
            if (handleTrackEvent) {
              handleTrackEvent();
            }
          }}
        >
          {renderedCellValue}
        </Link>
      ) : (
        <span className={''}>{renderedCellValue ?? '-'}</span>
      )}
    </>
  );
};

export const RenderDiscount = ({ renderedCellValue }: any) => {
  return (
    <>
      <div
        className={`${
          renderedCellValue !== null
            ? 'text-successMain border-[1px] border-successBorder bg-successSurface '
            : ''
        } px-[4px] py-[2px] w-[65px] text-center rounded-[4px]`}
      >
        {renderedCellValue !== null
          ? renderedCellValue === 0
            ? '0.00%'
            : formatNumber(renderedCellValue) + '%'
          : '-'}
      </div>
    </>
  );
};

export const RenderBidDiscount = ({
  renderedCellValue,
  handleBidUnLockPricing,
  row
}: any) => {
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  return (
    <>
      {isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED ? (
        <>
          {row.original.price === null ? (
            <div
              className="group relative"
              onClick={() => {
                handleBidUnLockPricing();
              }}
            >
              {/* Lock Icon */}
              <Image
                src={lockIcon}
                alt="lockIcon"
                className="group-hover:hidden transition-all"
              />

              {/* Tooltip for "Unlock" on hover */}
              <div className="  font-medium text-infoMain text-sMedium  hidden group-hover:flex transition-all">
                Unlock
              </div>
            </div>
          ) : (
            <div
              className={`${
                renderedCellValue !== null
                  ? 'text-successMain border-[1px] border-successBorder bg-successSurface '
                  : ''
              } px-[4px] py-[2px] w-[65px] text-center rounded-[4px]`}
            >
              {renderedCellValue !== null
                ? renderedCellValue === 0
                  ? '0.00%'
                  : formatNumber(renderedCellValue) + '%'
                : '-'}
            </div>
          )}
        </>
      ) : (
        <div
          className={`${
            renderedCellValue !== null && renderedCellValue !== undefined
              ? 'text-successMain border-[1px] border-successBorder bg-successSurface '
              : ''
          } px-[4px] py-[2px] w-[65px] text-center rounded-[4px]`}
        >
          {renderedCellValue !== null && renderedCellValue !== undefined
            ? renderedCellValue === 0
              ? '0.00%'
              : formatNumber(renderedCellValue) + '%'
            : '-'}
        </div>
      )}
    </>
  );
};

export const DiscountWithCross = ({
  renderedCellValue,
  handleBidUnLockPricing,
  row
}: any) => {
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  return (
    <>
      {isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED ? (
        <>
          {row.original.price === null ? (
            <div
              className="group relative"
              onClick={() => {
                handleBidUnLockPricing();
              }}
            >
              {/* Lock Icon */}
              <Image
                src={lockIcon}
                alt="lockIcon"
                className="group-hover:hidden transition-all"
              />

              {/* Tooltip for "Unlock" on hover */}
              <div className="  font-medium text-infoMain text-sMedium  hidden group-hover:flex transition-all">
                Unlock
              </div>
            </div>
          ) : (
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
                padding: '2px 4px',
                width: '65px',
                textAlign: 'center',
                borderRadius: '4px',
                background:
                  renderedCellValue !== null && renderedCellValue !== undefined
                    ? 'var(--neutral-100)'
                    : '',
                color:
                  renderedCellValue !== null && renderedCellValue !== undefined
                    ? 'var(--neutral-500)'
                    : '',
                border:
                  renderedCellValue !== null && renderedCellValue !== undefined
                    ? '1px solid var(--neutral-200)'
                    : ''
              }}
            >
              {renderedCellValue !== null && renderedCellValue !== undefined
                ? renderedCellValue === 0
                  ? '0.00%'
                  : formatNumber(renderedCellValue) + '%'
                : '-'}
              {renderedCellValue !== null && renderedCellValue !== undefined ? (
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '6px',
                    width: '85%',
                    height: '1px',
                    backgroundColor: 'black',
                    transform: 'translateY(-50%) rotate(-15deg)'
                  }}
                ></span>
              ) : (
                ''
              )}
            </span>
          )}
        </>
      ) : (
        <span
          style={{
            position: 'relative',
            display: 'inline-block',
            padding: '2px 4px',
            width: '65px',
            textAlign: 'center',
            borderRadius: '4px',
            background:
              renderedCellValue !== null && renderedCellValue !== undefined
                ? 'var(--neutral-100)'
                : '',
            color:
              renderedCellValue !== null && renderedCellValue !== undefined
                ? 'var(--neutral-500)'
                : '',
            border:
              renderedCellValue !== null && renderedCellValue !== undefined
                ? '1px solid var(--neutral-200)'
                : ''
          }}
        >
          {renderedCellValue !== null && renderedCellValue !== undefined
            ? renderedCellValue === 0
              ? '0.00%'
              : formatNumber(renderedCellValue) + '%'
            : '-'}
          {renderedCellValue !== null && renderedCellValue !== undefined ? (
            <span
              style={{
                position: 'absolute',
                top: '50%',
                right: '6px',
                width: '85%',
                height: '1px',
                backgroundColor: 'black',
                transform: 'translateY(-50%) rotate(-15deg)'
              }}
            ></span>
          ) : (
            ''
          )}
        </span>
      )}
    </>
  );
};

export const RenderCarat = ({ renderedCellValue }: any) => {
  return (
    <span>{`${
      renderedCellValue ? formatNumber(renderedCellValue) : '-'
    }`}</span>
  );
};

export const RenderNumericFields = ({ renderedCellValue }: any) => {
  return (
    <>
      <span>{`${
        renderedCellValue !== null
          ? `$${formatNumberWithCommas(renderedCellValue)}`
          : '-'
      }`}</span>
    </>
  );
};

export const RenderBidNumericFields = ({
  renderedCellValue,
  handleBidUnLockPricing,
  row
}: any) => {
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  return (
    <>
      {isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED ? (
        <>
          {row.original.price === null ? (
            <div
              className="group relative"
              onClick={() => {
                handleBidUnLockPricing();
              }}
            >
              {/* Lock Icon */}
              <Image
                src={lockIcon}
                alt="lockIcon"
                className="group-hover:hidden transition-all"
              />

              {/* Tooltip for "Unlock" on hover */}
              <div className="  font-medium text-infoMain text-sMedium  hidden group-hover:flex transition-all">
                Unlock
              </div>
            </div>
          ) : (
            <>
              {' '}
              {renderedCellValue !== null ? (
                <span>{formatNumberWithCommas(renderedCellValue)}</span>
              ) : (
                '-'
              )}
            </>
          )}
        </>
      ) : (
        <span>{`${
          renderedCellValue
            ? `$${formatNumberWithCommas(renderedCellValue)}`
            : '-'
        }`}</span>
      )}
    </>
  );
};

export const RenderPricePerCarat = ({ renderedCellValue }: any) => {
  return (
    <>
      <span>{`${
        renderedCellValue !== null
          ? `$${formatNumberWithCommas(renderedCellValue)}`
          : '-'
      }`}</span>
    </>
  );
};

export const RenderAmount = ({ row }: any) => {
  return (
    <>
      <span>{`${
        row.original.variants[0].prices[0]?.amount === null ||
        row.original.variants[0].prices[0]?.amount === undefined
          ? '-'
          : `$${formatNumberWithCommas(
              row.original.variants[0].prices[0]?.amount
            )}`
      }`}</span>
    </>
  );
};

export const RenderShape = ({ row }: any) => {
  return <span>{`${row.original.shape}`}</span>;
};

export const RenderMeasurements = ({ row }: any) => {
  return (
    <span>{`${row.original.length}*${row.original.width}*${row.original.depth}`}</span>
  );
};

export const RenderNewArrivalPrice = ({ row, handleBidUnLockPricing }: any) => {
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  return (
    <>
      {isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED ? (
        <>
          {row?.original?.price === null && row?.original?.amount === null ? (
            <div
              className="group relative"
              onClick={() => {
                handleBidUnLockPricing();
              }}
            >
              {/* Lock Icon */}
              <Image
                src={lockIcon}
                alt="lockIcon"
                className="group-hover:hidden transition-all"
              />

              {/* Tooltip for "Unlock" on hover */}
              <div className="  font-medium text-infoMain text-sMedium  hidden group-hover:flex transition-all">
                Unlock
              </div>
            </div>
          ) : (
            <span>
              {formatNumberWithCommas(
                row?.original?.price || row?.original?.amount
              )}
            </span>
          )}
        </>
      ) : (
        <span>{`${
          row?.original?.price === null && row?.original?.amount === null
            ? '-'
            : `$${formatNumberWithCommas(
                row?.original?.price || row?.original?.amount
              )}`
        }`}</span>
      )}
    </>
  );
};

export const RenderNewArrivalPricePerCarat = ({
  row,
  handleBidUnLockPricing
}: any) => {
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  return (
    <>
      {isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED ? (
        <>
          {row.original.price === null ? (
            <div
              className="group relative"
              onClick={() => {
                handleBidUnLockPricing();
              }}
            >
              {/* Lock Icon */}
              <Image
                src={lockIcon}
                alt="lockIcon"
                className="group-hover:hidden transition-all"
              />

              {/* Tooltip for "Unlock" on hover */}
              <div className="  font-medium text-infoMain text-sMedium  hidden group-hover:flex transition-all">
                Unlock
              </div>
            </div>
          ) : (
            <>
              {row?.original?.price_per_carat === null ? (
                '-'
              ) : (
                <span>
                  {formatNumberWithCommas(row?.original?.price_per_carat)}
                </span>
              )}
            </>
          )}
        </>
      ) : (
        <span>{`${
          row?.original?.price_per_carat === null
            ? '-'
            : `$${formatNumberWithCommas(row?.original?.price_per_carat)}`
        }`}</span>
      )}
    </>
  );
};

export const RenderNewArrivalBidDiscount = ({
  renderedCellValue,
  handleBidUnLockPricing,
  row
}: any) => {
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  return (
    <>
      {isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED ? (
        <>
          {row.original.price === null ? (
            <div
              className="group relative"
              onClick={() => {
                handleBidUnLockPricing();
              }}
            >
              {/* Lock Icon */}
              <Image
                src={lockIcon}
                alt="lockIcon"
                className="group-hover:hidden transition-all"
              />

              {/* Tooltip for "Unlock" on hover */}
              <div className="  font-medium text-infoMain text-sMedium  hidden group-hover:flex transition-all">
                Unlock
              </div>
            </div>
          ) : (
            <>
              {renderedCellValue === null ? (
                '-'
              ) : (
                <div className="w-full flex justify-center items-center">
                  <div
                    className={`${
                      renderedCellValue !== null
                        ? 'text-successMain border-[1px] border-successBorder bg-successSurface'
                        : ''
                    }  px-[4px] py-[2px] w-[65px] rounded-[4px] text-center`}
                  >
                    {renderedCellValue !== null
                      ? renderedCellValue === 0
                        ? '0.00%'
                        : formatNumber(renderedCellValue) + '%'
                      : '-'}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <div
            className={`${
              renderedCellValue !== null
                ? 'text-successMain border-[1px] border-successBorder bg-successSurface'
                : ''
            }  px-[4px] py-[2px] w-[65px] rounded-[4px] text-center`}
          >
            {renderedCellValue !== null
              ? renderedCellValue === 0
                ? '0.00%'
                : formatNumber(renderedCellValue) + '%'
              : '-'}
          </div>
        </div>
      )}
    </>
  );
};

export const RenderNewArrivalLotId = ({ renderedCellValue, row }: any) => {
  let statusClass = '';
  let borderClass = '';
  let textClass = '';
  if (row.original.current_max_bid < row.original.my_current_bid) {
    statusClass = 'bg-successSurface';
    borderClass = 'border-successBorder';
    textClass = 'text-successMain';
  } else if (row.original.current_max_bid > row.original.my_current_bid) {
    statusClass = 'bg-dangerSurface';
    borderClass = 'border-dangerBorder';
    textClass = 'text-dangerMain';
  } else if (row.original.current_max_bid === row.original.my_current_bid) {
    statusClass = 'bg-successSurface';
    borderClass = 'border-successBorder';
    textClass = 'text-successMain';
  } else {
    statusClass = 'border-none';
  }

  return (
    <span
      className={`rounded-[4px] ${statusClass} border-[1px] px-[8px] py-[3px] ${borderClass} ${textClass}`}
    >
      {renderedCellValue}
    </span>
  );
};

export const RenderNewArrivalLotIdColor = ({ row }: any) => {
  let statusClass = '';
  let textClass = '';
  if (row.original.current_max_bid < row.original.my_current_bid) {
    statusClass = 'var(--success-surface)';
    textClass = 'var(--success-main)';
  } else if (row.original.current_max_bid > row.original.my_current_bid) {
    statusClass = 'var(--danger-surface)';
    textClass = 'var(--danger-main)';
  } else if (row.original.current_max_bid === row.original.my_current_bid) {
    statusClass = 'var(--success-surface)';
    textClass = 'var(--success-main)';
  } else {
    statusClass = 'border-none';
  }

  return {
    background: statusClass,
    text: textClass
  };
};

export const RenderBidToBuyLotIdColor = ({ row }: any) => {
  let statusClass = '';
  let textClass = '';
  if (row.original.is_win) {
    statusClass = 'var(--success-surface)';
    textClass = 'var(--success-main)';
  } else {
    statusClass = 'var(--danger-surface)';
    textClass = 'var(--danger-main)';
  }

  return {
    background: statusClass,
    text: textClass
  };
};

export const RenderBidDate = ({ row }: any) => {
  const date = new Date(row.original.last_bid_date);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(2);

  const formattedDate = `${day}/${month}/${year}`;
  return <span>{`${formattedDate ?? '-'}`}</span>;
};
