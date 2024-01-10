import React from 'react';

import { IProduct } from '../search/result/result-interface';
import { IKeyLabelMapping } from '@/interface/interface';

export interface IDifferValue {
  [key: string]: string | number | string[] | number[] | null;
}

export interface IRightSideContentProps {
  compareStoneData: IProduct[];
  showDifferences: boolean;
  keyLabelMapping: IKeyLabelMapping;
  compareValues: IKeyLabelMapping;
  handleClick: (id: string) => void;
  handleClose: (event: React.MouseEvent, id: string) => void;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorText: React.Dispatch<React.SetStateAction<string>>;
}

export interface ILeftSideContentProps {
  compareStoneData: IProduct[];
  showDifferences: boolean;
  keyLabelMapping: IKeyLabelMapping;
  compareValues: IKeyLabelMapping;
}

export interface IShowDifferencesChangeProps {
  compareStoneData: IProduct[];
  showDifferences: boolean;
  keyLabelMapping: IKeyLabelMapping;
  setCompareValues: React.Dispatch<React.SetStateAction<IDifferValue>>;
  setShowDifferences: React.Dispatch<React.SetStateAction<boolean>>;
}
