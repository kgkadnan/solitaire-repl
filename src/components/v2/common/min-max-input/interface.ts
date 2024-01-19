interface IMinInputData {
  minValue: string;
  minPlaceHolder: string;
  minOnchange: () => void;
}

interface IMaxInputData {
  maxValue: string;
  maxPlaceHolder: string;
  maxOnchange: () => void;
}

export interface IMinMaxInput {
  minInputData: IMinInputData;
  maxInputData: IMaxInputData;
  inputGap: string;
  errorText?: string;
}
