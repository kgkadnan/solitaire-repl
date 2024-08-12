import React from 'react';

interface ICardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  details: string;
  isSelected: boolean;
  onClick: (id: number) => void;
  isReversed: boolean;
}

const Card: React.FC<ICardProps> = ({
  id,
  title,
  description,
  imageUrl,
  details,
  isSelected,
  onClick,
  isReversed
}) => {
  return (
    <div
      className={`flex ${
        isReversed ? 'flex-row-reverse' : 'flex-row'
      } items-center p-4 cursor-pointer hover:bg-gray-100`}
      onClick={() => onClick(id)}
    >
      <div className="flex-1">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        {isSelected && (
          <div className="mt-4 p-4 bg-gray-200 rounded">{details}</div>
        )}
      </div>
      <div className="w-1/2 p-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto object-cover rounded"
        />
      </div>
    </div>
  );
};

export default Card;
