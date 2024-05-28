import React from 'react';
import styles from './tile.module.scss';
import { Button } from '../../ui/button';

interface ITileProps {
  tileData: string[];
  handleTileClick: ({
    _data,
    _selectedTile,
    _setSelectedTile
  }: {
    _data: string;
    _selectedTile: string;
    _setSelectedTile: React.Dispatch<React.SetStateAction<string>>;
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
                handleTileClick({
                  _data: tile,
                  _selectedTile: selectedTile,
                  _setSelectedTile: setSelectedTile
                })
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
