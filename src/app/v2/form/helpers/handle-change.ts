import { handleFilterChange } from './handle-filter-changes';

export const handleChange = ({
  data,
  selectedTile,
  setSelectedTile
}: {
  data: string;
  selectedTile: string[];
  setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  handleFilterChange(data, selectedTile, setSelectedTile);
};
