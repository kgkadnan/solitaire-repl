import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { shade } from '@/constants/v2/form';
// import { handleChange } from '../helpers/handle-change';

interface IShadeProps {
  selectedShade: string[];
  setSelectedShade: Dispatch<SetStateAction<string[]>>;
  milky: string[];
  setMilky: Dispatch<SetStateAction<string[]>>;
}

export const Shade = ({
  selectedShade,
  setSelectedShade,
  setMilky,
  milky
}: IShadeProps) => {
  const handleChange = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[];
    setSelectedTile: Dispatch<SetStateAction<string[]>>;
  }) => {
    // Define dependencies for "No BGM"
    const noBgmDependencies = ['None', 'White', 'Yellow'];
    const moValue = 'M0'; // Value present in milky state

    setSelectedTile(prevSelectedShade => {
      let updatedShades = [...prevSelectedShade];

      if (data === 'No BGM') {
        if (!updatedShades.includes('No BGM')) {
          // Select "No BGM" -> Also select its dependencies in shades & milky
          updatedShades = [...updatedShades, 'No BGM', ...noBgmDependencies];
          setMilky(prevMilky =>
            prevMilky.includes(moValue) ? prevMilky : [...prevMilky, moValue]
          );
        } else {
          // Deselect "No BGM" -> Remove dependencies from shades & milky
          updatedShades = updatedShades.filter(
            item => item !== 'No BGM' && !noBgmDependencies.includes(item)
          );
          setMilky(prevMilky => prevMilky.filter(item => item !== moValue));
        }
      } else if (noBgmDependencies.includes(data)) {
        console.log('noBgmDependencies', noBgmDependencies);
        // Handle individual shade selections
        if (updatedShades.includes(data)) {
          updatedShades = updatedShades.filter(item => item !== data);
        } else {
          updatedShades.push(data);
        }
      }

      // Handle Milky "M0" Selection Manually
      setMilky(prevMilky => {
        let updatedMilky = [...prevMilky];

        if (data === moValue) {
          if (updatedMilky.includes(moValue)) {
            updatedMilky = updatedMilky.filter(item => item !== moValue);
          } else {
            updatedMilky.push(moValue);
          }
        }

        // Check if all dependencies & M0 are selected -> Auto-select "No BGM"
        if (
          noBgmDependencies.every(dep => updatedShades.includes(dep)) &&
          updatedMilky.includes(moValue)
        ) {
          if (!updatedShades.includes('No BGM')) {
            updatedShades.push('No BGM');
          }
        } else {
          // If any dependency is missing, remove "No BGM"
          updatedShades = updatedShades.filter(item => item !== 'No BGM');
        }

        setSelectedTile(updatedShades);
        return updatedMilky;
      });

      return updatedShades; // ✅ Ensure we return the updated array
    });
  };

  return (
    <div id="Shade">
      <AccordionComponent
        value="Shade"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
            <Tile
              tileData={shade}
              selectedTile={selectedShade}
              setSelectedTile={setSelectedShade}
              handleTileClick={handleChange}
            />
          </div>
        }
        accordionTrigger={'Shade'}
        hasError={false}
      />
    </div>
  );
};
