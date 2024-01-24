import { girdleSortedArray } from '@/constants/v2/form';

export const handleGirdleChange = ({
  data,
  selectedTile,
  setSelectedTile
}: {
  data: string;
  selectedTile: string[];
  setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  // Find the index of the clicked item in the data array
  const clickedIndex = girdleSortedArray.indexOf(data);

  if (clickedIndex !== -1) {
    // Find the index of the previously selected item in the data array
    let lastSelectedIndex;

    if (
      clickedIndex < girdleSortedArray.indexOf(selectedTile[0]) ||
      clickedIndex <
        girdleSortedArray.indexOf(selectedTile[selectedTile.length - 1])
    ) {
      lastSelectedIndex =
        selectedTile.length > 0
          ? girdleSortedArray.indexOf(selectedTile[selectedTile.length - 1])
          : -1;
    } else {
      lastSelectedIndex =
        selectedTile.length > 0
          ? girdleSortedArray.indexOf(selectedTile[0])
          : -1;
    }

    if (lastSelectedIndex !== -1) {
      // Determine the range of items to select
      const startIndex = Math.min(clickedIndex, lastSelectedIndex);
      const endIndex = Math.max(clickedIndex, lastSelectedIndex);

      // If clicked item is the same as the last selected item or the first selected item, deselect the entire range
      if (
        data === selectedTile[selectedTile.length - 1] ||
        data === selectedTile[0]
      ) {
        setSelectedTile([]);
      } else {
        // Add the clicked item to the existing range if it's next to the last selected item
        const newSelected = girdleSortedArray.slice(
          startIndex,
          clickedIndex === endIndex + 1 ? endIndex + 2 : endIndex + 1
        );

        // Update the selected items
        setSelectedTile(newSelected);
      }
    } else {
      // Toggle the clicked item
      setSelectedTile([data]);
    }
  }
};
