export const filterOutSpecificValues = (updatedTiles: string[]) => {
  const specificValues = ['1ct', '1.5ct', '2ct', '3ct', '4ct', '5ct+'];
  return updatedTiles.filter(tile => !specificValues.includes(tile));
};
