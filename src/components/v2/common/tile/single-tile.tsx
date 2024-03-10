import React from 'react';
import styles from './tile.module.scss';
import { Button } from '../../ui/button';

interface ITileProps {
  tileData: string[];
  handleTileClick: ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string;
    setSelectedTile: React.Dispatch<React.SetStateAction<string>>;
  }) => void;
  selectedTile: string;
  setSelectedTile: React.Dispatch<React.SetStateAction<string>>;
}

const SingleTile = ({
  tileData,
  handleTileClick,
  selectedTile,
  setSelectedTile
}: ITileProps) => {
  return (
    <div className={styles.tileContainer}>
      {tileData.map((tile: string) => {
        return (
          <div key={tile}>
            <Button
              onClick={() =>
                handleTileClick({ data: tile, selectedTile, setSelectedTile })
              }
              className={` ${styles.tileDefaultStyles}   ${
                selectedTile === tile
                  ? styles.tileActiveStyle
                  : `${styles.tileDisableStyle} ${styles.tileStyles}`
              }`}
            >
              {tile}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default SingleTile;
