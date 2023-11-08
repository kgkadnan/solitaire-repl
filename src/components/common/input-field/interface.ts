import { ChangeEvent } from 'react';

export interface IInputStyle {
  input?: string;
  inputMain?: string;
}

export interface InputFieldProps {
  style?: IInputStyle;
  type: string;
  value?: string | number;
  name: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  disable?: boolean;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}
