import Image from 'next/image';
import Media from '@public/v2/assets/icons/data-table/Media.svg';
import Link from 'next/link';
import { GIA_LINK, HOLD_STATUS, MEMO_STATUS } from '@/constants/business-logic';
import Ind from '@public/v2/assets/png/data-table/IND.png';
import Usa from '@public/v2/assets/png/data-table/USA.png';
import Isr from '@public/v2/assets/png/data-table/ISR.png';
import Bel from '@public/v2/assets/png/data-table/BEL.png';
import Dub from '@public/v2/assets/png/data-table/DUB.png';

export const RenderDetails = ({ row, handleDetailImage }: any) => {
  return (
    <button
      onClick={() => {
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
      onClick={() => {
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
  return (
    <>
      {' '}
      {row.original.lab === 'GIA' ? (
        <Link
          href={`${GIA_LINK}${row.rpt_number}`}
          target="_blank"
          className="underline text-infoMain"
        >
          {renderedCellValue}
        </Link>
      ) : (
        <span className="underline text-infoMain">{renderedCellValue}</span>
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
