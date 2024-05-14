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
      className={`text-successMain border-[1px] text-center border-successBorder bg-successSurface px-[8px] py-[2px] w-full rounded-[4px]`}
    >
      {renderedCellValue !== null && renderedCellValue !== undefined
        ? renderedCellValue === 0
          ? '0.00%'
          : formatNumber(renderedCellValue) + '%'
        : '-'}{' '}
    </div>
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
