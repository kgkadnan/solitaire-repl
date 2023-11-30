import { Product, TableColumn } from '@/app/search/result/result-interface';
import { ReactNode } from 'react';

export interface IconfirmRadioButtons {
  name: string;
  onChange: (value: string) => void;
  id: string;
  value: string;
  label: ReactNode | string;
  checked: boolean;
}

export interface IConfirmStoneProps {
  confirmStoneData: Product[];
  listingColumns: TableColumn[];
  commentValue: string;
  handleComment: (event: any) => void;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  setInputErrorContent: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDaysInputValue: React.Dispatch<React.SetStateAction<string>>;
  onOpenChange: (open: boolean) => void;
  confirmRadioButtons?: IconfirmRadioButtons[];
  inputError: boolean;
  selectedDaysInputValue: string;
  selectedRadioDaysValue?: string;
}
