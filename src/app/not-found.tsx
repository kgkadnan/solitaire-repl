import diamond from '@public/v2/assets/icons/not-found.svg';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="mx-auto flex justify-center h-screen">
      <div className="absolute flex flex-col items-center gap-[60px] text-[20px]">
        <Image className="relative w-[204px] h-[204px]" alt="" src={diamond} />
        <div className="flex flex-col items-center justify-start gap-[30px]">
          <svg
            width="284"
            height="121"
            viewBox="0 0 284 121"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M51.0317 118.1V99.06H-0.00830078V81.06L36.8717 2.9H58.8717L21.9917 81.06H51.0317V51.06H70.5517V81.06H81.3517V99.06H70.5517V118.1H51.0317Z"
              fill="#CED2D2"
            />
            <path
              d="M141.975 120.5C133.815 120.5 126.615 118.767 120.375 115.3C114.135 111.78 109.255 106.9 105.735 100.66C102.269 94.42 100.535 87.22 100.535 79.06V41.94C100.535 33.78 102.269 26.58 105.735 20.34C109.255 14.1 114.135 9.24666 120.375 5.78C126.615 2.26 133.815 0.5 141.975 0.5C150.135 0.5 157.309 2.26 163.495 5.78C169.735 9.24666 174.615 14.1 178.135 20.34C181.655 26.58 183.415 33.78 183.415 41.94V79.06C183.415 87.22 181.655 94.42 178.135 100.66C174.615 106.9 169.735 111.78 163.495 115.3C157.309 118.767 150.135 120.5 141.975 120.5ZM141.975 102.18C146.029 102.18 149.709 101.22 153.015 99.3C156.322 97.3267 158.935 94.7133 160.855 91.46C162.775 88.1533 163.735 84.4733 163.735 80.42V40.5C163.735 36.3933 162.775 32.7133 160.855 29.46C158.935 26.1533 156.322 23.54 153.015 21.62C149.709 19.6467 146.029 18.66 141.975 18.66C137.922 18.66 134.242 19.6467 130.935 21.62C127.629 23.54 125.015 26.1533 123.095 29.46C121.175 32.7133 120.215 36.3933 120.215 40.5V80.42C120.215 84.4733 121.175 88.1533 123.095 91.46C125.015 94.7133 127.629 97.3267 130.935 99.3C134.242 101.22 137.922 102.18 141.975 102.18Z"
              fill="#CED2D2"
            />
            <path
              d="M253.688 118.1V99.06H202.648V81.06L239.528 2.9H261.528L224.648 81.06H253.688V51.06H273.208V81.06H284.008V99.06H273.208V118.1H253.688Z"
              fill="#CED2D2"
            />
          </svg>
          <div className="relative tracking-[0.16em] uppercase font-medium">
            Diamonds in the rough: This page needs polishing
          </div>
          <div className="relative text-[16px] font-medium text-center inline-block w-[659px]">
            Sorry but the page you are looking for does not exist, have been
            removed, name changed or is temporarily unavailable
          </div>
        </div>
      </div>
    </div>
  );
}
