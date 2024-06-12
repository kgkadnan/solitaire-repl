import React from 'react';
import ActionButton from '../action-button';
import Image, { StaticImageData } from 'next/image';
export interface IEmptyScreenProps {
  label: string;
  imageSrc: string | StaticImageData;
  onClickHandler: () => void;
  contentReactNode?: React.ReactNode;
  isPrimary?: boolean;
}
const EmptyScreen: React.FC<IEmptyScreenProps> = ({
  label,
  onClickHandler,
  isPrimary,
  imageSrc,
  contentReactNode
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 h-[90%]">
      <Image src={imageSrc} alt={'empty'} />

      {contentReactNode}

      <ActionButton
        actionButtonData={[
          {
            variant: isPrimary ? 'primary' : 'secondary',
            label: label,
            handler: onClickHandler
          }
        ]}
      />
    </div>
  );
};

export default EmptyScreen;
