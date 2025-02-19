import { AccordionComponent } from '@/components/v2/common/accordion';
import ImageTile from '@/components/v2/common/image-tile';
import React, { Dispatch, SetStateAction } from 'react';
import { shape } from '@/constants/v2/form';
import { compareArrays } from '../helpers/compare-arrays';
import { handleFilterChange } from '../helpers/handle-filter-changes';

interface IShapeProps {
  selectedShape: string[];
  setSelectedShape: Dispatch<SetStateAction<string[]>>;
}

export const Shape = ({ selectedShape, setSelectedShape }: IShapeProps) => {
  const handleShapeChange = (shapeData: string) => {
    const filteredShape: string[] = shape.map(data => data.short_name);
    if (shapeData.toLowerCase() === 'all') {
      setSelectedShape(filteredShape);
      if (selectedShape.includes('All')) {
        setSelectedShape([]);
      }
    } else {
      if (selectedShape.includes('All')) {
        const filteredSelectedShape: string[] = selectedShape.filter(
          (data: any) => data !== 'All' && data !== shapeData
        );
        setSelectedShape(filteredSelectedShape);
      } else if (
        compareArrays(
          selectedShape.filter((data: any) => data !== 'All'),
          filteredShape.filter(data => data !== 'All' && data !== shapeData)
        )
      ) {
        setSelectedShape(filteredShape);
      } else {
        handleFilterChange(shapeData, selectedShape, setSelectedShape);
      }
    }
  };

  return (
    <div id="Shape">
      <AccordionComponent
        value="Shape"
        isDisable={true}
        accordionContent={
          <ImageTile
            imageTileData={shape}
            selectedTile={selectedShape}
            handleSelectTile={handleShapeChange}
          />
        }
        accordionTrigger={'Shape'}
        hasError={false}
      />
    </div>
  );
};
