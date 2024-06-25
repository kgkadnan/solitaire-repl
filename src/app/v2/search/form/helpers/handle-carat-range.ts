export const handleCaratRange = ({
  data,
  selectedTile,
  setSelectedTile,
  preDefineCarats,
  setCaratRangeSelection
}: {
  data: string;
  selectedTile: string[];
  setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
  preDefineCarats: any;
  setCaratRangeSelection: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const preDefineIndex = preDefineCarats.findIndex((item: any) =>
    item.data.includes(data)
  );

  if (preDefineIndex !== -1) {
    const parentCategory = preDefineCarats[preDefineIndex].data[0];
    const subCategories = preDefineCarats[preDefineIndex].data.slice(1);

    if (subCategories.includes(data)) {
      const updatedTiles = selectedTile.includes(data)
        ? selectedTile.filter(tile => tile !== data)
        : [...selectedTile, data];

      if (
        !updatedTiles.includes(parentCategory) &&
        subCategories.every((subCat: any) => updatedTiles.includes(subCat))
      ) {
        updatedTiles.push(parentCategory);
      } else if (
        updatedTiles.includes(parentCategory) &&
        !subCategories.every((subCat: any) => updatedTiles.includes(subCat))
      ) {
        updatedTiles.splice(updatedTiles.indexOf(parentCategory), 1);
      }

      setSelectedTile(updatedTiles);

      const filterOutSpecificValues = (updatedTiles: string[]) => {
        const specificValues = ['1ct', '1.5ct', '2ct', '3ct', '4ct', '5ct+'];

        return updatedTiles.filter(tile => !specificValues.includes(tile));
      };

      setCaratRangeSelection(filterOutSpecificValues(updatedTiles));
    } else {
      let updatedTiles;

      if (selectedTile.includes(parentCategory)) {
        updatedTiles = selectedTile.filter(
          tile => ![parentCategory, ...subCategories].includes(tile)
        );
      } else {
        updatedTiles = [
          ...selectedTile.filter(tile => !subCategories.includes(tile)),
          parentCategory,
          ...subCategories
        ];
      }

      setSelectedTile(updatedTiles);

      const filterOutSpecificValues = (updatedTiles: string[]) => {
        const specificValues = ['1ct', '1.5ct', '2ct', '3ct', '4ct', '5ct+'];

        return updatedTiles.filter(tile => !specificValues.includes(tile));
      };

      setCaratRangeSelection(filterOutSpecificValues(updatedTiles));
    }
  }
};
