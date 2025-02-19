import React from 'react';
import styles from './tile.module.scss';
import Tooltip from '../tooltip';
import { Button } from '../../ui/button';

export interface ITileProps {
  tileData: string[] | { title: string; short_name: string }[];
  handleTileClick: (_data: any) => void;
  selectedTile: string[];
  setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
  tileContainerStyle?: string;
  tileStyle?: string;
}

const Tile = ({
  tileData,
  handleTileClick,
  selectedTile,
  tileStyle,
  tileContainerStyle,
  setSelectedTile
}: ITileProps) => {
  return (
    <div className={`${styles.tileContainer} ${tileContainerStyle}`}>
      {tileData.map((tile: string | { title: string; short_name: string }) => {
        return (
          <div key={`${typeof tile === 'string' ? tile : tile.short_name}`}>
            {typeof tile === 'string' ? (
              <Button
                key={tile}
                onClick={() =>
                  handleTileClick({
                    data: tile,
                    selectedTile: selectedTile,
                    setSelectedTile: setSelectedTile
                  })
                }
                className={` ${styles.tileDefaultStyles}   ${
                  selectedTile.includes(tile)
                    ? styles.tileActiveStyle
                    : `${styles.tileDisableStyle} ${styles.tileStyles}`
                }  ${tileStyle}`}
              >
                {tile}
              </Button>
            ) : (
              <Tooltip
                tooltipTrigger={
                  <Button
                    onClick={() =>
                      handleTileClick({
                        data: tile.short_name,
                        selectedTile,
                        setSelectedTile
                      })
                    }
                    className={` ${styles.tileDefaultStyles}   ${
                      selectedTile.includes(tile.short_name)
                        ? styles.tileActiveStyle
                        : `${styles.tileDisableStyle} ${styles.tileStyles} `
                    }`}
                  >
                    {tile.short_name}
                  </Button>
                }
                tooltipContent={tile.title}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Tile;
