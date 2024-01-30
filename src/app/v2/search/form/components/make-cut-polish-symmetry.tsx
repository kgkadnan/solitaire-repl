import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import { cut, make, polish, symmetry } from '@/constants/v2/form';
import React from 'react';
import { handleFilterChange } from '../helpers/handle-filter-changes';
import SingleTile from '@/components/v2/common/tile/single-tile';

export const MakeCutPolishSymmetry = ({ state, setState }: any) => {
  const {
    selectedMake,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedFluorescence
  } = state;
  const {
    setSelectedMake,
    setSelectedCut,
    setSelectedPolish,
    setSelectedSymmetry,
    setSelectedFluorescence
  } = setState;

  // Function to handle make change based on user selection
  const handleMakeChange = ({ data, selectedTile, setSelectedTile }: any) => {
    if (data.toLowerCase() === '3ex') {
      if (data !== selectedMake) {
        setSelectedCut(['EX']);
        setSelectedPolish(['EX']);
        setSelectedSymmetry(['EX']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
      setSelectedFluorescence(
        selectedFluorescence.filter((e: string) => e !== 'NON')
      );
    }
    if (data.toLowerCase() === '3ex+non') {
      if (data !== selectedTile) {
        setSelectedCut(['EX']);
        setSelectedPolish(['EX']);
        setSelectedSymmetry(['EX']);
        setSelectedFluorescence(['NON']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
        setSelectedFluorescence([]);
      }
    }
    if (data.toLowerCase() === '3vg+ex') {
      if (data !== selectedTile) {
        setSelectedCut(['EX', 'VG']);
        setSelectedPolish(['EX', 'VG']);
        setSelectedSymmetry(['EX', 'VG']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
      setSelectedFluorescence(
        selectedFluorescence.filter((e: string) => e !== 'NON')
      );
    }
    if (data.toLowerCase() === '3g') {
      if (data !== selectedTile) {
        setSelectedCut(['G']);
        setSelectedPolish(['G']);
        setSelectedSymmetry(['G']);
        setSelectedFluorescence([]);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
    }
    if (data.toLowerCase() === '3f') {
      if (data !== selectedTile) {
        setSelectedCut(['F']);
        setSelectedPolish(['F']);
        setSelectedSymmetry(['F']);
        setSelectedFluorescence([]);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
    }
    setSelectedTile(data === selectedTile ? '' : data);
  };

  // Function to handle filter change and make selection based on user input
  const handleFilterChangeAndMakeSelection = (
    data: string,
    selectedFilter: string[],
    setSelectedFilter: React.Dispatch<React.SetStateAction<string[]>>,
    firstCriteria: string[],
    secondCriteria: string[]
  ) => {
    handleFilterChange(data, selectedFilter, setSelectedFilter);
    const temp: string[] = [...selectedFilter];
    const index = temp.indexOf(data);
    if (index !== -1) {
      temp.splice(index, 1);
    } else {
      temp.push(data);
    }
    if (
      temp.toString() === 'EX' &&
      firstCriteria.toString() === 'EX' &&
      secondCriteria.toString() === 'EX'
    ) {
      if (selectedFluorescence.toString() === 'NON') {
        setSelectedMake('3EX+NON');
      } else {
        setSelectedMake('3EX');
      }
    } else if (
      (firstCriteria.toString() === 'EX,VG' ||
        firstCriteria.toString() === 'VG,EX') &&
      (secondCriteria.toString() === 'EX,VG' ||
        secondCriteria.toString() === 'VG,EX') &&
      (temp.toString() === 'EX,VG' || temp.toString() === 'VG,EX')
    ) {
      setSelectedMake('3VG+EX');
    } else if (
      temp.toString() === 'G' &&
      firstCriteria.toString() === 'G' &&
      secondCriteria.toString() === 'G'
    ) {
      setSelectedMake('3G');
    } else if (
      temp.toString() === 'F' &&
      firstCriteria.toString() === 'F' &&
      secondCriteria.toString() === 'F'
    ) {
      setSelectedMake('3F');
    } else {
      setSelectedMake('');
    }
  };

  // Function to handle filter changes and cut selection based on user input
  const handleCutChange = ({ data, selectedTile, setSelectedTile }: any) => {
    handleFilterChangeAndMakeSelection(
      data,
      selectedTile,
      setSelectedTile,
      selectedPolish,
      selectedSymmetry
    );
  };

  // Function to handle filter changes and polish selection based on user input
  const handlePolishChange = ({ data, selectedTile, setSelectedTile }: any) => {
    handleFilterChangeAndMakeSelection(
      data,
      selectedTile,
      setSelectedTile,
      selectedCut,
      selectedSymmetry
    );
  };

  // Function to handle filter changes and symmetry selection based on user input
  const handleSymmetryChange = ({
    data,
    selectedTile,
    setSelectedTile
  }: any) => {
    handleFilterChangeAndMakeSelection(
      data,
      selectedTile,
      setSelectedTile,
      selectedCut,
      selectedPolish
    );
  };

  const renderContent = [
    {
      header: 'Cut',
      data: cut,
      selected: selectedCut,
      setSelected: setSelectedCut,
      handleChange: handleCutChange
    },
    {
      header: 'Polish',
      data: polish,
      selected: selectedPolish,
      setSelected: setSelectedPolish,
      handleChange: handlePolishChange
    },
    {
      header: 'Symmetry',
      data: symmetry,
      selected: selectedSymmetry,
      setSelected: setSelectedSymmetry,
      handleChange: handleSymmetryChange
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
              <div className="flex flex-col gap-[12px]" key={'Make'}>
                <span className="text-sRegular">Make</span>
                <SingleTile
                  tileData={make}
                  selectedTile={selectedMake}
                  setSelectedTile={setSelectedMake}
                  handleTileClick={handleMakeChange}
                />
              </div>
              {renderContent.map(content => {
                return (
                  <div
                    className="flex flex-col gap-[12px]"
                    key={content.header}
                  >
                    <span className="text-sRegular">{content.header}</span>
                    <Tile
                      tileData={content.data}
                      selectedTile={content.selected}
                      setSelectedTile={content.setSelected}
                      handleTileClick={content.handleChange}
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
