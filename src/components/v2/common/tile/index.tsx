import React from 'react';
import { Button } from '@/components/ui/button';
import styles from './tile.module.scss';
import Tooltip from '../tooltip';

interface ITileProps {
  tileData: string[] | { title: string; short_name: string }[];
  handleTileClick: ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[] | string;
    setSelectedTile:
      | React.Dispatch<React.SetStateAction<string[]>>
      | React.Dispatch<React.SetStateAction<string>>;
  }) => void;
  selectedTile: string[] | string;
  setSelectedTile:
    | React.Dispatch<React.SetStateAction<string[]>>
    | React.Dispatch<React.SetStateAction<string>>;
}

const Tile = ({
  tileData,
  handleTileClick,
  selectedTile,
  setSelectedTile
}: ITileProps) => {
  return (
    <div className={styles.tileContainer}>
      {tileData.map((tile: string | { title: string; short_name: string }) => {
        return (
          <>
            {typeof tile === 'string' ? (
              <Button
                key={tile}
                onClick={() =>
                  handleTileClick({ data: tile, selectedTile, setSelectedTile })
                }
                className={` ${styles.tileDefaultStyles}   ${
                  (
                    typeof selectedTile === 'string'
                      ? tile === selectedTile
                      : selectedTile.includes(tile)
                  )
                    ? styles.tileActiveStyle
                    : `${styles.tileDisableStyle} ${styles.tileStyles}`
                }`}
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
                        : `${styles.tileDisableStyle} ${styles.tileStyles}`
                    }`}
                  >
                    {tile.short_name}
                  </Button>
                }
                tooltipContent={tile.title}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Tile;
