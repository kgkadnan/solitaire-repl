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
    <div className="flex flex-col items-center gap-2">
      <Image src={imageSrc} alt={imageSrc} />
      <p className="text-black">{message}</p>
      <ActionButton
        actionButtonData={[
          {
            variant: 'secondary',
            label: label,
            handler: onClickHandler
          }
        ]}
      />
      {/* You can customize the styling and add more elements as needed */}
    </div>
  );
};

export default EmptyScreen;
