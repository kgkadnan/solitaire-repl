import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import { cut, make, polish, symmetry } from '@/constants/v2/form';
import React from 'react';
import { handleChange } from '../helpers/handle-change';

export const MakeCutPolishSymmetry = ({ state, setState }: any) => {
  const { selectedMake, selectedCut, selectedPolish, selectedSymmetry } = state;
  const {
    setSelectedMake,
    setSelectedCut,
    setSelectedPolish,
    setSelectedSymmetry
  } = setState;

  const renderContent = [
    {
      header: 'Make',
      data: make,
      selected: selectedMake,
      setSelected: setSelectedMake
    },
    {
      header: 'Cut',
      data: cut,
      selected: selectedCut,
      setSelected: setSelectedCut
    },
    {
      header: 'Polish',
      data: polish,
      selected: selectedPolish,
      setSelected: setSelectedPolish
    },
    {
      header: 'Symmetry',
      data: symmetry,
      selected: selectedSymmetry,
      setSelected: setSelectedSymmetry
    }
  ];
  return (
    <div id="Make Cut Polish Symmetry">
      <AccordionComponent
        value="Make Cut Polish Symmetry"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
              {renderContent.map(content => {
                return (
                  <div className="flex flex-col gap-[12px]">
                    <span>{content.header}</span>
                    <Tile
                      tileData={content.data}
                      selectedTile={content.selected}
                      setSelectedTile={content.setSelected}
                      handleTileClick={handleChange}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        }
        accordionTrigger={'Make Cut Polish Symmetry'}
        hasError={false}
      />
    </div>
  );
};
