import React, { useState } from 'react';
import Tile from '.';

const ExampleTile = () => {
  const [make, setMake] = useState<string[]>([]);
  const [cut, setCut] = useState<string[]>([]);
  const handleTileClick = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[];
    setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    if (selectedTile.includes(data)) {
      setSelectedTile(prevSelectedTile =>
        prevSelectedTile.filter(selected => selected !== data)
      );
    } else {
      setSelectedTile(prevSelectedTile => [...prevSelectedTile, data]);
    }
  };

  let tileData = ['3EX', '3EX+NON', '3VG+EX', '3G', '3F'];
  let cutData = [
    { title: 'Excellent', short_name: 'EX' },
    { title: 'Very Good', short_name: 'VG' },
    { title: 'Good', short_name: 'G' },
    { title: 'Fair', short_name: 'F' }
  ];
  return (
    <div>
      <Tile
        tileData={tileData}
        selectedTile={make}
        setSelectedTile={setMake}
        handleTileClick={handleTileClick}
      />
      <Tile
        tileData={cutData}
        selectedTile={cut}
        setSelectedTile={setCut}
        handleTileClick={handleTileClick}
      />
    </div>
  );
};

export default ExampleTile;
