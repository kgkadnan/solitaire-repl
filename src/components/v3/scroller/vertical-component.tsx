'use client';
import React, { useState } from 'react';
import Card from './card';

interface VerticalContainerProps {
  items: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    details: string;
  }[];
}

const VerticalContainer: React.FC<VerticalContainerProps> = ({ items }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedCard(id === selectedCard ? null : id);
  };

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <div className="flex-1 overflow-y-auto">
        {items.map((item, index) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            details={item.details}
            isSelected={selectedCard === item.id}
            onClick={handleCardClick}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalContainer;
