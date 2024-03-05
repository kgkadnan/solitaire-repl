import Image from 'next/image';
import Media from '@public/v2/assets/icons/data-table/Media.svg';
import Link from 'next/link';
import { GIA_LINK, HOLD_STATUS, MEMO_STATUS } from '@/constants/business-logic';
import Ind from '@public/v2/assets/png/data-table/IND.png';
import Usa from '@public/v2/assets/png/data-table/USA.png';
import Isr from '@public/v2/assets/png/data-table/ISR.png';
import Bel from '@public/v2/assets/png/data-table/BEL.png';
import Dub from '@public/v2/assets/png/data-table/DUB.png';

export const RenderDetails = () => {
  return <Image src={Media} alt="Media" />;
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
    // borderClass = 'border-neutral0';
  }

  return (
    <span
      className={`rounded-[4px] ${statusClass} border-[1px] px-[8px] py-[3px] ${borderClass}`}
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
      {value}
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
  return (
    <>
      {' '}
      {row.original.lab === 'GIA' ? (
        <Link href={`${GIA_LINK}${row.original.rpt_number}`} target="_blank">
          {renderedCellValue}
        </Link>
      ) : (
        <span>{renderedCellValue}</span>
      )}
    </>
  );
};

export const RenderDiscount = ({ renderedCellValue }: any) => {
  return (
    <div
      className={`text-successMain border-[1px] border-successBorder bg-successSurface px-[8px] py-[2px] w-full rounded-[4px]`}
    >
      {`${renderedCellValue && renderedCellValue}%`}
    </div>
  );
};

export const RenderCarat = ({ renderedCellValue }: any) => {
  return <span>{`${renderedCellValue && renderedCellValue.toFixed(2)}`}</span>;
};

export const RenderAmount = ({ row }: any) => {
  return <span>{`${row.original.variants[0].prices[0].amount}`}</span>;
};

export const RenderShape = ({ row }: any) => {
  return <span>{`${row.original.shape}`}</span>;
};

export const RenderMeasurements = ({ row }: any) => {
  return (
    <span>{`${row.original.length}*${row.original.width}*${row.original.depth}`}</span>
  );
};
