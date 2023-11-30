import { Product } from '../search/result-interface';

export interface IKeyLabelMapping {
  [key: string]: string | number;
}
export interface IDifferValue {
  [key: string]: string | number | string[] | number[] | null;
}

export interface RightSideContentProps {
  compareStoneData: Product[];
  showDifferences: boolean;
  keyLabelMapping: IKeyLabelMapping;
  compareValues: IKeyLabelMapping;
  handleClick: (id: string) => void;
  handleClose: (event: React.MouseEvent, id: string) => void;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
}

export interface LeftSideContentProps {
  compareStoneData: Product[];
  showDifferences: boolean;
  keyLabelMapping: IKeyLabelMapping;
  compareValues: IKeyLabelMapping;
}

export interface ShowDifferencesChangeProps {
  compareStoneData: Product[];
  showDifferences: boolean;
  keyLabelMapping: IKeyLabelMapping;
  setCompareValues: React.Dispatch<React.SetStateAction<IDifferValue>>;
  setShowDifferences: React.Dispatch<React.SetStateAction<boolean>>;
}
