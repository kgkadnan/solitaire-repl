import React from 'react';
import styles from './carat-tile.module.scss';
import mathAndFin from '@public/v2/assets/icons/Math&Finance.svg';
import Image from 'next/image';
import { Button } from '../../ui/button';

export interface ICaratTileProps {
  caratTileData: string[];
  handlecaratTileClick: (_data: any) => void;
  selectedcaratTile: string[];
  setSelectedcaratTile: React.Dispatch<React.SetStateAction<string[]>>;
}

const CaratTile = ({
  caratTileData,
  handlecaratTileClick,
  selectedcaratTile,
  setSelectedcaratTile
}: ICaratTileProps) => {
  return (
    <div className={styles.caratTileContainer}>
      {caratTileData.map(caratTile => {
        return (
          <div key={caratTile} className={`${styles.caratTileDefaultStyles} `}>
            <div> {caratTile}</div>
            <Button
              onClick={() =>
                handlecaratTileClick({
                  data: caratTile,
                  selectedcaratTile: selectedcaratTile,
                  setSelectedcaratTile: setSelectedcaratTile
                })
              }
            >
              <Image src={mathAndFin} alt="mathAndFin" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default CaratTile;
