import React from 'react';
import { Button } from '@/components/ui/button';
import styles from './carat-tile.module.scss';
import mathAndFin from '@public/v2/assets/icons/Math&Finance.svg';
import Image from 'next/image';

interface ICaratTileProps {
  caratTileData: string[];
  handlecaratTileClick: ({
    data,
    selectedcaratTile,
    setSelectedcaratTile
  }: {
    data: string;
    selectedcaratTile: string[];
    setSelectedcaratTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => void;
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
                  selectedcaratTile,
                  setSelectedcaratTile
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
