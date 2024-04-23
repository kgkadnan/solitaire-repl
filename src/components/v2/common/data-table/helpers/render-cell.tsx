import Image from 'next/image';
import Media from '@public/v2/assets/icons/data-table/Media.svg';
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

export const RenderDetails = ({ row, handleDetailImage }: any) => {
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
};

export const RenderLotId = ({
  renderedCellValue,
  row,
  handleDetailPage
}: any) => {
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
    // borderClass = 'border-neutral0';
  }

  return (
    <span
      className={`rounded-[4px] ${statusClass} border-[1px] px-[8px] py-[3px] ${borderClass}`}
      onClick={e => {
        e.stopPropagation();
        handleDetailPage({ row: row.original });
      }}
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

  return <Image src={imageSrc} alt={renderedCellValue} />;
};

export const RenderLab = ({ renderedCellValue, row }: any) => {
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
        <Link href={link} target="_blank" className={className}>
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
    <div
      className={`text-successMain border-[1px] border-successBorder bg-successSurface px-[8px] py-[2px] w-[74px] text-end rounded-[4px]`}
    >
      {`${
        renderedCellValue === 0
          ? '0.00'
          : formatNumber(renderedCellValue) ?? '0.00'
      }%`}
    </div>
  );
};

export const DiscountWithCross = ({ renderedCellValue }: any) => {
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '2px 8px',
        border: '1px',
        width: '74px',
        textAlign: 'end',
        borderRadius: '4px',
        background: 'var(--neutral-50)',
        color: 'var(--neutral-500)'
      }}
    >
      {`${
        renderedCellValue === 0
          ? '0.00'
          : formatNumber(renderedCellValue) ?? '0.00'
      }%`}
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
    </span>
  );
};

export const RenderCarat = ({ renderedCellValue }: any) => {
  return (
    <span>{`${
      renderedCellValue ? formatNumber(renderedCellValue) : '-'
    }`}</span>
  );
};

export const RenderAmount = ({ row }: any) => {
  return (
    <span>{`${
      formatNumber(row.original.variants[0].prices[0]?.amount) ?? '-'
    }`}</span>
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

export const RenderNewArrivalPrice = ({ row }: any) => {
  return <span>{`${formatNumber(row?.original?.price) ?? '-'}`}</span>;
};

export const RenderNewArrivalPricePerCarat = ({ row }: any) => {
  return (
    <span>{`${formatNumber(row?.original?.price_per_carat) ?? '0.00'}`}</span>
  );
};

export const RenderNewArrivalBidDiscount = ({ renderedCellValue }: any) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`text-infoMain border-[1px] border-infoBorder bg-infoSurface px-[8px] py-[2px] w-[74px] rounded-[4px] text-end`}
      >
        {`${
          renderedCellValue === 0
            ? '0.00'
            : formatNumber(renderedCellValue) ?? '0.00'
        }%`}
      </div>
    </div>
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
    // borderClass = 'border-neutral0';
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
    // borderClass = 'border-neutral0';
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
