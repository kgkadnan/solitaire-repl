import React from 'react';
import ActionButton from '../action-button';
import Image from 'next/image';
interface IEmptyScreenProps {
  message: string;
  label: string;
  imageSrc: string;
  onClickHandler: () => void;
}
const EmptyScreen: React.FC<IEmptyScreenProps> = ({
  message,
  label,
  onClickHandler,
  imageSrc
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 h-[90%]">
      <Image src={imageSrc} alt={imageSrc} />
      <p className="text-black  w-[15%] text-center">{message}</p>
      <ActionButton
        actionButtonData={[
          {
            variant: 'secondary',
            label: label,
            handler: onClickHandler
          }
        ]}
      />
    </div>
  );
};

export default EmptyScreen;
