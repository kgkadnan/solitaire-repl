interface IMinInputData {
  minValue: string;
  minPlaceHolder: string;
  minOnchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IMaxInputData {
  maxValue: string;
  maxPlaceHolder: string;
  maxOnchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IMinMaxInput {
  minInputData: IMinInputData;
  maxInputData: IMaxInputData;
  inputGap: string;
  errorText?: string;
  isShowError?: boolean;
}
